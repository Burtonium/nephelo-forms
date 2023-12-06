import { useCallback, type ChangeEventHandler, useMemo } from "react";
import useEntryBuilder, { actions } from "./useEntryBuilder";

export const useStringInput = (fieldId: string) => {
  const { dispatch, entries } = useEntryBuilder();

  const onChange = useCallback<ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>>((evt) => {
    dispatch(actions.upsertEntry({
      type: 'STRING',
      fieldId,
      value: evt.target.value
    }));
  }, [dispatch, fieldId]);

  const entry = useMemo(
    () => entries.find((e) => e.fieldId === fieldId && e.type === 'STRING'),
    [entries, fieldId]
  );

  return [entry?.value ?? '', onChange] as [string, typeof onChange];
}

export const useMultipleChoice = (fieldIds: string[]) => {
  const { dispatch, entries } = useEntryBuilder();

  const makeOnChange = useCallback((fieldId: string): ChangeEventHandler<HTMLInputElement> => (evt) => {
    if (evt.target.checked) {
      dispatch(actions.upsertEntry({
        type: 'BOOLEAN',
        fieldId,
      }));
    } else {
      dispatch(actions.deleteEntry(fieldId))
    }
  }, [dispatch]);

  const selected = useMemo(
    () => fieldIds.filter((id) => !!entries.find((e) => e.fieldId === id)),
    [entries, fieldIds]
  );

  return [selected, makeOnChange] as [string[], typeof makeOnChange]
}

export const useNumericInput = (fieldId: string) => {
  const { dispatch, entries } = useEntryBuilder();

  const onChange = useCallback<ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>>((evt) => {
    dispatch(actions.upsertEntry({
      type: 'NUMERIC',
      fieldId,
      decimal: parseFloat(evt.target.value),
    }));
  }, [dispatch, fieldId]);

  const entry = useMemo(
    () => entries.find((e) => e.fieldId === fieldId && e.type === 'NUMERIC'),
    [entries, fieldId]
  );

  const value = entry?.decimal ?? '';

  return [value, onChange] as [number | string, typeof onChange];
}
