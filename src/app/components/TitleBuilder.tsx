import { type FC, useCallback, type ChangeEventHandler } from "react";
import { TitleField } from "./types";

type Props = {
  field: TitleField;
}

const TitleBuilder: FC<Props> = ({ field }) => {
  return (
    <div className="space-y-2 dark:bg-zinc-800/50 p-5 border-l-4 border-orange-400 bg-white shadow-md">
      <input
        placeholder="Form Title"
        value={field.title}
        className="text-4xl bg-transparent w-full"
         />
      <textarea
        value={field.description}
        className="text-xl bg-transparent placeholder:dark:text-zinc-400 dark:text-zinc-300  w-full resize-none"
        placeholder="Form Description"
        />
    </div>
  )
}

export default TitleBuilder;