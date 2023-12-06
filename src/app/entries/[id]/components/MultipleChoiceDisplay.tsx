'use client';
import { useMemo, type FC } from "react";
import { type CompleteField } from "prisma/zod";
import useMultipleChoiceDisplay from "~/hooks/useMultipleChoiceDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

type Props = {
  field: CompleteField;
}

const MultipleChoiceDisplay: FC<Props> = ({ field }) => {
  const choices = useMultipleChoiceDisplay(field.id);
  const selected = useMemo(() => choices.filter((c) => c.selected), []);

  return (
    <div className=" dark:bg-zinc-800/50 space-y-2 p-5 border-l-4 border-orange-400 bg-white shadow-md">
      <div className="text-lg">
        {field.data.label}
      </div>

        <div className="dark:bg-zinc-900 bg-zinc-100 p-2">
          {selected.length === 0 ? (
            <p className="text-red-500">No options selected</p>
          ) : (
            <>
            {selected.map((choice) => (
              <p key={choice.field.id}>{choice.field.data.label} {choice.selected && (<FontAwesomeIcon className="text-green-500 w-4" icon={faCheck} /> )}</p>
            ))}
            </>
          )}
        </div>
    </div>
  )
}

export default MultipleChoiceDisplay;