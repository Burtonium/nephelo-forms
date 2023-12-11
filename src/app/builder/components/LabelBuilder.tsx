import { type FC } from "react";
import FieldControls from "./FieldControls";
import useFieldBuilderInput from "~/hooks/useFieldBuilderInput";
import type { FieldInsert } from "prisma/zod";

type Props = {
  field: FieldInsert;
}

const LabelBuilder: FC<Props> = ({ field }) => {
  const onLabelChange = useFieldBuilderInput(field.id, 'label');
  return (
    <div className="space-y-2 dark:bg-zinc-800/50 p-5 border-l-4 border-orange-400 bg-white shadow-md flex">
      <input
        onChange={onLabelChange}
        placeholder="Form Title"
        value={field.data.label}
        className="text-xl bg-transparent w-full" />
      <FieldControls fieldId={field.id} />
    </div>
  )
}

export default LabelBuilder;