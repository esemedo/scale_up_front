import { HandCoins, Hotel, UsersRound } from "lucide-react";
import Link from "next/link";

export default function Nav() {
  return (
    <div className="grid-col-1 fixed left-2 top-1/2 grid -translate-y-1/2 transform gap-6 rounded-full bg-white px-4 py-6">
      <Link href="/">
        <Hotel className="text-blue-500" />
      </Link>
      <Link href="/">
        <UsersRound />
      </Link>
      <Link href="/">
        <HandCoins />
      </Link>
    </div>
  );
}
