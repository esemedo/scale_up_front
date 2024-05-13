import Image from "next/image"; 
import NavigationButtons from "../../components/allbutton";

export default function Home() {
  return (
    <div>
      <h1>Hourly Rates</h1>
      <NavigationButtons/>
      <Image
        src="/vercel.svg"
        alt="Vercel Logo"
        width={72}
        height={16}
      />
    </div>
  );
}