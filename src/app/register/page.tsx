"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import Image from "next/image";
import Logo from "@/../public/img/logo.svg";
import { Form, Formik, Field, FormikErrors } from "formik";
import { TextInput } from "@/components/Input/TextInput";
import { PasswordProgress } from "@/components/Progress/PasswordProgress";
import { CheckCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as yup from "yup";

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  phone: string;
  external: boolean;
  role: string;
}

export default function Register() {
  const router = useRouter();
  const { data: session, status } = useSession();
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
            "flex flex-1 flex-col items-center justify-center gap-4 rounded-l-3xl bg-dark-gradient"
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
          <Formik
            initialValues={
              {
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                external: false,
                passwordConfirm: "",
                phone: "",
                role: "",
              } as RegisterFormValues
            }
            validate={(values) => {
              const errors: FormikErrors<RegisterFormValues> = {};
              if (!values.email) {
                errors.email = "Champ requis";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ values, isSubmitting, setFieldValue }) => (
              <Form className={"flex flex-col gap-4 px-12 pb-16"}>
                <div
                  className={"flex w-fit gap-2 rounded-xl bg-white-polar p-2"}
                >
                  <Field type={"checkbox"} id={"external"} name={"external"} />
                  <label htmlFor={"external"}>Intervenant ou société ?</label>
                </div>
                <div className={"flex flex-row justify-between gap-4"}>
                  <TextInput
                    label={"Prénom"}
                    name={"prenom"}
                    type={"text"}
                    placeholder={"Thomas"}
                  />
                  <TextInput
                    label={"Nom"}
                    name={"nom"}
                    type={"text"}
                    placeholder={"Dupont"}
                  />
                </div>
                <TextInput
                  label={"Adresse email"}
                  name={"email"}
                  type={"email"}
                  placeholder={
                    values.external ? "exemple@mail.com" : "exemple@esiee-it.fr"
                  }
                />
                <TextInput
                  label={"Numéro de téléphone professionnel"}
                  name={"phone"}
                  type={"tel"}
                  placeholder={"+33 6 12 34 56 78"}
                />
                {!values.external && (
                  <div className={"relative flex flex-1 flex-col gap-2"}>
                    <Select
                      onValueChange={(value) => setFieldValue("role", value)}
                      defaultValue={values.role}
                      name={"role"}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            values.role.length > 0
                              ? values.role
                              : "Choisir un role"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={"admin"}>Administrateur</SelectItem>
                        <SelectItem value={"user"}>Utilisateur</SelectItem>
                      </SelectContent>
                    </Select>
                    <label
                      className={
                        'absolute -top-2.5 left-3 bg-white px-1 text-sm after:text-red-600 after:content-["*"]'
                      }
                      htmlFor={"role"}
                    >
                      Role
                    </label>
                  </div>
                )}
                <div className={"flex flex-row justify-between gap-4"}>
                  <TextInput
                    label={"Mot de passe"}
                    name={"password"}
                    type={"password"}
                  />
                  <TextInput
                    label={"Confirmer le mot de passe"}
                    name={"password-confirm"}
                    type={"password"}
                  />
                </div>
                <PasswordProgress password={values.password} />
                <div
                  className={"flex flex-col items-center justify-between gap-4"}
                >
                  <button
                    disabled={isSubmitting}
                    className={
                      "flex flex-row gap-2 rounded-full bg-electric-blue p-3 px-6 text-white"
                    }
                    type="submit"
                  >
                    <CheckCircle />
                    S'incrire
                  </button>
                  <p className={"text-xs"}>
                    Déja inscrit ? Cliquer{" "}
                    <Link href={"/"} className={"font-bold"}>
                      ici
                    </Link>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
