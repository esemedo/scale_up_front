"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface Offer {
  id: number;
  needId: number;
}

export default function OfferListComponent() {
  const { data: session, status } = useSession();

  const [offers, setOffers] = useState<Offer[]>([]);

  function getPath(offer: Offer): string {
    return `/offers/subject/${offer.id}/${offer.needId}`;
  }

  const [ptfFileName, setPtfFileName] = useState("");
  const [feedback, setFeedback] = useState("");

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    if (
      e.currentTarget != null &&
      e.currentTarget.files != null &&
      e.currentTarget.files[0] != null
    ) {
      const file = e.currentTarget.files[0];
      if (file.type == "application/pdf" || file.type == "application/docx") {
        setPtfFileName(file.name);
      } else {
        setFeedback("Please upload a PDF or DOCX");
      }
    } else {
      setFeedback("Please upload a PDF or DOCX");
    }
  }

  async function handleSubmit() {
    try {
      if (ptfFileName != "") {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/uploadPTF`, {
          method: "POST",
          body: new FormData(document.querySelector("form")!),
        }).then((response) =>
          response.ok
            ? setFeedback("Upload successful")
            : setFeedback("Error occurred"),
        );
      }
    } catch (error) {}
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("keycloak", {
        callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      }); // Force sign in if not authenticated
    }
    if (session != null) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/getOffers?userID=${session.user.id}`,
      )
        .then((response) => response.json())
        .then((json) => setOffers(json))
        .catch((error) => console.error(error));
    }
  }, [session, status]);

  return (
    <>
      <div className="mx-2 h-full w-1/3 rounded-md bg-slate-50 p-6 shadow-md">
        <p>Offres :</p>
        <div className="flex">
          <a
            href={`${process.env.NEXT_PUBLIC_API_URL}/api/getTemplatePTF`}
            className="my-2 mr-2 rounded-md bg-slate-100 p-2 hover:bg-slate-300"
          >
            Download PTF Template
          </a>
          <a
            href={`${process.env.NEXT_PUBLIC_API_URL}/api/getTemplateSyllabus`}
            className="my-2 mr-2 rounded-md bg-slate-100 p-2 hover:bg-slate-300"
          >
            Download Syllabus Template
          </a>
        </div>
        {offers == null || offers.length <= 0 ? (
          <>
            <p className="my-2 h-full rounded-md bg-slate-200 p-2">
              Vous n&apos;avez pas d&apos;offres
            </p>
          </>
        ) : (
          offers.map((offer, index) => {
            return (
              <>
                <form
                  key={index}
                  className="my-2 flex h-full items-center rounded-md bg-slate-200 p-2"
                  action={() => handleSubmit()}
                >
                  <Link
                    key={index}
                    href={getPath(offer)}
                    className="m-2 w-1/2 rounded-md bg-slate-300 px-1 py-6 hover:bg-slate-400 active:bg-slate-500"
                  >
                    Offre n°{offer.id}
                  </Link>
                  <label
                    htmlFor="ptfBtn"
                    className="m-2 h-20 w-1/4 overflow-hidden text-ellipsis rounded-md bg-slate-300 p-2 hover:bg-slate-400 active:bg-slate-500"
                  >
                    {ptfFileName == "" ? "📎 upload PTF" : ptfFileName}
                  </label>
                  <input
                    id="ptfBtn"
                    className="hidden"
                    type="file"
                    name="ptf"
                    onChange={(e) => handleChange(e)}
                  />
                  <input
                    id="offerID"
                    className="hidden"
                    type="text"
                    name="offerID"
                    value={offer.id}
                  ></input>
                  <button
                    type="submit"
                    className="m-2 w-1/4 rounded-md bg-slate-400 hover:bg-slate-500 active:bg-slate-600"
                  >
                    Upload
                  </button>
                </form>
                {feedback == "" ? (
                  <></>
                ) : (
                  <p className="rounded-md bg-slate-200 p-2">{feedback}</p>
                )}
                <a
                  href={`${process.env.NEXT_PUBLIC_API_URL}/api/getPTF?offerID=${offer.id}`}
                  className="my-2"
                >
                  Download PTF
                </a>
              </>
            );
          })
        )}
      </div>
    </>
  );
}
