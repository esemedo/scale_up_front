"use client";
import { Progress } from "@/components/ui/progress";
import { Contract } from "@/types/contracts";
import Link from "next/link";
import React from "react";
import { CiImport } from "react-icons/ci";
import { IoDocumentText, IoEyeOutline } from "react-icons/io5";

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
  console.log(contract.status);

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

  return (
    <div className="flex  h-28 w-full flex-row rounded-md border-2 bg-slate-100">
      <div>
        <IoDocumentText className=" text-8xl" />{" "}
      </div>

      <div className="w-full">
        {" "}
        <p className="font-semibold">Contrat n°{contract.id}</p>
        <div>Description du contrat</div>
        <Progress
          statusColor={statusColor}
          value={contract.status == 0 ? 10 : contract.status == 1 ? 50 : 100}
          className="w-3/4"
        />
        <div className={`flex justify-center ${statusColor}`}>
          <p>{statusText} </p>
        </div>
        {/* <div className='flex justify-center'><p>En attente</p></div> */}
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
      </div>
    </div>
  );
}

export default CardContract;
