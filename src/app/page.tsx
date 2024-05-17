"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";

function Home() {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("keycloak", {
        callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      }); // Force sign in if not authenticated
      //!!! ROLES ARE IN session.user.roles when authenticated !!!
    }
    if (status === "authenticated") {
      console.log(session);
    }
  }, [session]);
  if (status === "loading" || status === "unauthenticated")
    return (
      <div className={"flex h-full w-full items-center justify-center"}>
        <LoadingSpinner className={"h-10 w-10"} />
        <p className={"ml-2"}>Connexion...</p>
      </div>
    );
  return (
    <div className={"flex flex-col"}>
      <button onClick={() => signOut()}>Sign out</button>
      welcome to home{" "}
    </div>
  );
}

export default Home;
