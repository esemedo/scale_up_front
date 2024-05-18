"use client";

import React, { useRef, useState } from "react";

export default function Factures() {
  const [fctrFileName, setFctrFileName] = useState("");
  const [preValidMp, setPreValidMp] = useState(false);
  const [validAssist, setValidAssist] = useState(false);
  const fctrRef = useRef<HTMLInputElement>(null);

  function handleChange() {
    if (
      fctrRef.current != null &&
      fctrRef.current.files != null &&
      fctrRef.current.files[0] != null
    ) {
      setFctrFileName(fctrRef.current.files[0].name);
    }
  }

  return (
    <>
      <form
        className="flex items-center rounded-md bg-slate-200 p-4"
        action="${process.env.NEXT_PUBLIC_API_URL}/api/uploadPDF"
        method="post"
        encType="multipart/form-data"
      >
        <label
          htmlFor="fctrBtn"
          className="mr-4 rounded-md bg-slate-300 p-2 hover:bg-slate-400 active:bg-slate-500"
        >
          {fctrFileName == "" ? "📎Upload facture" : fctrFileName}
        </label>
        <input
          ref={fctrRef}
          id="fctrBtn"
          className="hidden"
          type="file"
          name="ptf"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="rounded-md bg-slate-400 p-3 hover:bg-slate-500 active:bg-slate-600"
        >
          Upload
        </button>
      </form>
    </>
  );
}
