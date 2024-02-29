// "use client";

// import { useEffect, useState } from "react";

// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useForm } from "react-hook-form";
// import { Separator } from "@/components/ui/separator";
// import React from "react";

// type Company = {
//   name: string;
//   siret: string;
//   address: string;
//   zipCode: string;
//   city: string;
//   country: string;
// };

// type Person = {
//   firstName: string;
//   lastName: string;
//   phone: string;
//   email: string;
// };

// type Structure = Company | Person;

// interface Employee {}

// const personBaseSchema = {
//   firstName: z.string(),
//   lastName: z.string(),
//   phone: z.string(),
//   email: z.string().email(),
// };

// const tempWorkerSchema = z.object({
//   status: z.literal("temp-worker"),
//   ...personBaseSchema,
// });

// const freelanceSchema = z.object({
//   status: z.literal("freelance"),
//   ...personBaseSchema,
// });

// const companySchema = z.object({
//   status: z.literal("llc"),
//   name: z.string(),
//   siret: z.string(),
//   address: z.string(),
//   zipCode: z.string(),
//   city: z.string(),
//   country: z.string(),
// });

// // Schema must be either companySchema or personSchema
// const structureSchema = z.discriminatedUnion("status", [
//   tempWorkerSchema,
//   freelanceSchema,
//   companySchema,
// ]);

// type StructureSchemaType = z.infer<typeof structureSchema>;

// export default function StructureForm() {
//   const form = useForm<StructureSchemaType>({
//     resolver: zodResolver(structureSchema),
//     // TODO : Define default values by fetching from the database  (Structure depends on the structure status)
//   });

//   const [canEdit, setCanEdit] = useState(false);

//   const [status, setStatus] = useState<string>();

//   const personValues = ["temp-worker", "freelance"];
//   const companyValues = ["llc"];

//   function onSubmit(values: z.infer<typeof structureSchema>) {
//     console.log(values);
//     setCanEdit(false);
//   }

//   return (
//     <Card className="mx-auto mt-8 max-w-6xl px-8">
//       <CardHeader>
//         <CardTitle>Ma Structure</CardTitle>
//         <CardDescription>Informations sur ma structure</CardDescription>
//       </CardHeader>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)}>
//           <CardContent>
//             <FormField
//               control={form.control}
//               name="status"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel htmlFor="status">Statut</FormLabel>
//                   <Select
//                     onValueChange={(value) => {
//                       field.onChange(value);
//                       setStatus(value);
//                     }}
//                     defaultValue={field.value}
//                   >
//                     <FormControl>
//                       <SelectTrigger id="status">
//                         <SelectValue placeholder="Choisissez votre statut" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       <SelectItem value="temp-worker">Vacataire</SelectItem>
//                       <SelectItem value="freelance">
//                         Auto-entrepreneur
//                       </SelectItem>
//                       <SelectItem value="llc">SARL</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {status && (
//               <>
//                 <Separator className="my-4" />
//                 {personValues.includes(status) ? (
//                   <PersonForm form={form} />
//                 ) : (
//                   <CompanyForm form={form} />
//                 )}
//               </>
//             )}
//           </CardContent>
//           <CardFooter className="flex justify-end gap-1">
//             <Button variant="destructive">Annuler</Button>
//             <Button type="submit">Enregistrer</Button>
//           </CardFooter>
//         </form>
//       </Form>
//     </Card>
//   );
// }

// function PersonForm({ form }: { form: any }) {
//   return (
//     <div>
//       <FormField
//         control={form.control}
//         name="firstName"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel htmlFor="firstName">Prénom</FormLabel>
//             <FormControl>
//               <Input {...field} id="firstName" placeholder="Prénom" />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//       <FormField
//         control={form.control}
//         name="lastName"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel htmlFor="lastName">Nom</FormLabel>
//             <FormControl>
//               <Input {...field} id="lastName" placeholder="Nom" />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//       <FormField
//         control={form.control}
//         name="phone"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel htmlFor="phone">Téléphone</FormLabel>
//             <FormControl>
//               <Input {...field} id="phone" placeholder="Téléphone" />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//       <FormField
//         control={form.control}
//         name="email"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel htmlFor="email">Email</FormLabel>
//             <FormControl>
//               <Input {...field} id="email" placeholder="Email" />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//     </div>
//   );
// }

// function CompanyForm({ form }: { form: any }) {
//   return (
//     <div>
//       <FormField
//         control={form.control}
//         name="name"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel htmlFor="name">Nom</FormLabel>
//             <FormControl>
//               <Input {...field} id="name" placeholder="Nom" />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//       <FormField
//         control={form.control}
//         name="siret"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel htmlFor="siret">SIRET</FormLabel>
//             <FormControl>
//               <Input {...field} id="siret" placeholder="SIRET" />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//       <FormField
//         control={form.control}
//         name="address"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel htmlFor="address">Adresse</FormLabel>
//             <FormControl>
//               <Input {...field} id="address" placeholder="Adresse" />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//       <FormField
//         control={form.control}
//         name="zipCode"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel htmlFor="zipCode">Code postal</FormLabel>
//             <FormControl>
//               <Input {...field} id="zipCode" placeholder="Code postal" />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//       <FormField
//         control={form.control}
//         name="city"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel htmlFor="city">Ville</FormLabel>
//             <FormControl>
//               <Input {...field} id="city" placeholder="Ville" />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//       <FormField
//         control={form.control}
//         name="country"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel htmlFor="country">Pays</FormLabel>
//             <FormControl>
//               <Input {...field} id="country" placeholder="Pays" />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//     </div>
//   );
// }
