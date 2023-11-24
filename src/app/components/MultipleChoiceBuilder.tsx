import { useMemo, type FC, useCallback } from "react";
import FieldControls from "./FieldControls";
import useFieldBuilderInput from "~/hooks/useFieldBuilderInput";
import useFormBuilder, { actions } from "~/hooks/useDataBuilder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { type FieldInsert } from "prisma/zod";

type Props = {
  field: FieldInsert;
}

const ChoiceBuilder: FC<Props> = ({ field }) => {
  const onChange = useFieldBuilderInput(field.id, 'label');
  return (
    <div className="flex items-center">
      <input
        onChange={onChange}
        placeholder="Multiple Choice Label"
        value={field.data.label}
        className="text-xl bg-transparent w-full" />
      <FieldControls fieldId={field.id} />
    </div>
  )
}

const MultipleChoiceBuilder: FC<Props> = ({ field }) => {
  const onChange = useFieldBuilderInput(field.id, 'label');
  const { fields, dispatch } = useFormBuilder();
  const choices = useMemo(() => fields.filter((f) => f.parentId === field.id), [fields, field.id])
  
  const addChoice = useCallback(() => {
    const index = Math.max(...choices.map((c) => c.index)) + 1;
    dispatch(actions.createField({
      formId: field.formId,
      type: "CHOICE",
      parentId: field.id,
      index,
      data: { label: `Choice ${String.fromCharCode(97 + index).toLocaleUpperCase()}` }
    }))
  }, [choices, dispatch, field.formId, field.id])

  return (
    <div className=" dark:bg-zinc-800/50 space-y-5 p-5 border-l-4 border-orange-400 bg-white shadow-md">
      <div className="flex items-center">
        <input
          onChange={onChange}
          placeholder="Multiple Choice Label"
          value={field.data.label}
          className="text-xl bg-transparent w-full" />
        <FieldControls fieldId={field.id} />
      </div>
      <div className="pl-5 space-y-2">
        {choices.map((c) => (
          <ChoiceBuilder key={c.id} field={c} />
        ))}
        <button onClick={addChoice} className="space-x-2 text-orange-400">
          <FontAwesomeIcon icon={faPlus} />
          <span>Add choice</span>
        </button>
      </div>
    </div>
  )
}

export default MultipleChoiceBuilder;