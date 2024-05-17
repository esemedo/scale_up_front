"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

interface HourlyRate {
  rate: number;
  realrate: number;
}

const GetAllRateCalculeComponenent = () => {
  const [rates, setRates] = useState<HourlyRate[]>([]);
  const [totalRate, setTotalRate] = useState<number>(0);
  const [totalRealRate, setTotalRealRate] = useState<number>(0);
  const [difference, setDifference] = useState<number>(0);

  useEffect(() => {
    const getAllRates = async () => {
      try {
        const response = await axios.get<{ hourlyRates: HourlyRate[] }>(
          "http://localhost:3000/api/hourlyRateRoutes/getAllHourlyRates",
        );
        console.log(response.data);
        const ratesData = response.data.hourlyRates;
        setRates(ratesData);

        const totalRateCalculated = ratesData.reduce(
          (acc, curr) => acc + curr.rate,
          0,
        );
        const totalRealRateCalculated = ratesData.reduce(
          (acc, curr) => acc + curr.realrate,
          0,
        );
        const differenceCalculated =
          totalRateCalculated - totalRealRateCalculated;

        setTotalRate(totalRateCalculated);
        setTotalRealRate(totalRealRateCalculated);
        setDifference(differenceCalculated);
        console.log(
          totalRateCalculated,
          totalRealRateCalculated,
          differenceCalculated,
        );
      } catch (error) {
        console.error(error);
      }
    };

    getAllRates();
  }, []);

  const data = {
    labels: ["Total Rate", "Difference"],
    datasets: [
      {
        data: [totalRate, Math.abs(difference)], // Utilisation de Math.abs pour éviter les valeurs négatives
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-4 text-xl font-bold">Modification des taux horaires</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Années concernées*
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            placeholder="L1"
          />
        </div>
        <div className="flex items-center justify-between space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Ancien taux horaire*
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="11.2 €"
            />
          </div>
          <div className="flex items-center">
            <span className="mx-4 text-xl">→</span>
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Nouveau taux horaire*
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="12.15 €"
            />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Domaine
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Coût
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                %
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            <tr>
              <td className="whitespace-nowrap px-6 py-4">Taux horaires</td>
              <td className="whitespace-nowrap px-6 py-4">
                {totalRate.toLocaleString()}€
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {((totalRate / (totalRate + totalRealRate)) * 100).toFixed(1)}%
              </td>
            </tr>
            {rates.map((rate, index) => (
              <tr key={index}>
                <td className="whitespace-nowrap px-6 py-4">{`Domaine ${
                  index + 1
                }`}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  {rate.rate.toLocaleString()}€
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {((rate.rate / totalRate) * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 flex justify-end">
        <button className="rounded-md bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700">
          Valider le changement
        </button>
      </div>
      <div className="mt-8 flex justify-center">
        <div className="relative mx-auto h-64 w-64">
          <Doughnut data={data} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold">
              {((totalRate / (totalRate + Math.abs(difference))) * 100).toFixed(
                2,
              )}
              %
            </span>
            <span className="text-sm">{totalRate.toLocaleString()}€</span>
          </div>
        </div>
      </div>
    </div>

    // <div>
    //   <h1>Hourly Rates</h1>
    //   <ul>
    //     {rates.map((rate, index) => (
    //       <li key={index}>
    //         Rate: {rate.rate}€, Real Rate: {rate.realrate}€
    //       </li>
    //     ))}
    //   </ul>
    //   <div>Total Rate: {totalRate}€ </div>
    //   <div>Total Real Rate: {totalRealRate}€ </div>
    //   <div>
    //     Difference: {difference >= 0 ? difference : `(${difference})`}€{" "}
    //   </div>
    // </div>
  );
};

export default GetAllRateCalculeComponenent;