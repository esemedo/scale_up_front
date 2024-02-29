import Image from "next/image";
import HourlyRate from "../components/getAllRate";
import AddHourlyRateForm from "../components/addHourlyRate";

export default function Home() {
  return (
    <div>
      <h1>Hourly Rates</h1>
      <AddHourlyRateForm />
      <Image
        src="/vercel.svg"
        alt="Vercel Logo"
        width={72}
        height={16}
      />
    </div>
  );
}
