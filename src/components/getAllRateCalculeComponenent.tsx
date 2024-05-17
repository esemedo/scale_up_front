'use client'

import axios from 'axios';
import { useEffect, useState } from 'react';

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
        const response = await axios.get<{ hourlyRates: HourlyRate[] }>('http://localhost:3000/hourlyRateRoutes/getAllHourlyRates');
        console.log(response.data);
        const ratesData = response.data.hourlyRates;
        setRates(ratesData);

        const totalRateCalculated = ratesData.reduce((acc, curr) => acc + curr.rate, 0);
        const totalRealRateCalculated = ratesData.reduce((acc, curr) => acc + curr.realrate, 0);
        const differenceCalculated = totalRateCalculated - totalRealRateCalculated;

        setTotalRate(totalRateCalculated);
        setTotalRealRate(totalRealRateCalculated);
        setDifference(differenceCalculated);
        console.log(totalRateCalculated, totalRealRateCalculated, differenceCalculated);

      } catch (error) {
        console.error(error);
        
      }
      
    };

    getAllRates();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Hourly Rates</h1>
      <ul className="mb-4">
        {rates.map((rate, index) => (
          <li key={index} className="mb-2">
            <span className="font-semibold">Rate:</span> {rate.rate}€,
            <span className="font-semibold"> Real Rate:</span> {rate.realrate}€
          </li>
        ))}
      </ul>
      <div className="mb-2">
        <span className="font-semibold">Total Rate:</span> {totalRate}€
      </div>
      <div className="mb-2">
        <span className="font-semibold">Total Real Rate:</span> {totalRealRate}€
      </div>
      <div>
        <span className="font-semibold">Difference:</span> {difference >= 0 ? difference : `(${difference})`}€
      </div>
    </div>
  );
};

export default GetAllRateCalculeComponenent;
