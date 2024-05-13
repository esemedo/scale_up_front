"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Register() {
  const router = useRouter();
  return (
    <div className={"flex flex-row"}>
      <div>IMG</div>
      <div className={"flex-col"}>
        <h1>Inscription</h1>
        <form className={"flex flex-col"}>
          <div className={"bg-white-polar"}>
            <input type={"checkbox"} id={""} />{" "}
            <label>Intervenant ou société ?</label>
          </div>
          <div className={"flex flex-row"}>
            <input />
            <input />
          </div>
          <input />
          <input />
          <div className={"flex flex-row"}>
            <input />
            <input />
          </div>
          <progress />
          <div className={"flex flex-col"}>
            <input type={"submit"} />
            <p>
              Déja inscrit ? Cliquer{" "}
              <Link href={"/"} className={"font-bold"}>
                ici
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
