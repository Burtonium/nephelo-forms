import { type FC } from "react";
import { type CompleteField } from "prisma/zod";

type Props = {
  field: CompleteField;
}

const CheckboxDisplay: FC<Props> = ({ field }) => {
  return (
    <div className=" dark:bg-zinc-800/50 space-y-5 p-5 border-l-4 border-orange-400 bg-white shadow-md">
      <div>
        {field.data.label}
      </div>
      {field.children.map((choice) => (
        <div key={choice.id} className="flex items-center">
          <input id={choice.id} type="checkbox" className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-500" />
          <label htmlFor={choice.id} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            {choice.data.label}
          </label>
        </div>
      ))}
    </div>
  )
}

export default CheckboxDisplay;