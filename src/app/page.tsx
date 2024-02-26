"use client";
import isAuth from "@/components/isAuth";
import { KeycloakContext } from "@/components/isAuth";
import { useContext } from "react";
import Link from "next/link";
function Home() {
  const keycloak = useContext(KeycloakContext);
  return (
    <div className={"flex flex-col"}>
      welcome to home{" "}
      <span>
        {keycloak?.tokenParsed?.family_name} {keycloak?.tokenParsed?.given_name}
      </span>
      <div>
        <button onClick={() => keycloak?.logout()}>logout</button>
      </div>
      <div>
        <Link href={"/products"}> go to products</Link>
      </div>
    </div>
  );
}

export default isAuth(Home);
