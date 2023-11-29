import { useState, type FC } from "react";
import useFieldBuilderInput from "~/hooks/useFieldBuilderInput";
import FieldControls from "./FieldControls";
import { type FieldInsert } from "prisma/zod";
import { FieldType } from "@prisma/client";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

type Props = {
  field: FieldInsert;
}

const TitleBuilder: FC<Props> = ({ field }) => {
  const onTitleChange = useFieldBuilderInput(field.id, 'title');
  const onDescChange = useFieldBuilderInput(field.id, 'description');
  const placeholder = field.type === FieldType.MAIN_TITLE ? 'Form Title' : 'Untitled Title';
  const descPlaceholder = field.type === FieldType.MAIN_TITLE ? 'Form Description' : 'Description...';
  const [showDesc, setShowDesc] = useState(false);

  return (
    <div className="space-y-3 dark:bg-zinc-800/50 p-5 border-l-4 border-orange-400 bg-white shadow-md">
      <div className="flex">
        <input
          onChange={onTitleChange}
          placeholder={placeholder}
          value={field.data.title}
          className={classNames(
            {
              "text-4xl": field.type === FieldType.MAIN_TITLE,
              "text-3xl": field.type === FieldType.TITLE
            },
            "bg-transparent w-full"
          )} />
        {field.type !== FieldType.MAIN_TITLE && (
          <FieldControls fieldId={field.id} />
        )}
      </div>
      {showDesc  ? (
        <textarea
          onChange={onDescChange}
          value={field.data.description}
          className="text-lg py-1  text-zinc-600  w-full resize-none"
          placeholder={descPlaceholder}
        />
      ) : (

        <button onClick={() => setShowDesc(true)} className="flex items-center space-x-2 text-orange-400">
          <FontAwesomeIcon className="w-4 h-4" icon={faPlus} />
          <span>Add description</span>
        </button>
      )}
      
    </div>
  )
}

export default TitleBuilder;