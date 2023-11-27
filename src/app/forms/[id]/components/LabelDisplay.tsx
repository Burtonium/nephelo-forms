import type { CompleteField } from "prisma/zod";
import { type FC } from "react";

type Props = {
  field: CompleteField;
}

const LabelDisplay: FC<Props> = ({ field }) => {
  return (
    <div className="space-y-2 dark:bg-zinc-800/50 p-5 border-l-4 border-orange-400 bg-white shadow-md flex">
      <div>
        {field.data.label}
      </div>
    </div>
  )
}

export default LabelDisplay;