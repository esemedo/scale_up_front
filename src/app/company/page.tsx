import axios from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Company } from "@/types/company";
import { Contributor } from "@/types/contributor";

import CompanyForm from "./company-form";
import ContributorList from "./contributor-list";

export default async function CompanyPage() {
  const countriesIso: string[] = await fetch(
    "https://api.first.org/data/v1/countries",
  )
    .then((res) => res.json())
    .then((data) => Object.keys(data.data))
    .catch((error) => {
      return [];
    });

  const user = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@gmail.com",
  };

  const company: Company = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${user.id}/company`,
  ).then((res) => res.json());

  const contributors: Contributor[] = await axios
    .get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/companies/${company.id}/contributors`,
    )
    .then((res) => res.data);

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
            <CardDescription>Prestataires de ma structure</CardDescription>
          </CardHeader>
          <CardContent>
            <ContributorList company={company} contributors={contributors} />
          </CardContent>
        </Card>
      </section>
    </>
  );
}
