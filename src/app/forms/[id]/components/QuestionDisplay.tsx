import { type FC } from "react";
import type { CompleteField } from "prisma/zod";

type Props = {
  field: CompleteField;
}

const QuestionBuilder: FC<Props> = ({ field }) => {
  return (
    <div className="space-y-2 dark:bg-zinc-800/50 p-5 border-l-4 border-orange-400 bg-white shadow-md">
      <label className="text-lg" htmlFor={field.id}>
        {field.data.label}
      </label>
      <input
        placeholder="Answer"
        className="w-full" />
    </div>
  )
}

export default QuestionBuilder;