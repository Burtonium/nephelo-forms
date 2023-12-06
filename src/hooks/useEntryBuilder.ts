import { EntryBuilderContext } from "~/contexts/EntryBuilderContext";
import { useContext } from "react";

export const useEntryBuilder = () => {
  const [ctx, dispatch] = useContext(EntryBuilderContext);

  return {
    ...ctx,
    dispatch,
  }
}

export { actions } from "~/state/reducers/entryBuilder";

export default useEntryBuilder;
