"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";
import Dashboard from './dashboard';
import HistoriqueBesoins from '../components/historiqueDesBesoins';
import FormulaireBesoin from '../components/formulaireBesoin';
import ValidationFactures from '../components/ValidationFactures';

import { AiFillHome, AiOutlineForm, AiOutlineHistory } from 'react-icons/ai';
import { RiBillLine } from 'react-icons/ri';

function Home() {
  const { data: session, status } = useSession();
  const [currentComponent, setCurrentComponent] = useState('dashboard');

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development' && status === "unauthenticated") {
      signIn("keycloak", {
        callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      }); // Force sign in if not authenticated
      //!!! ROLES ARE IN session.user.roles when authenticated !!!
    }
  }, [session]);

  if (process.env.NODE_ENV !== 'development' && status === "unauthenticated")
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
    return (
      <div className="flex">
        <div className="flex flex-col items-center justify-center bg-white h-auto p-5 ml-5 my-auto w-20 rounded-xl">
          <button onClick={() => setCurrentComponent('dashboard')} className={`mb-6 ${currentComponent === 'dashboard' ? 'text-blue-500' : 'text-gray-500'}`} title="Dashboard">
            <AiFillHome className="h-7 w-7 hover:text-blue-500" />
          </button>
          <button onClick={() => setCurrentComponent('historiqueDesBesoins')} className={`mb-6 ${currentComponent === 'historiqueDesBesoins' ? 'text-blue-500' : 'text-gray-500'}`} title="Historique des besoins">
            <AiOutlineHistory className="h-7 w-7 hover:text-blue-500" />
          </button>
          <button onClick={() => setCurrentComponent('formulaireBesoin')} className={`mb-6 ${currentComponent === 'formulaireBesoin' ? 'text-blue-500' : 'text-gray-500'}`} title="Formulaire besoin">
            <AiOutlineForm className="h-7 w-7 hover:text-blue-500" />
          </button>
          <button onClick={() => setCurrentComponent('validationFactures')} className={`${currentComponent === 'validationFactures' ? 'text-blue-500' : 'text-gray-500'}`} title="Validation factures">
            <RiBillLine className="h-7 w-7 hover:text-blue-500" />
          </button>
        </div>
        <div className="flex flex-col min-h-screen w-full flex-grow">
          <button onClick={() => signOut()}>Sign out</button>
          {currentComponent === 'dashboard' && <Dashboard />}
          {currentComponent === 'historiqueDesBesoins' && <HistoriqueBesoins />}
          {currentComponent === 'formulaireBesoin' && <FormulaireBesoin />}
          {currentComponent === 'validationFactures' && <ValidationFactures />}
        </div>
      </div>
    );
  }

export default Home;