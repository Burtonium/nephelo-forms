'use client';
import { useMemo, type FC } from "react";
import { type CompleteField } from "prisma/zod";
import { useMultipleChoice } from "~/hooks/useEntryBuilderInputs";

type Props = {
  field: CompleteField;
}

const CheckboxEntryBuilder: FC<Props> = ({ field }) => {
  const childrenIds = useMemo(() => field.children.map((c) => c.id), [field.children]);
  const [selected, makeOnChange] = useMultipleChoice(childrenIds);

  return (
    <div data-field-id={field.id} className=" dark:bg-zinc-800/50 space-y-5 p-5 border-l-4 border-orange-400 bg-white shadow-md">
      <div className="text-lg">
        {field.data.label}
      </div>
      {field.children.map((choice) => (
        <div key={choice.id} className="flex items-center">
          <input
            className="w-4 h-4 text-orange-400 bg-zinc-100 border-zinc-300 dark:bg-zinc-800 rounded focus:ring-orange-400 dark:focus:ring-orange-400 dark:border-zinc-500"
            onChange={makeOnChange(choice.id)}
            checked={selected.includes(choice.id)}
            id={choice.id}
            type="checkbox"  />
          <label htmlFor={choice.id} className="ms-2 text-md">
            {choice.data.label}
          </label>
        </div>
      ))}
    </div>
  )
}

export default CheckboxEntryBuilder;