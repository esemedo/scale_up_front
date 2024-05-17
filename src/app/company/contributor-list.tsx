"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Company } from "@/types/company";
import { Contributor } from "@/types/contributor";

import ContributorForm, { ContributorSchemaType } from "./contributor-form";
import { Trash } from "lucide-react";

interface ContributorListProps {
  company: Company;
  contributors: Contributor[];
}

export default function ContributorList({
  company,
  contributors,
}: ContributorListProps) {
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const [contributorList, setContributorList] =
    useState<Contributor[]>(contributors);

  const handleAddContributor = async (data: ContributorSchemaType) => {
    const contributor = {
      companyId: company.id,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      mail: data.email,
      status: 0,
    };

    const newContributor: Contributor = await fetch(
      `http://localhost:3000/api/contributors`,
      {
        method: "POST",
        body: JSON.stringify(contributor),
        headers: {
          "Content-Type": "application/json",
        },
      },
    ).then((res) => res.json());

    setIsAddingEmployee(false);
    setContributorList([...contributorList, newContributor]);
  };

  const handleRemoveContributor = async (contributor: Contributor) => {
    await fetch(`http://localhost:3000/api/contributors/${contributor.id}`, {
      method: "DELETE",
    });

    setContributorList(contributorList.filter((c) => c.id !== contributor.id));
  };

  return (
    <>
      {contributorList.length > 0 ? (
        <div className="grid-col-1 grid gap-4">
          {contributorList.map((contributor) => (
            <Card key={contributor.id} className="relative">
              <CardContent className="pt-2">
                <p className="font-bold">
                  {contributor.firstName} {contributor.lastName}
                </p>
                <p>{contributor.phone}</p>
                <p>{contributor.mail}</p>
              </CardContent>
              <Button
                className="absolute -right-2 -top-2"
                onClick={() => handleRemoveContributor(contributor)}
                variant="destructive"
                size="icon"
              >
                <Trash />
              </Button>
            </Card>
          ))}
        </div>
      ) : (
        <p>Aucun employé pour le moment</p>
      )}
      {!isAddingEmployee ? (
        <Button onClick={() => setIsAddingEmployee(true)} className="mt-8">
          Ajouter un employé
        </Button>
      ) : (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Ajouter un employé</CardTitle>
          </CardHeader>
          <CardContent>
            <ContributorForm
              onSubmit={(contributor) => handleAddContributor(contributor)}
              onCancel={() => setIsAddingEmployee(false)}
            />
          </CardContent>
        </Card>
      )}
    </>
  );
}
