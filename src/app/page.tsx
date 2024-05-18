"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";
import Dashboard from "./dashboard";
import HistoriqueBesoins from "../components/historiqueDesBesoins";
import FormulaireBesoin from "../components/formulaireBesoin";
import ValidationFactures from "../components/ValidationFactures";
import PromotionAssistant from "../app/promotion/assistant/page"
import SidebarButton from "../components/TabDashboard/SidebarButton";
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
          <SidebarButton
            isActive={currentComponent === "dashboard"}
            onClick={() => setCurrentComponent("dashboard")}
            title="Dashboard"
            Icon={AiFillHome}
          />
          <SidebarButton
            isActive={currentComponent === "historiqueDesBesoins"}
            onClick={() => setCurrentComponent("historiqueDesBesoins")}
            title="Historique des besoins"
            Icon={AiOutlineHistory}
          />
          <SidebarButton
            isActive={currentComponent === "formulaireBesoin"}
            onClick={() => setCurrentComponent("formulaireBesoin")}
            title="Formulaire besoin"
            Icon={AiOutlineForm}
          />
          <SidebarButton
            isActive={currentComponent === "validationFactures"}
            onClick={() => setCurrentComponent("validationFactures")}
            title="Validation factures"
            Icon={RiBillLine}
          />
          <SidebarButton
            isActive={currentComponent === "PromotionAssistant"}
            onClick={() => setCurrentComponent("PromotionAssistant")}
            title="PromotionAssistant"
            Icon={GrValidate}
          />
          
        </div>
        <div className="flex min-h-screen w-full flex-grow flex-col">
          <button onClick={() => signOut()}>Sign out</button>
          {currentComponent === "dashboard" && <Dashboard />}
          {currentComponent === "historiqueDesBesoins" && <HistoriqueBesoins />}
          {currentComponent === "formulaireBesoin" && <FormulaireBesoin />}
          {currentComponent === "validationFactures" && <ValidationFactures />}
          {currentComponent === "PromotionAssistant" && <PromotionAssistant />}
        </div>
      </div>
    );
  };
export default Home;