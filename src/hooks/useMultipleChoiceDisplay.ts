import { type CompleteField } from "prisma/zod";
import { useContext, useMemo } from "react";
import { EntryDisplayContext } from "~/contexts/EntryDisplayContext";

type Choice = {
  field: CompleteField;
  selected: boolean;
}

const useMultipleChoiceDisplay = (fieldId: string) => {
  const ctx = useContext(EntryDisplayContext);

  const childrenFields = useMemo(
    () => ctx.form.fields
      .filter((f) => f.parentId === fieldId),
    [ctx.form.fields, fieldId]
  );

  const choices = useMemo(() => childrenFields.reduce((acc, field) => {
    const entry = ctx.fieldEntries.find((e) => e.fieldId === field.id);

    return acc.concat({ field, selected: !!entry });
  }, [] as Choice[]), [childrenFields, ctx.fieldEntries])

  return choices;
}

export default useMultipleChoiceDisplay;