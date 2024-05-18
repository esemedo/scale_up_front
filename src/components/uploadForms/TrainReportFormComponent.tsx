"use client";

import { signIn, useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";

interface User {
  uuid: string;
}

interface TrainReport {
  name: string;
  surname: string;
  email: string;
  phone: string;
  answer: string;
}

export default function SubjectList() {
  const { data: session, status } = useSession(); //will use session to autogenerate personal info

  const [feedback, setFeedback] = useState("");
  const [answer, setAnswer] = useState("");

  const params = useParams<{ offerID: string; needID: string }>();

  async function handleSubmit() {
    if (session != null && session.user != undefined) {
      const surname = session.user.name.split(" ", 2)[0];
      const name = session.user.name.split(" ", 2)[1];
      const trainingReport: TrainReport = {
        surname: surname,
        name: name,
        email: session.user.email,
        phone: session.user.telephone,
        answer: answer,
      };
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/generateTrainingReport`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(trainingReport),
          },
        ).then((response) =>
          response.ok
            ? setFeedback("Generation successful.")
            : setFeedback("Error occurred: " + response.statusText),
        );
        window.open(
          `${process.env.NEXT_PUBLIC_API_URL}/api/downloadTrainingReport?name=${name}&surname=${surname}`,
          "_blank",
        );
      } catch (error) {
        console.error("Error: ", error);
      }
    }
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("keycloak", {
        callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      }); // Force sign in if not authenticated
    }
  }, [params.needID, status]);
  //will need to sanitize form to not have code injection issues
  return (
    <>
      <div className="mx-2 h-full w-1/3 rounded-md bg-slate-50 p-6 shadow-md">
        <p>Génération de bilan de formation :</p>
        <form
          className="my-2 flex h-full flex-col items-center rounded-md bg-slate-200 p-2"
          action={() => handleSubmit()}
        >
          <p className="text-center">
            Comment avez-vous trouvé le contenu de la formation par rapport à
            vos besoins ?
          </p>
          <textarea
            id="answer"
            className="text-pretty m-2  min-h-[40px] break-words rounded-md bg-slate-300 p-2 hover:bg-slate-400 active:bg-slate-500"
            placeholder="Répondez ici."
            onChange={(e) => setAnswer(e.target.value)}
            name="answer"
          ></textarea>
          <button
            type="submit"
            className="m-2 w-1/4 rounded-md bg-slate-400 hover:bg-slate-500 active:bg-slate-600"
          >
            Download
          </button>
          {feedback == "" ? (
            <></>
          ) : (
            <p className="rounded-md bg-slate-200 p-2">{feedback}</p>
          )}
        </form>
      </div>
    </>
  );
}
