import { type FC } from "react";
import useFieldBuilderInput from "~/hooks/useFieldBuilderInput";
import { FieldType, type Field } from "~/types";
import FieldControls from "./FieldControls";

type Props = {
  field: Field;
}

const TitleBuilder: FC<Props> = ({ field }) => {
  const onTitleChange = useFieldBuilderInput(field.id, 'title');
  const onDescChange = useFieldBuilderInput(field.id, 'description');

  return (
    <div className="space-y-2 dark:bg-zinc-800/50 p-5 border-l-4 border-orange-400 bg-white shadow-md">
      <div className="flex">
        <input
          onChange={onTitleChange}
          placeholder="Form Title"
          value={field.data.title}
          className="text-4xl bg-transparent w-full" />
        {field.type !== FieldType.MAIN_TITLE && (
          <FieldControls fieldId={field.id} />
        )}
      </div>
      <textarea
        onChange={onDescChange}
        value={field.data.description}
        className="text-xl bg-transparent placeholder:dark:text-zinc-400 dark:text-zinc-300  w-full resize-none"
        placeholder="Form Description"
        />
    </div>
  )
}

export default TitleBuilder;