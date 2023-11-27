import { useCallback, type ChangeEventHandler } from "react";
import useFormBuilder, { actions } from "./useFormBuilder";

const useFieldBuilderInput = (id: string, dataKey: string) => {
  const { dispatch } = useFormBuilder();

  const onChange = useCallback<ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>>((evt) => {
    dispatch(actions.updateField({
      id,
      data: {
        [dataKey]: evt.target.value
      }
    }));
  }, [dispatch, dataKey, id]);

  return onChange;
}

export default useFieldBuilderInput;
