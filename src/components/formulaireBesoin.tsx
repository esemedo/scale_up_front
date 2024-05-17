"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MultiSelect } from "react-multi-select-component";
import Alert from "@mui/material/Alert";

const FormulaireBesoin: React.FC = () => {
  const [promotions, setPromotions] = useState<any[]>([]);
  const [contributors, setContributors] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<any[]>([]);
  const api = process.env.NEXT_PUBLIC_API_URL;
  const [alert, setAlert] = useState<JSX.Element | null>(null);

  const fetchPromotions = async () => {
    try {
      const response = await axios.get<any[]>(`${api}/api/promotions`);
      setPromotions(response.data);
    } catch (error) {
      console.error("Error fetching promotions:", error);
    }
  };

  const fetchContributors = async () => {
    try {
      const response = await axios.get<any[]>(`${api}/api/contributors`);
      setContributors(response.data);
    } catch (error) {
      console.error("Error fetching contributors:", error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get<any[]>(`${api}/api/subjects`);
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  useEffect(() => {
    fetchPromotions();
    fetchContributors();
    fetchSubjects();
  }, []);

  const handleSubmit = function (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const promotion = form["promotion"].value;
    const subjects = selectedSubjects.map((subject) => subject.value);
    const contributor = form["contributor"].value;
    const startSchoolYear = form["startSchoolYear"].value;
    const endSchoolYear = form["endSchoolYear"].value;
    const hours = selectedSubjects.map((subject) =>
      parseInt(form["hoursVolume_" + subject.label].value),
    );
    const totalHours = hours.reduce((total, current) => total + current, 0);

    axios
      .post(`${api}/api/needs`, {
        promotion: { connect: { id: parseInt(promotion) } },
        status: 1,
        contributor: { connect: { id: parseInt(contributor) } },
        startSchoolYear: parseInt(startSchoolYear),
        endSchoolYear: parseInt(endSchoolYear),
        subject: {
          connect: subjects.map((subject) => ({ id: parseInt(subject) })),
        },
        hoursVolume: totalHours,
      })
      .then((response) => {
        console.log("Need created:", response.data);
        if (response.status === 201) {
          const alert = (
            <Alert
              severity="success"
              onClose={() => {
                setAlert(null);
              }}
              className="absolute top-1 z-50 mb-4"
            >
              Le besoin a été créé avec succès
            </Alert>
          );
          setAlert(alert);
        }
      })
      .catch((error) => {
        console.error("Error creating need:", error);
        const alert = (
          <Alert
            severity="error"
            onClose={() => {
              setAlert(null);
            }}
            className="absolute top-1 z-50 mb-4"
          >
            Erreur lors de la création du besoin
          </Alert>
        );
        setAlert(alert);
      });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center ">
      <div className="mb-5 rounded p-5 text-center text-4xl font-bold text-blue-500">
        Formulaire de déclaration de besoin
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex w-96 flex-col gap-4 rounded-lg border border-gray-300 bg-white p-8 shadow-lg"
      >
        <div>
          <label htmlFor="promotion" className="mr-2">
            Promotion :
          </label>
          <select
            id="promotion"
            className="w-full rounded-md border px-2 py-1"
            required
          >
            {promotions.map((promotion) => (
              <option key={promotion.id} value={promotion.id}>
                {promotion.startSchoolYear}-{promotion.endSchoolYear}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="subjects" className="mr-2">
            Matières :
          </label>
          <MultiSelect
            options={subjects.map((subject) => ({
              label: subject.name,
              value: subject.id,
            }))}
            value={selectedSubjects}
            onChange={setSelectedSubjects}
            labelledBy="Sélectionnez les matières"
          />
        </div>

        <div>
          <label htmlFor="contributor" className="mr-2">
            Contributeur :
          </label>
          <select
            id="contributor"
            className="w-full rounded-md border px-2 py-1"
            required
          >
            {contributors.map((contributor) => (
              <option key={contributor.id} value={contributor.id}>
                {contributor.firstName} {contributor.lastName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="startSchoolYear" className="mr-2">
            Année scolaire de début :
          </label>
          <input
            type="number"
            id="startSchoolYear"
            className="w-full rounded-md border px-2 py-1"
            required
          />
        </div>

        <div>
          <label htmlFor="endSchoolYear" className="mr-2">
            Année scolaire de fin :
          </label>
          <input
            type="number"
            id="endSchoolYear"
            className="w-full rounded-md border px-2 py-1"
            required
          />
        </div>

        {selectedSubjects
          ? selectedSubjects.map((subject) => (
              <div key={subject.value}>
                <label
                  htmlFor={"hoursVolume_" + subject.label}
                  className="mr-2"
                >
                  Volume horaire pour la matière {subject.label} :
                </label>
                <input
                  type="number"
                  id={"hoursVolume_" + subject.label}
                  className="w-full rounded-md border px-2 py-1"
                  required
                />
              </div>
            ))
          : null}

        <button
          type="submit"
          className="button rounded-md bg-blue-500 px-4 py-2 text-white"
        >
          Créer le besoin
        </button>
      </form>

      {alert}
    </div>
  );
};

export default FormulaireBesoin;
