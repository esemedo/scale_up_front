import React from "react";

import CardContract from "@/components/card/CardContract";
import { Contract } from "@/types/contracts";

export default async function page() {
  const contracts: Contract[] = await fetch(
    "http://127.0.0.1:3000/api/contracts",
    { cache: "no-store" },
  )
    .then((res) => res.json())
    .catch((error) => []);

  return (
    <div className="mx-auto flex w-2/3 flex-col items-center justify-center gap-3 border-2 shadow-red-400 ">
      <div className="w-50 flex h-10 text-center text-xl font-bold">
        <div className="">Mes contrats</div>
      </div>

      {contracts.map((contract, index) => (
        <CardContract key={index} contract={contract} />
      ))}
    </div>
  );
}
