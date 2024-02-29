import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Company } from "@/types/company";

import EmployeesList from "./employees-list";
import CompanyForm from "./company-form";

export default async function CompanyPage() {
  const countriesIso: string[] = await fetch(
    "https://api.first.org/data/v1/countries",
  )
    .then((res) => res.json())
    .then((data) => Object.keys(data.data))
    .catch((error) => {
      console.error("Erreur lors de la récupération des ISO de pays", error);
      return [];
    });

  const user = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@gmail.com",
  };

  const company: Company = await fetch(
    `http://localhost:3000/api/users/${user.id}/company`,
  ).then((res) => res.json());

  return (
    <>
      <section className="mx-2">
        <Card className="mx-auto mt-4 md:max-w-[800px]">
          <CardHeader>
            <CardTitle>Ma Structure</CardTitle>
            <CardDescription>Informations sur ma structure</CardDescription>
          </CardHeader>
          <CardContent>
            <CompanyForm company={company} countriesIso={countriesIso} />
          </CardContent>
        </Card>
      </section>
      <section>
        <Card className="mx-auto mt-4 md:max-w-[800px]">
          <CardHeader>
            <CardTitle>Mes Employés</CardTitle>
            <CardDescription>
              Employés et intervenants de ma structure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmployeesList />
          </CardContent>
        </Card>
      </section>
    </>
  );
}
