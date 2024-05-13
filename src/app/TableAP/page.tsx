"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Dei {
  id: number;
  status: boolean;
  sashaStatus: boolean;
}

const Page = () => {
  const [data, setData] = useState<Dei[]>([]); // Specify type Dei[] for data state
  const [selectedItem, setItemSelected] = useState<Dei | null>(null); // Specify type Dei | null for selectedItem state

  useEffect(() => {
    axios
      .get<Dei[]>("http://localhost:3000/dei") // Specify the response type as Dei[]
      .then((result) => {
        setData(result.data);
        console.log(result.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleItemClick = (itemId: number) => {
    const selectedItem = data.find((item) => item.id === itemId);
    setItemSelected(selectedItem ?? null);
  };

  return (
    <div>
      <div className="group-componen font-main mx-36 mt-8 flex justify-center gap-3 rounded-lg p-8 pt-16">
        <div className="left-side mx-auto mt-2 w-2/6 rounded-3xl bg-white p-8 shadow-lg">
          <h3 className="text-lg ">Mes tâches</h3>
          <div className="mt-10 w-28 rounded-sm border border-black text-center">
            <select
              name="prioritySelect"
              id="prioritySelect"
              className="w-full text-center"
            >
              <option value="" disabled selected>
                Priorité
              </option>
              <option value="urgent">Urgent</option>
              <option value="high">Haute</option>
              <option value="medium">Moyenne</option>
              <option value="low">Faible</option>
            </select>
          </div>
          <ul className="task-list">
            {data.map((item) => (
              <li
                key={item.id}
                className={`bg-[#f0f2fc] rounded-lg ${
                  selectedItem === item ? "selected" : ""
                }`}
                onClick={() => handleItemClick(item.id)}
              >
                <h4>Tâche n°{item.id}</h4>
                {item.status ? "Complété" : "En cours"}
              </li>
            ))}
          </ul>
        </div>
        <div className="right-side mx-auto w-4/6">
          <div className="top mx-auto mt-2 rounded-3xl bg-white p-8 shadow-lg">
            <div className="top-left w-2/3 flex flex-col gap-y-2">
              <h1 className="text-3xl font-bold text-[#41494e]">
                Tâche n. {selectedItem ? selectedItem.id : ""}
              </h1>
              <div className="first-line flex gap-2 text-xs">
                <div className="relative">
                  <label
                    htmlFor="title"
                    className="absolute -top-2 left-2 bg-white px-1 text-xs transition-all duration-200 ease-in-out peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:opacity-100 peer-focus:top-1 peer-focus:scale-75 peer-focus:opacity-100"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="w-full rounded-md border border-black px-1 py-2"
                    placeholder="Exemple de titre"
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="dueDate"
                    className="absolute -top-2 left-2 bg-white px-1 text-xs transition-all duration-200 ease-in-out peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:opacity-100 peer-focus:top-1 peer-focus:scale-75 peer-focus:opacity-100"
                  >
                    Date d&apos;échéance
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    id="dueDate"
                    className="rounded-md border border-black px-1 py-2"
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="priority"
                    className="absolute -top-2 left-2 bg-white px-1 text-xs transition-all duration-200 ease-in-out peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:opacity-100 peer-focus:top-1 peer-focus:scale-75 peer-focus:opacity-100"
                  >
                    Priorité
                  </label>
                  <input
                    type="text"
                    name="priority"
                    id="priority"
                    className="w-16 rounded-md border border-black px-1 py-2"
                    placeholder="Elevé"
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="linkedContract"
                    className="absolute -top-2 left-2 bg-white px-1 text-xs transition-all duration-200 ease-in-out peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:opacity-100 peer-focus:top-1 peer-focus:scale-75 peer-focus:opacity-100"
                  >
                    Contrat lié
                  </label>
                  <input
                    type="text"
                    name="linkedContract"
                    id="linkedContract"
                    className="w-full rounded-md border border-black px-1 py-2"
                    placeholder="CT128 - name"
                  />
                </div>
              </div>
              <div className="relative h-32 w-full">
                <label
                  htmlFor="description"
                  className="absolute -top-2 left-2 bg-white px-1 text-xs transition-all duration-200 ease-in-out peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:opacity-100 peer-focus:top-1 peer-focus:scale-75 peer-focus:opacity-100"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  className="vertical-align h-full w-full rounded-md border border-black px-1 py-2"
                  placeholder="Lorem Ipsum"
                />
              </div>
              <div className="field-groupe flex flex-row gap-2">
                <div className="relative w-1/2">
                  <label
                    htmlFor="otherField"
                    className="absolute -top-2 left-2 bg-white px-1 text-xs transition-all duration-200 ease-in-out peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:opacity-100 peer-focus:top-1 peer-focus:scale-75 peer-focus:opacity-100"
                  >
                    Autre Champs
                  </label>
                  <input
                    type="text"
                    id="otherField"
                    className="w-full rounded-md border border-black py-2"
                  />
                </div>
                <div className="relative w-1/2">
                  <label
                    htmlFor="otherField2"
                    className="absolute -top-2 left-2 bg-white px-1 text-xs transition-all duration-200 ease-in-out peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:opacity-100 peer-focus:top-1 peer-focus:scale-75 peer-focus:opacity-100"
                  >
                    Autre Champs 2
                  </label>
                  <input
                    type="text"
                    id="otherField2"
                    className="w-full rounded-md border border-black py-2"
                  />
                </div>
              </div>
              <div className="relative">
                <label
                  htmlFor="linkedFile"
                  className="absolute -top-2 left-2 bg-white px-1 text-xs transition-all duration-200 ease-in-out peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:opacity-100 peer-focus:top-1 peer-focus:scale-75 peer-focus:opacity-100"
                >
                  Pièce Jointe(s)
                </label>
                <input
                  type="text"
                  name="linkedFile"
                  className="w-full rounded-md border border-black py-2"
                />
              </div>
            </div>
            <div className="top-right w-1/3"></div>
          </div>
          <div className="bottom mx-auto mt-4 flex flex-col rounded-3xl bg-white p-8 shadow-lg">
            <h3 className="text-lg">Calendrier</h3>
            <ul className="flex flex-row gap-2 overflow-auto">
              <li className="day-body w-44 rounded-2xl bg-[#f0f2fc]">
                <div className="day-header rounded-t-xl py-1 bg-light-gray text-center">
                  <h6>Ajourd&apos;hui</h6>
                </div>
                <div className="day-content h-28"></div>
              </li>
              <li className="day-body w-44 rounded-2xl bg-[#f0f2fc]">
                <div className="day-header rounded-t-xl py-1 bg-light-gray text-center">
                  <h6>Demain</h6>
                </div>
                <div className="day-content h-28"></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
