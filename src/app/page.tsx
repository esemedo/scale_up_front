"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";
import Dashboard from './dashboard';
import HistoriqueBesoins from '../components/historiqueDesBesoins';
import FormulaireBesoin from '@/components/formulaireBesoin';

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
  if (status === "unauthenticated")
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  return (
    <div className={"flex flex-col"}>
      <button onClick={() => signOut()}>Sign out</button>
      {/* welcome to home{" "} */}
      <Dashboard />
    </div>
  );
}

export default Home;