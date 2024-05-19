"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { FancyInput } from "@/components/fancy-form-components";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

const contributorSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  email: z.string().email(),
});

export type ContributorSchemaType = z.infer<typeof contributorSchema>;

interface ContributorFormProps {
  onSubmit: (data: ContributorSchemaType) => void;
  onCancel: () => void;
}
export default function ContributorForm({
  onSubmit,
  onCancel,
}: ContributorFormProps) {
  const form = useForm<ContributorSchemaType>({
    resolver: zodResolver(contributorSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FancyInput {...field} id="firstName" label="Prénom" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FancyInput {...field} id="lastName" label="Nom" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FancyInput {...field} id="phone" label="Téléphone" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FancyInput {...field} id="email" label="Email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-1">
          <Button variant="destructive" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit">Ajouter</Button>
        </div>
      </form>
    </Form>
  );
}
