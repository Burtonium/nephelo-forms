import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type Award } from "@prisma/client";
import { type FC } from "react";

const Badge: FC<{ award: Award } > = ({ award }) => {
  switch (award) {
    case "FIRST_100_USER":
      return (
        <div className="w-32 text-center p-2 rounded-lg dark:bg-zinc-800 bg-zinc-100">
          <FontAwesomeIcon className="text-yellow-500 w-10 h-10" icon={faTrophy} />
          <h2 className="font-semibold">First 100 Users</h2>
        </div>
     );
    case "FIRST_1000_USER":
      return (
        <div className="w-32 text-center p-2 rounded-lg dark:bg-zinc-800 bg-zinc-100">
          <FontAwesomeIcon className="text-slate-200 w-10 h-10" icon={faTrophy} />
          <h2 className="font-semibold">First 1000 Users</h2>
        </div>
      );
  }
}

export default Badge;

