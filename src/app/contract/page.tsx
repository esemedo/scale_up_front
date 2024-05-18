"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const contractFormSchema = z.object({
  hourlyPrice: z.string(),
  hoursVolume: z.string(),
  startDate: z.string().date(),
  endDate: z.string().date(),
});

type contractFormField = z.infer<typeof contractFormSchema>;

const generateContract = async (data: contractFormField) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/pdf/generatePDF`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

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
    try {
      const blob = await generateContract(data);
      const url = window.URL.createObjectURL(blob);

      const lien = document.createElement("a");
      lien.href = url;
      lien.setAttribute("download", "contrat.pdf");
      document.body.appendChild(lien);
      lien.click();
      lien.remove();
    } catch (error) {
      setError("root", {
        message: "one error occured during the contract generation",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg"
      >
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Générer un contrat
        </h2>

        <div className="mb-4">
          <label
            htmlFor="hourlyPrice"
            className="mb-2 block font-semibold text-gray-700"
          >
            Prix horaire
          </label>
          <input
            {...register("hourlyPrice")}
            type="number"
            name="hourlyPrice"
            id="hourlyPrice"
            placeholder="Prix horaire"
            className={`form-input w-full rounded-lg border px-4 py-2 ${
              errors.hourlyPrice ? "border-red-500" : "border-gray-300"
            } focus:border-blue-500 focus:outline-none`}
          />
          {errors.hourlyPrice && (
            <div className="mt-1 text-sm text-red-500">
              {errors.hourlyPrice.message}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="hoursVolume"
            className="mb-2 block font-semibold text-gray-700"
          >
            Volume heure
          </label>
          <input
            {...register("hoursVolume")}
            type="number"
            name="hoursVolume"
            id="hoursVolume"
            placeholder="Volume d'heure"
            className={`form-input w-full rounded-lg border px-4 py-2 ${
              errors.hoursVolume ? "border-red-500" : "border-gray-300"
            } focus:border-blue-500 focus:outline-none`}
          />
          {errors.hoursVolume && (
            <div className="mt-1 text-sm text-red-500">
              {errors.hoursVolume.message}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="startDate"
            className="mb-2 block font-semibold text-gray-700"
          >
            Date de début
          </label>
          <input
            {...register("startDate")}
            type="date"
            name="startDate"
            id="startDate"
            placeholder="Date de début"
            className={`form-input w-full rounded-lg border px-4 py-2 ${
              errors.startDate ? "border-red-500" : "border-gray-300"
            } focus:border-blue-500 focus:outline-none`}
          />
          {errors.startDate && (
            <div className="mt-1 text-sm text-red-500">
              {errors.startDate.message}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="endDate"
            className="mb-2 block font-semibold text-gray-700"
          >
            Date de fin
          </label>
          <input
            {...register("endDate")}
            type="date"
            name="endDate"
            id="endDate"
            placeholder="Date de fin"
            className={`form-input w-full rounded-lg border px-4 py-2 ${
              errors.endDate ? "border-red-500" : "border-gray-300"
            } focus:border-blue-500 focus:outline-none`}
          />
          {errors.endDate && (
            <div className="mt-1 text-sm text-red-500">
              {errors.endDate.message}
            </div>
          )}
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full rounded-lg bg-blue-500 py-2 text-white transition duration-200 hover:bg-blue-600 disabled:opacity-50"
        >
          {isSubmitting
            ? "Contrat en cours de génération..."
            : "Générer le contrat"}
        </button>

        {errors.root && (
          <div className="mt-4 text-sm text-red-500">{errors.root.message}</div>
        )}
      </form>
    </div>
  );
}
