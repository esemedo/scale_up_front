"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Image from "next/image";
import Logo from "@/../public/img/logo.svg";
import Link from "next/link";

export default function RegisterSuccess() {
  const router = useRouter();
  const { status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);
  return (
    <div className={"mx-auto flex h-full max-w-screen-lg items-center"}>
      <div className={"flex w-full flex-row"}>
        <div
          className={
            "flex flex-1 flex-col items-center justify-center gap-4 rounded-l-3xl bg-dark-gradient py-8"
          }
        >
          <Image src={Logo} alt={"logo"} width={256} height={418} />
          <span
            className={
              "font-title text-3xl font-normal uppercase tracking-widest text-white"
            }
          >
            Exploitation
          </span>
          <span className={"text-lg font-extralight text-white"}>
            L'application faite pour vous.
          </span>
        </div>
        <div className={"flex flex-1 flex-col rounded-r-3xl bg-white "}>
          <span className={"py-16 text-center text-xl font-extralight"}>
            Inscription
          </span>
          <p className={"text-center text-lg font-light"}>
            Votre compte a été créé avec succès.
            <br />
            Vous devez attendre qu'un acheteur vous approuve.
            <br />
            Vous serez notifié par email.
          </p>

          <Link
            className={"mt-4 text-center text-lg font-light underline"}
            href={"/"}
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
