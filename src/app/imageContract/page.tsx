import Head from "next/head";
import React from "react";

function page() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 py-8">
        <Head>
          <title>Contrat de Travail</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-md">
          <h1 className="mb-8 text-3xl font-bold">Contrat de Travail</h1>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">1. Parties</h2>
            <div className="flex gap-4 ">
              <div className=" font-bold">Employeur : </div>
              <input
                className="w-[60%] border-2"
                placeholder="Nom de l'Employeur, Adresse de
              l'Employeur"
                type="text"
              />
            </div>
            <br />
            <div className="flex gap-8 ">
              <div className=" font-bold">Employé : </div>
              <input
                className="w-[60%] border-2"
                placeholder="Nom de l'Employé, Adresse de
              l'Employé"
                type="text"
              />
            </div>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">2. Objet du Contrat</h2>
            <p className="mb-2">
              L'employé sera engagé en tant que <strong>Secrétaire</strong> et
              ses principales responsabilités incluent :
            </p>
            <ul className="ml-4 list-inside list-disc">
              <li>Responsabilité 1 : gestion des communications</li>
              <li>Responsabilité 2: organisation et planification</li>
              <li>Responsabilité 3 : gestion des dossiers et documents</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">3. Durée du Contrat</h2>
            <p className="mb-2">
              Le contrat commence le <strong>27 / 09 / 2024</strong> et est
              valable jusqu'au <strong>27 / 09 / 2026</strong>. (ou indéterminé)
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">4. Rémunération</h2>
            <p className="mb-2">
              L'employé recevra un salaire de <strong>1,856.89</strong> par{" "}
              <strong>Période de Paiement</strong>, versé le{" "}
              <strong>Jour de Paiement</strong> de chaque mois. Les autres
              avantages incluent :
            </p>
            <ul className="ml-4 list-inside list-disc">
              <li>Avantage 1 : prime annuelle</li>
              <li>Avantage 2 : Assurance santé et avantages sociaux</li>
              <li>Avantage 3 : Congés payés supplémentaires </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">5. Temps de Travail</h2>
            <p className="mb-2">
              L'employé travaillera <strong>39</strong> heures par semaine, du{" "}
              <strong>Lundi</strong> au <strong>Vendredi</strong> de{" "}
              <strong>8 heure</strong> à <strong>17 heure</strong>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">6. Congés</h2>
            <p className="mb-2">
              L'employé a droit à <strong>35 jours</strong> jours de congé payés
              par an, en plus des jours fériés légaux.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">7. Confidentialité</h2>
            <p className="mb-2">
              L'employé doit respecter la confidentialité des informations de
              l'entreprise et ne doit pas divulguer d'informations sensibles à
              des tiers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">8. Résiliation</h2>
            <p className="mb-2">
              Ce contrat peut être résilié par l'une ou l'autre des parties avec
              un préavis de <strong>60</strong> jours.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">9. Signatures</h2>
            <div className="flex justify-between">
              <div>
                <p>
                  <strong>Signature de l'Employeur:</strong>
                </p>
                <p>______________________</p>
                <p>Nom de l'Employeur</p>
              </div>
              <div>
                <p>
                  <strong>Signature de l'Employé:</strong>
                </p>
                <p>______________________</p>
                <p>Nom de l'Employé</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default page;
