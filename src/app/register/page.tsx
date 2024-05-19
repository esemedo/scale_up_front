"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import Image from "next/image";
import Logo from "@/../public/img/logo.svg";
import { SubmitHandler, useForm } from "react-hook-form";
import { TextInput } from "@/components/Input/TextInput";
import { PasswordProgress } from "@/components/Progress/PasswordProgress";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z, zPhoneNumber } from "@/lib/fr-zod";
import { Checkbox } from "@/components/ui/checkbox";
import { PhoneInput } from "@/components/ui/phone-input";
import axios from "axios";
import { E164Number } from "libphonenumber-js";

const BUYER_ROLE = "buyer";
const EDUCATIONAL_ASSISTANT_ROLE = "educational-assistant";
const MANAGEMENT_CONTROLLER_ROLE = "management-controller";
const PROGRAM_DIRECTOR_ROLE = "program-director";
const PROGRAM_MANAGER_ROLE = "program-manager";
const SPEAKER_COMPANY_ROLE = "speaker-company";

const USER_ROLES = [
  BUYER_ROLE,
  EDUCATIONAL_ASSISTANT_ROLE,
  MANAGEMENT_CONTROLLER_ROLE,
  PROGRAM_DIRECTOR_ROLE,
  PROGRAM_MANAGER_ROLE,
  SPEAKER_COMPANY_ROLE,
] as const;

const RegisterFormSchema = z
  .object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfirm: z.string().min(8).optional(),
    phone: zPhoneNumber,
    external: z.boolean().optional(),
    role: z.enum(USER_ROLES).optional(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Les mots de passe ne correspondent pas",
    path: ["passwordConfirm"],
  })
  .refine((data) => data.external || data.role, {
    message: "Le role est requis",
    path: ["role"],
  })
  .refine((data) => data.external || data.email.endsWith("@edu.esiee-it.fr"), {
    message: "L'email doit se terminer par @edu.esiee-it.fr",
    path: ["email"],
  });

const ROLES = [
  { value: BUYER_ROLE, label: "Acheteur" },
  { value: EDUCATIONAL_ASSISTANT_ROLE, label: "Assistant éducatif" },
  { value: MANAGEMENT_CONTROLLER_ROLE, label: "Contrôleur de gestion" },
  { value: PROGRAM_DIRECTOR_ROLE, label: "Directeur de programme" },
  { value: PROGRAM_MANAGER_ROLE, label: "Gestionnaire de programme" },
];

export default function Register() {
  const router = useRouter();
  const { status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);
  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      external: false,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: undefined,
      password: "",
      passwordConfirm: "",
    },
  });

  const password = form.watch("password");
  const external = form.watch("external");
  const onSubmit: SubmitHandler<z.infer<typeof RegisterFormSchema>> = (
    data,
  ) => {
    console.log(data);
    const role = data.external ? SPEAKER_COMPANY_ROLE : data.role;
    console.log(data, role);
    const postData = {
      ...data,
      role,
    };
    delete postData.external;
    delete postData.passwordConfirm;
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/register`, postData)
      .then((_res) => {
        if (role !== SPEAKER_COMPANY_ROLE) {
          router.push("/register/success");
          return;
        }
        router.push("/");
      })
      .catch((err) => {
        if (err.response?.status === 409) {
          // set email error
          form.setError("email", {
            type: "manual",
            message: "Cet email est déjà utilisé",
          });
        } else {
          form.setError("root", {
            type: "manual",
            message: "Une erreur est survenue",
          });
        }
      });
  };

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
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={"flex flex-col gap-4 px-12 pb-16"}
            >
              {form.formState.errors.root && (
                <p className={"text-sm text-red-600 "}>
                  {form.formState.errors.root.message}
                </p>
              )}
              <FormField
                control={form.control}
                name="external"
                render={({ field }) => (
                  <FormItem
                    className={
                      "button flex w-fit items-center gap-2 space-y-0 rounded-xl bg-white-polar p-2"
                    }
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Intervenant ou société ?</FormLabel>
                  </FormItem>
                )}
              />
              <div className={"flex flex-row justify-between gap-4"}>
                <TextInput
                  label={"Prénom"}
                  name={"firstName"}
                  type={"text"}
                  placeholder={"Thomas"}
                  control={form.control}
                />
                <TextInput
                  label={"Nom"}
                  name={"lastName"}
                  type={"text"}
                  placeholder={"Dupont"}
                  control={form.control}
                />
              </div>
              <TextInput
                label={"Adresse email"}
                name={"email"}
                type={"email"}
                control={form.control}
                placeholder={
                  external ? "exemple@mail.com" : "exemple@edu.esiee-it.fr"
                }
              />
              <FormField
                control={form.control}
                name={"phone"}
                render={({ field }) => (
                  <FormItem
                    className={"relative flex flex-1 flex-col gap-2 space-y-0"}
                  >
                    <FormLabel
                      className={
                        'absolute -top-2.5 left-3 line-clamp-1 bg-white text-sm after:text-red-600 after:content-["*"]'
                      }
                      htmlFor={"phone"}
                    >
                      Numéro de téléphone
                    </FormLabel>
                    <FormControl>
                      <PhoneInput
                        name={"phone"}
                        defaultCountry={"FR"}
                        value={field.value as E164Number}
                        placeholder={"Numéro de téléphone professionnel"}
                        onChange={(phone) => field.onChange(phone)}
                        className={"rounded border border-black"}
                      />
                    </FormControl>
                    <FormMessage className={"text-sm font-light"} />
                  </FormItem>
                )}
              />
              {!external && (
                <FormField
                  name={"role"}
                  control={form.control}
                  render={({ field }) => (
                    <div className={"relative flex flex-1 flex-col gap-2"}>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        name={"role"}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={"Choisir un role"} />
                        </SelectTrigger>
                        <SelectContent>
                          {ROLES.map((role) => (
                            <SelectItem key={role.value} value={role.value}>
                              {role.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormLabel
                        className={
                          'absolute -top-2.5 left-3 bg-white text-sm after:text-red-600 after:content-["*"]'
                        }
                        htmlFor={"role"}
                      >
                        Role
                      </FormLabel>
                      <FormMessage className={"text-sm font-light"} />
                    </div>
                  )}
                />
              )}
              <div className={"flex flex-row justify-between gap-4"}>
                <TextInput
                  label={"Mot de passe"}
                  name={"password"}
                  type={"password"}
                  control={form.control}
                />
                <TextInput
                  label={"Confirmer le mot de passe"}
                  name={"passwordConfirm"}
                  type={"password"}
                  placeholder={"Confirmer le mot de passe"}
                  control={form.control}
                />
              </div>
              <PasswordProgress password={password} />
              <div
                className={"flex flex-col items-center justify-between gap-4"}
              >
                <button
                  disabled={form.formState.isSubmitting}
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
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
