"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const contractFormSchema = z.object({
  hourlyPrice: z.number().positive(),
  hoursVolume: z.number().positive(),
  startDate: z.date(),
  endDate: z.date(),
});

type contractFormField = z.infer<typeof contractFormSchema>;

export default function Page() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<contractFormField>({ resolver: zodResolver(contractFormSchema) });

  const onSubmit = async (data: contractFormField) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(data);
    } catch (error) {
      setError("root", {
        message: "Une erreur est survenue lors de la génération du contrat",
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="hourlyPrice"></label>
        <input
          {...register("hourlyPrice")}
          type="number"
          name="hourlyPrice"
          id="hourlyPrice"
          placeholder="hourlyPrice"
        />

        {errors.hourlyPrice && (
          <div className="text-red-700">{errors.hourlyPrice.message}</div>
        )}

        <label htmlFor="hoursVolume"></label>
        <input
          {...register("hoursVolume")}
          type="number"
          name="hoursVolume"
          id="hoursVolume"
          placeholder="hoursVolume"
        />

        {errors.hoursVolume && (
          <div className="text-red-700">{errors.hoursVolume.message}</div>
        )}

        <label htmlFor="startDate"></label>
        <input
          {...register("startDate")}
          type="date"
          name="startDate"
          id="startDate"
          placeholder="startDate"
        />

        {errors.startDate && (
          <div className="text-red-700">{errors.startDate.message}</div>
        )}

        <label htmlFor="endDate"></label>
        <input
          {...register("endDate")}
          type="date"
          name="endDate"
          id="endDate"
          placeholder="endDate"
        />

        {errors.endDate && (
          <div className="text-red-700">{errors.endDate.message}</div>
        )}

        <button disabled={isSubmitting} type="submit">
          {isSubmitting
            ? "Contrat en cours de génération"
            : "Générer le contat"}
        </button>

        {errors.root && (
          <div className="text-red-700">{errors.root.message}</div>
        )}
      </form>
    </div>
  );
}
