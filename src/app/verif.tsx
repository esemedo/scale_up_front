"use client";

import React, { useRef, useState } from "react";

export default function Factures() {
  const [preValidMp, setPreValidMp] = useState(false);
  const [validAssist, setValidAssist] = useState(false);
  const fctrRef = useRef<HTMLInputElement>(null);
  let suivi = "Non-traité";

  function verif() {
    if (preValidMp != false && validAssist != false) {
      suivi = "Validé";
    }
    if (preValidMp != false && validAssist == false) {
      suivi = "Pré-validé";
    }
  }

  return (
    <>
      <form
        className="flex items-center rounded-md bg-slate-200 p-4"
        action={`${process.env.NEXT_PUBLIC_API_URL}/api/uploadPDF`}
        method="post"
        encType="multipart/form-data"
      >
        <p>Votre contrat est: {suivi}</p>
      </form>
    </>
  );
}
