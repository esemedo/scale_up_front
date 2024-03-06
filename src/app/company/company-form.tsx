"use client";

import { ChevronsUpDown } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  FancyInput,
  FancySelectTrigger,
  FancyTriggerButton,
} from "@/components/fancy-form-components";
import { Button } from "@/components/ui/button";
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
import { useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import {
  ComboboxResponsive,
  ComboboxResponsiveContent,
  ComboboxResponsiveTrigger,
} from "@/components/combobox-responsive";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

import { cn } from "@/lib/utils";

import { Company } from "@/types/company";

const companySchema = z.object({
  status: z.enum(["temp-worker", "freelance", "llc"]),
  name: z.string(),
  siret: z.string(),
  address: z.string(),
  zipCode: z.string(),
  city: z.string(),
  country: z.string(),
});

export type CompanySchemaType = z.infer<typeof companySchema>;

interface CompanyFormProps {
  company: Company;
  countriesIso: string[];
  onSubmit?: (values: CompanySchemaType) => void;
}

export default function CompanyForm({
  company,
  countriesIso,
  onSubmit,
}: CompanyFormProps) {
  const form = useForm<CompanySchemaType>({
    resolver: zodResolver(companySchema),
    // TODO : Define default values by fetching from the database  (Structure depends on the company status)
    defaultValues: {
      status: "llc",
      name: company.name || "",
      siret: "",
      address: "",
      zipCode: "",
      city: "",
      country: "",
    },
  });

  const countries: {
    value: string;
    label: string;
  }[] = countriesIso.map((country) => ({ value: country, label: country }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(console.log)}>
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={(value) => field.onChange(value)}
                defaultValue={field.value}
              >
                <FormControl>
                  <FancySelectTrigger id="status" label="Statut">
                    <SelectValue placeholder="Choisissez votre statut" />
                  </FancySelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="temp-worker">Vacataire</SelectItem>
                  <SelectItem value="freelance">Auto-entrepreneur</SelectItem>
                  <SelectItem value="llc">SARL</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FancyInput {...field} id="name" label="Nom" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="siret"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FancyInput {...field} id="siret" label="SIRET" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FancyInput {...field} id="address" label="Adresse" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0 md:grid md:grid-cols-3">
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <FancyInput {...field} id="zipCode" label="Code postal" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <FancyInput {...field} id="city" label="Ville" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => {
              return (
                <FormItem className="w-full sm:w-auto md:col-span-3">
                  <Drawer>
                    <DrawerTrigger asChild>
                      <FormControl>
                        <FancyTriggerButton
                          id="country"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                          label="Pays"
                        >
                          {field.value
                            ? countries.find(
                                (language) => language.value === field.value,
                              )?.label
                            : "Sélectionnez un pays"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </FancyTriggerButton>
                      </FormControl>
                    </DrawerTrigger>
                    <DrawerContent className="p-0">
                      <Command>
                        <CommandInput placeholder="Chercher un pays..." />
                        <CommandEmpty>Aucun pays trouvé</CommandEmpty>
                        <CommandGroup className="max-h-[200px] overflow-y-auto overflow-x-hidden">
                          {countries.map((country) => (
                            <CommandItem
                              value={country.label}
                              key={country.value}
                              onSelect={() => {
                                form.setValue("country", country.value);
                              }}
                            >
                              {country.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </DrawerContent>
                  </Drawer>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <div className="mt-4 flex justify-end gap-1">
          <Button variant="destructive">Annuler</Button>
          <Button type="submit">Enregistrer</Button>
        </div>
      </form>
    </Form>
  );
}
