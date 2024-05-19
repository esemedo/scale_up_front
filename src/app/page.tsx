"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import Link from "next/link";
import errorMessage from "@/app/company/page";



function Home() {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("keycloak", {
        callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      });
    }
  }, [session]);

  const authorizedUser = !session?.user.roles.includes("speaker-company");
  if (status === "loading" || status === "unauthenticated")
    return (
      <div className={"flex h-full w-full items-center justify-center"}>
        <LoadingSpinner className={"h-10 w-10"} />
        <p className={"ml-2"}>Connexion...</p>
      </div>
    );

  return (
    <div className={"flex flex-col"}>
      <>
        <button onClick={() => signOut()}>Sign out</button>
        welcome to home{session?.user?.name}
      </>
      {authorizedUser && (
        <Link href="/company">company</Link>
      )}
    </div>
  );
}

export default Home;
