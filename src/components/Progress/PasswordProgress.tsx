import React from "react";
import { Progress } from "@/components/ui/progress";

type PasswordProgressProps = {
  password: string;
};
export const PasswordProgress = ({ password }: PasswordProgressProps) => {
  const [score, setScore] = React.useState(0);
  React.useEffect(() => {
    const checkPassword = () => {
      let tempScore = 0;
      if (password.match(/[a-z]+/)) {
        tempScore += 1;
      }
      if (password.match(/[A-Z]+/)) {
        tempScore += 1;
      }
      if (password.match(/[0-9]+/)) {
        tempScore += 1;
      }
      if (password.match(/[$@#&!]+/)) {
        tempScore += 1;
      }
      if (password.length > 8) {
        tempScore += 1;
      }
      setScore(tempScore);
    };
    checkPassword();
  }, [password]);
  return (
    <div className={"flex flex-col"}>
      <Progress value={score * 25} />
      <span className={"ml-2 text-xs font-light text-gray-500"}>
        Force :{" "}
        <b className={"font-normal text-black"}>
          {score < 2
            ? "faible"
            : score < 3
              ? "moyen"
              : score < 4
                ? "fort"
                : "très fort"}
        </b>
      </span>
    </div>
  );
};
