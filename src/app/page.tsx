"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";
import { User } from "lucide-react";



function Home() {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("keycloak", {
        callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      }); // Force sign in if not authenticated
      //!!! ROLES ARE IN session.user.roles when authenticated !!!
    }
  }, [session]);
  return (
    <div className={"flex flex-col"}>
      {/* {session?.user.roles.includes("speaker-company") && User.
        <>

        </>
      } */}
        <>
      <button onClick={() => signOut()}>Sign out</button>
          welcome to home{" "}
        </>
    </div>
  );
}

export default Home;
