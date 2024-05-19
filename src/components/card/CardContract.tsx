"use client";
import { Progress } from "@/components/ui/progress";
import { Contract } from "@/types/contracts";
import Link from "next/link";
import React, { useState } from "react";
import { CiImport } from "react-icons/ci";
import { IoDocumentText, IoEyeOutline, IoCloseOutline } from "react-icons/io5";
import Modal from "react-modal";

interface CardContractProps {
  contract: Contract;
}

function downloadContract(contract: Contract) {
  const fileData = JSON.stringify(contract);
  const blob = new Blob([fileData], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = "contract.txt";
  link.href = url;
  link.click();
}

function CardContract({ contract }: CardContractProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    contractId: contract.id,
    issue: "",
  });

  let statusText, statusColor, progressValue;

  if (contract.status === 0) {
    statusText = "Signé";
    statusColor = "blue";
    progressValue = 10;
  } else if (contract.status === 1) {
    statusText = "En attente";
    statusColor = "orange";
    progressValue = 50;
  } else if (contract.status === 2) {
    statusText = "Terminé";
    statusColor = "green";
    progressValue = 100;
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Problème signalé avec succès!");
      setForm({ name: "", email: "", contractId: contract.id, issue: "" });
      setModalIsOpen(false);
    } else {
      alert("Erreur lors de la soumission du problème.");
    }
  };

  return (
    <div>
      <div className="flex h-28 w-full flex-row rounded-md border-2 bg-slate-100">
        <div>
          <IoDocumentText className=" text-8xl" />{" "}
        </div>

        <div className="w-full">
          {" "}
          <p className="font-semibold">Contrat n°{contract.id}</p>
          <div>Description du contrat</div>
          <Progress
            statusColor={statusColor}
            value={progressValue}
            className="w-3/4"
          />
          <div className={`flex justify-center ${statusColor}`}>
            <p>{statusText} </p>
          </div>
        </div>

        <div className="flex items-end gap-3">
          <Link href={"/imageContract"}>
            <div>
              <IoEyeOutline className=" cursor-pointer text-xl" />
            </div>
          </Link>
          <div onClick={() => downloadContract(contract)}>
            <CiImport className=" mr-4 cursor-pointer text-xl" />
          </div>
          <button
            onClick={() => setModalIsOpen(true)}
            className="mr-4 text-sm text-blue-500 underline"
          >
            Signaler un problème
          </button>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Signaler un problème"
        className="flex items-center justify-center"
      >
        <div className="relative w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
          <button
            onClick={() => setModalIsOpen(false)}
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
          >
            <IoCloseOutline className="text-2xl" />
          </button>
          <h1 className="mb-6 text-center text-2xl font-bold">
            Signaler un problème de contrat
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nom
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="contractId"
                className="block text-sm font-medium text-gray-700"
              >
                ID du Contrat
              </label>
              <input
                type="text"
                id="contractId"
                name="contractId"
                value={form.contractId}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                readOnly
              />
            </div>
            <div>
              <label
                htmlFor="issue"
                className="block text-sm font-medium text-gray-700"
              >
                Problème
              </label>
              <textarea
                id="issue"
                name="issue"
                value={form.issue}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 px-4 py-2 font-bold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Soumettre
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default CardContract;
