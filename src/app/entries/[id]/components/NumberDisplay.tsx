'use client';
import { type FC } from "react";
import type { CompleteField } from "prisma/zod";
import useFieldEntry from "~/hooks/useFieldEntry";

type Props = {
  field: CompleteField;
}

const NumberDisplay: FC<Props> = ({ field }) => {
  const entry = useFieldEntry(field.id);
  const value = entry?.decimal;

  return (
    <div className="space-y-2 dark:bg-zinc-800/50 p-5 border-l-4 border-orange-400 bg-white shadow-md">
      <label htmlFor="number-input" className="block mb-2 text-lg">
        {field.data.label}
      </label>
        <p className="dark:bg-zinc-900 bg-zinc-100 p-2">
          {entry?.value !== undefined ? (
            <span>{value?.toString()} {field.data.denomination ?? ''}</span>
          ) : (
            <span className="text-red-500">No answer provided</span>
          )}
        </p>
      </div>
  )
}

export default NumberDisplay;