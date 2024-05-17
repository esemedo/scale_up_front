"use client";
import React, { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import SearchForm from "../components/searchform";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";
import Dashboard from "./dashboard";

function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (process.env.NODE_ENV !== "development" && status === "unauthenticated") {
      signIn("keycloak", {
        callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      }); // Force sign in if not authenticated
      //!!! ROLES ARE IN session.user.roles when authenticated !!!
    }
  }, [session, status]);

  if (process.env.NODE_ENV !== "development" && status === "unauthenticated") {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={"flex flex-col"}>
      <button onClick={() => signOut()}>Sign out</button>
      <SearchForm />
    </div>
  );
}

export default Home;