import { type FC } from "react";
import type { CompleteField } from "prisma/zod";

type Props = {
  field: CompleteField;
}

const NumberDisplay: FC<Props> = ({ field }) => {
  return (
    <div className="space-y-2 dark:bg-zinc-800/50 p-5 border-l-4 border-orange-400 bg-white shadow-md">
      <label htmlFor="number-input" className="block mb-2">
        {field.data.label}
      </label>
      <input type="number" id="number-input" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-300 focus:border-orange-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-300 dark:focus:border-orange-300" required />
    </div>
  )
}

export default NumberDisplay;