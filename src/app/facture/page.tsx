"use client";

import React, { useState } from "react";
import { MdUnarchive } from "react-icons/md";
import TrainReportFormComponent from "@/components/uploadForms/TrainReportFormComponent";

interface Bill {
  contractId: number;
  quotationId: number;
  total: number;
  fileName: string;
  status: number;
  validity: false;
}

export default function Factures() {
  const [billFileName, setBillFileName] = useState("");
  const [billFile, setBillFile] = useState<Bill>();
  const [feedback, setFeedback] = useState("");

  async function handleSubmit() {
    try {
      if (billFile != null) {
        const formData = new FormData();
        const fileInput = document.querySelector(
          'input[name="bill"]',
        ) as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
          formData.append("file", fileInput.files[0]);
        }
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bills`, {
          method: "POST",
          body: formData,
        }).catch((e) => {});
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    if (
      e.currentTarget != null &&
      e.currentTarget.files != null &&
      e.currentTarget.files[0] != null
    ) {
      const file = e.currentTarget.files[0];
      if (file.type == "application/pdf" || file.type == "application/docx") {
        setBillFileName(file.name);
        const newBill: Bill = {
          contractId: 1,
          quotationId: 1,
          total: 199,
          fileName: file.name,
          status: 1,
          validity: false,
        };
        setBillFile(newBill);
      } else {
        setFeedback("Please upload a PDF or DOCX");
      }
    } else {
      setFeedback("Please upload a PDF or DOCX");
    }
  }

  return (
    <>
      <form
        className="max-w-48 flex w-2/5 flex-col rounded-md bg-slate-200 p-4"
        action={() => handleSubmit()}
      >
        <div className="mb-4 flex w-3/4 items-center space-x-4">
          <div className="flex items-center justify-center space-x-2 rounded-full bg-blue-700 p-2 px-4 text-white hover:bg-blue-400 active:bg-slate-500">
            <MdUnarchive className="" />
            <label htmlFor="billBtn">
              {billFileName == ""
                ? "Déposer une nouvelle facture"
                : billFileName}
            </label>
            <input
              id="billBtn"
              className="hidden"
              type="file"
              name="bill"
              onChange={(e) => handleChange(e)}
            />
          </div>
          {/* <input id="offerID" className="hidden" type="text" name="offerID" value={bill.id}></input> */}
          <button
            type="submit"
            className="mr-4 flex items-center justify-center rounded-full bg-black p-2 px-4 text-white  hover:bg-gray-800 active:bg-slate-500"
          >
            Valider
          </button>
        </div>
      </form>
      <TrainReportFormComponent />
      {feedback == "" ? (
        <></>
      ) : (
        <p className="rounded-md bg-slate-200 p-2">{feedback}</p>
      )}
    </>
  );
}
