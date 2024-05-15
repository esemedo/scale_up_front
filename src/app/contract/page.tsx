"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { API_URL } from "../../../utils/url";

const contractFormSchema = z.object({
  hourlyPrice: z.string(),
  hoursVolume: z.string(),
  startDate: z.string().date(),
  endDate: z.string().date(),
});

type contractFormField = z.infer<typeof contractFormSchema>;

const generateContract = async (data: contractFormField) => {
  console.log("data sent to the server: ", data);

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  console.log("server response: ", response);

  if (!response.ok) {
    throw new Error("one error occured during the contract generation");
  }

  return response.blob();
};

export default function Page() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<contractFormField>({ resolver: zodResolver(contractFormSchema) });

  const onSubmit = async (data: contractFormField) => {
    console.log("form data: ", JSON.stringify(data));

    try {
      const blob = await generateContract(data);
      console.log("blob:", blob);
      const url = window.URL.createObjectURL(blob);
      console.log("blob url: ", url);

      const lien = document.createElement("a");
      lien.href = url;
      lien.setAttribute("download", "contrat.pdf");
      document.body.appendChild(lien);
      lien.click();
      lien.remove();
    } catch (error) {
      console.error("error: ", error);
      setError("root", {
        message: "one error occured during the contract generation",
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
            ? "contrat en cours de génération"
            : "générer le contat"}
        </button>

        {errors.root && (
          <div className="text-red-700">{errors.root.message}</div>
        )}
      </form>
    </div>
  );
}
