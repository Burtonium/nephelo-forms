import { useContext, useMemo } from "react";
import { EntryDisplayContext } from "~/contexts/EntryDisplayContext";

const useFieldEntry = (fieldId: string) => {
  const ctx = useContext(EntryDisplayContext);

  const entry = useMemo(
    () => ctx.fieldEntries.find((e) => e.fieldId === fieldId),
    [ctx.fieldEntries, fieldId]
  );

  return entry;
}

export default useFieldEntry;
