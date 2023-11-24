import { FormBuilderContext } from "~/app/components/FormBuilderContext";
import { useContext, useMemo } from "react";
import { sortBy } from "lodash";

export const useFormBuilder = () => {
  const [ctx, dispatch] = useContext(FormBuilderContext);

  const fields = useMemo(
    () => {
      const values = Object.values(ctx.form.fields);
      return sortBy(values, (v) => v.index);
    },
    [ctx.form.fields]
  )
  return {
    formId: ctx.form.id,
    fields,
    dispatch,
  }
}

export { actions } from "~/state/reducers/formBuilder";

export default useFormBuilder;
