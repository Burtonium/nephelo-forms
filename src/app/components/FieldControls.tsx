import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type FC, useCallback } from "react";
import useFormBuilder, { actions } from "~/hooks/useDataBuilder";

const FieldControls: FC<{ fieldId: string }> = ({ fieldId: id }) => {
  const { dispatch } = useFormBuilder();
  const deleteField = useCallback(() => {
    dispatch(actions.deleteField(id));
  }, [dispatch, id]);

  return (
    <>
      
      <button className="mt-0 h-8 w-8 dark:hover:bg-zinc-700/50 hover:bg-zinc-100/50 rounded" onClick={deleteField}>
        <FontAwesomeIcon className="text-orange-400 " icon={faTrash} />
      </button>
    </>
  );
}

export default FieldControls;
