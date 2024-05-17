"use client";
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";

function ListeIntervenant() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session  } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/company",{headers:{Authorization: `Bearer ${session?.accessToken}`}});
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const companyData = await response.json();
        setCompanies(companyData);
      } catch (error) {
        console.error("Error fetching data:", error);
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
      {companies.map((company: any) => (
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

