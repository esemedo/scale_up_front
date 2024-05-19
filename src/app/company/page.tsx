"use client";
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";

function ListeIntervenant() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session  } = useSession();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authorizedUser = !session?.user.roles.includes("speaker-company")
        if(!authorizedUser){
          window.location.replace("/");
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company`,{headers:{Authorization: `Bearer ${session?.accessToken}`}});
        if (!response.ok) {
          throw new Error("Failed to fetch data");   
        }
        const companyData = await response.json();
        setCompanies(companyData);
      } catch (error) {
          setErrorMessage("Une erreur est survenu, veuillez réessayer plus tard.");
      } finally {
        setLoading(false);
      }
    };
    if(session){
      fetchData();
    }
  }, [session]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {errorMessage && <div style={{ color: 'red', marginTop: '20px' }}>{errorMessage}</div>}
      {companies.map((company: { id: string, name: string, phone: string, mail: string }) => (
        <div key={company.id}>
          <h1>{company.name}</h1>
          <p>{company.phone}</p>
          <p>{company.mail}</p>
        </div>
      ))}
    </div>
  );
}

export default ListeIntervenant;