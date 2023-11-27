import { type FC } from "react";
import type { FieldInsert } from "prisma/zod";
import FieldControls from "./FieldControls";

type Props = {
  field: FieldInsert;
}

const QuestionBuilder: FC<Props> = ({ field }) => {
  return (
    <div className="space-y-2 dark:bg-zinc-800/50 p-5 border-l-4 border-orange-400 bg-white shadow-md">
      <div className="flex">
        <input
          placeholder="Form Title"
          value={field.data.label}
          className="text-xl bg-transparent w-full" />
        <FieldControls fieldId={field.id} />
      </div>
    </div>
  )
}

export default QuestionBuilder;