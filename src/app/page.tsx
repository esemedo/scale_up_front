"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";
import Dashboard from "./dashboard";
import HistoriqueBesoins from "../components/historiqueDesBesoins";
import FormulaireBesoin from "../components/formulaireBesoin";
import ValidationFactures from "../components/ValidationFactures";
import PromotionAssistant from "../app/promotion/assistant/page"
// import RechercheContrats from "../components/rechercheContractBill";

import { AiFillHome, AiOutlineForm, AiOutlineHistory } from "react-icons/ai";
import { GrValidate } from "react-icons/gr";
import { RiBillLine } from "react-icons/ri";
import { FaFileContract } from "react-icons/fa";

function Home() {
  const { data: session, status } = useSession();
  const [currentComponent, setCurrentComponent] = useState("dashboard");

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
    <div className="flex">
      <div className="my-auto ml-5 flex h-auto w-20 flex-col items-center justify-center space-y-4 rounded-xl bg-white p-5">
        <button
          onClick={() => setCurrentComponent("dashboard")}
          className={`mb ${currentComponent === "dashboard" ? "text-blue-500" : "text-gray-500"}`}
          title="Dashboard"
        >
          <AiFillHome className="h-7 w-7 hover:text-blue-500" />
        </button>
        <button
          onClick={() => setCurrentComponent("historiqueDesBesoins")}
          className={`mb-6 ${currentComponent === "historiqueDesBesoins" ? "text-blue-500" : "text-gray-500"}`}
          title="Historique des besoins"
        >
          <AiOutlineHistory className="h-7 w-7 hover:text-blue-500" />
        </button>
        <button
          onClick={() => setCurrentComponent("formulaireBesoin")}
          className={`mb-6 ${currentComponent === "formulaireBesoin" ? "text-blue-500" : "text-gray-500"}`}
          title="Formulaire besoin"
        >
          <AiOutlineForm className="h-7 w-7 hover:text-blue-500" />
        </button>
        <button
          onClick={() => setCurrentComponent("validationFactures")}
          className={`${currentComponent === "validationFactures" ? "text-blue-500" : "text-gray-500"}`}
          title="Validation factures"
        >
          <RiBillLine className="h-7 w-7 hover:text-blue-500" />
        </button>
        <button
          onClick={() => setCurrentComponent("PromotionAssistant")}
          className={`${currentComponent === "PromotionAssistant" ? "text-blue-500" : "text-gray-500"}`}
          title="PromotionAssistant"
        >
          <GrValidate className="h-7 w-7 hover:text-blue-500" />
        </button>
        {/* <button
          onClick={() => setCurrentComponent("rechercheContrats")}
          className={`${currentComponent === "rechercheContrats" ? "text-blue-500" : "text-gray-500"}`}
          title="Recherche contrats"
        >
          <FaFileContract className="h-7 w-7 hover:text-blue-500" />
        </button> */}
      </div>
      <div className="flex min-h-screen w-full flex-grow flex-col">
        <button onClick={() => signOut()}>Sign out</button>
        {currentComponent === "dashboard" && <Dashboard />}
        {currentComponent === "historiqueDesBesoins" && <HistoriqueBesoins />}
        {currentComponent === "formulaireBesoin" && <FormulaireBesoin />}
        {currentComponent === "validationFactures" && <ValidationFactures />}
        {currentComponent === "PromotionAssistant" && <PromotionAssistant />}
        {/* {currentComponent === "rechercheContrats" && <RechercheContrats />} */}
      </div>
    </div>
  );
}

export default Home;