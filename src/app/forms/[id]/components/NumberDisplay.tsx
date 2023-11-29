import { type FC } from "react";
import type { CompleteField } from "prisma/zod";

type Props = {
  field: CompleteField;
}

const NumberDisplay: FC<Props> = ({ field }) => {
  return (
    <div className="space-y-2 dark:bg-zinc-800/50 p-5 border-l-4 border-orange-400 bg-white shadow-md">
      <label htmlFor="number-input" className="block mb-2 text-lg">
        {field.data.label}
      </label>
      <input placeholder="Amount" type="number" id="number-input" aria-describedby="helper-text-explanation" required />
    </div>
  )
}

export default NumberDisplay;