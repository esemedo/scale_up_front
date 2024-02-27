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
import EmployeeForm from "./employee-form";

type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

export default function EmployeesList() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [isAddingEmployee, setIsAddingEmployee] = useState(false);

  return (
    <>
      {employees.length > 0 ? (
        <div className="grid-col-1 grid gap-4">
          {employees.map((employee: Employee) => (
            <Card>
              <CardContent className="pt-2">
                <p className="font-bold">
                  {employee.firstName} {employee.lastName}
                </p>
                <p>{employee.phone}</p>
                <p>{employee.email}</p>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  onClick={() =>
                    setEmployees(employees.filter((e) => e.id !== employee.id))
                  }
                  variant="destructive"
                  size="sm"
                >
                  Supprimer
                </Button>
              </CardFooter>
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
            <EmployeeForm
              onSubmit={(employee) =>
                setEmployees([...employees, employee as Employee])
              }
              onCancel={() => setIsAddingEmployee(false)}
            />
          </CardContent>
        </Card>
      )}
    </>
  );
}
