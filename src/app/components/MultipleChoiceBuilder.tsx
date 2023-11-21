import { type FC } from "react";
import type { MultipleChoiceField } from "./types";

type Props = {
  field: MultipleChoiceField;
}

const MultipleChoiceBuilder: FC<Props> = ({ field }) => {
  return (
    <div className="space-y-2 dark:bg-zinc-800/50 p-5 border-l-4 border-orange-400 bg-white shadow-md">
      <input
        placeholder="Form Title"
        value={field.label}
        className="text-xl bg-transparent w-full" />
    </div>
  )
}

export default MultipleChoiceBuilder;