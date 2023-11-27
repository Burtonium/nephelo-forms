import { type FC } from "react";
import type { CompleteField } from "prisma/zod";
import classNames from "classnames";
import { FieldType } from "@prisma/client";

type Props = {
  field: CompleteField;
}

const TitleDisplay: FC<Props> = ({ field }) => {
  return (
    <div className="space-y-2 dark:bg-zinc-800/50 p-5 border-l-4 border-orange-400 bg-white shadow-md">
      <h1 className={classNames(
        {
          "text-4xl": field.type === FieldType.MAIN_TITLE,
          "text-3xl": field.type === FieldType.TITLE
        },
        "font-sans"
      )}>
        {field.data.title}
      </h1>
      <p>
        {field.data.description}
      </p>
    </div>
  )
}

export default TitleDisplay;