import { FormBuilderContext } from "~/contexts/FormBuilderContext";
import { useContext, useMemo } from "react";
import { sortBy } from "lodash";

export const useFormBuilder = () => {
  const [ctx, dispatch] = useContext(FormBuilderContext);

  const fields = useMemo(
    () => sortBy(ctx.fields, (v) => v.index),
    [ctx.fields]
  )

  return {
    form: ctx.form,
    fields,
    dispatch,
  }
}

export { actions } from "~/state/reducers/formBuilder";

export default useFormBuilder;
