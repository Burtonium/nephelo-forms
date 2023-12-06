'use client';
import { type FC } from "react";
import type { CompleteField } from "prisma/zod";
import useFieldEntry from "~/hooks/useFieldEntry";

type Props = {
  field: CompleteField;
}

const InputDisplay: FC<Props> = ({ field }) => {
  const entry = useFieldEntry(field.id);

  return (
    <div className="space-y-2 dark:bg-zinc-800/50 p-5 border-l-4 border-orange-400 bg-white shadow-md">
      <label className="text-lg" htmlFor={field.id}>
        {field.data.label}
      </label>
      <p className="dark:bg-zinc-900 bg-zinc-100 p-2">
        {entry?.value ? <>{entry.value}</> : <span className="text-red-500">No answer provided</span>}
      </p>
    </div>
  )
}

export default InputDisplay;