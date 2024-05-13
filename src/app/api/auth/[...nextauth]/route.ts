import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import axios, { AxiosError } from "axios";

import { signOut } from "next-auth/react";
import { JWT } from "next-auth/jwt";

const refreshAccessToken = async (token: JWT) => {
  try {
    if (Date.now() > token.refreshTokenExpired) throw Error;
    const details = {
      client_id: process.env.KEYCLOAK_CLIENT_ID,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
      grant_type: ["refresh_token"],
      refresh_token: token.refreshToken,
    };
    const formBody: string[] = [];
    Object.entries(details).forEach(([key, value]: [string, any]) => {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(value);
      formBody.push(encodedKey + "=" + encodedValue);
    });
    const formData = formBody.join("&");
    const url = `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formData,
    });
    const refreshedTokens = await response.json();
    if (!response.ok) throw refreshedTokens;
    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpired: Date.now() + (refreshedTokens.expires_in - 15) * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
      refreshTokenExpired:
        Date.now() + (refreshedTokens.refresh_expires_in - 15) * 1000,
    };
  } catch (error) {
    console.error("Failed to refresh access token", error);
    await signOut();
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};

const keycloakProvider = KeycloakProvider({
  clientId: process.env.KEYCLOAK_CLIENT_ID ?? "",
  clientSecret: process.env.KEYCLOAK_CLIENT_SECRET ?? "",
  issuer: process.env.KEYCLOAK_ISSUER,
  authorization: {
    params: {
      grant_type: "authorization_code",
      scope: "openid email profile",
      response_type: "code",
    },
  },
  httpOptions: {
    timeout: 30000,
  },
});

async function doFinalSignoutHandshake(jwt: JWT) {
  try {
    // Add the id_token_hint to the query string
    const params = new URLSearchParams();
    params.append("id_token_hint", jwt.idToken as string);
    const { status, statusText } = await axios.get(
      `${
        process.env.KEYCLOAK_ISSUER
      }/protocol/openid-connect/logout?${params.toString()}`,
    );

    // The response body should contain a confirmation that the user has been logged out
    console.log("Completed post-logout handshake", status, statusText);
  } catch (e: any) {
    console.error(
      "Unable to perform post-logout handshake",
      (e as AxiosError)?.code || e,
    );
  }
}

const handler = NextAuth({
  providers: [keycloakProvider],
  callbacks: {
    async signIn(params) {
      if (params.account && params.user) {
        return true;
      } else {
        // TODO : Add unauthorized page
        return "/unauthorized";
      }
    },

    async redirect(params) {
      return params.url.startsWith(params.baseUrl)
        ? params.url
        : params.baseUrl;
    },

    async session(params) {
      if (params.token) {
        params.session.user = params.token.user;
        params.session.accessToken = params.token.accessToken;
      }
      return params.session;
    },

    async jwt(params) {
      // Initial sign in
      if (params.account && params.user) {
        // Add access_token, refresh_token and expirations to the token right after signin
        params.token.accessToken = params.account.access_token;
        params.token.refreshToken = params.account.refresh_token;
        params.token.idToken = params.account.id_token;
        params.user.roles = params.profile?.realm_access.roles ?? [];
        params.token.accessTokenExpired =
          Date.now() + (params.account.expires_in - 15) * 1000;
        params.token.refreshTokenExpired =
          Date.now() + (params.account.refresh_expires_in - 15) * 1000;
        params.token.user = params.user;
        return params.token;
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < params.token.accessTokenExpired) return params.token;

      // Access token has expired, try to update it
      return refreshAccessToken(params.token);
    },
  },
  events: {
    signOut: ({ token }) => doFinalSignoutHandshake(token),
  },
});

export { handler as GET, handler as POST };
