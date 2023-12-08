import { type FC } from "react";
import useFieldBuilderInput from "~/hooks/useFieldBuilderInput";
import FieldControls from "./FieldControls";
import { type FieldInsert } from "prisma/zod";

type Props = {
  field: FieldInsert;
}

const units: Record<string, string[]> = {
  weight: ['kg', 'g', 'mg'],
  currency: ['CAD', 'USD', 'THB'],
  metric: ['m', 'km', 'mm', 'cm']
}

const UnitBuilder: FC<Props> = ({ field }) => {
  const onLabelChange = useFieldBuilderInput(field.id, 'label');
  const onUnitChange = useFieldBuilderInput(field.id, 'unit');
  const onDenomChange = useFieldBuilderInput(field.id, 'denomination');

  return (
    <div className="space-y-2 dark:bg-zinc-800/50 p-5 border-l-4 border-orange-400 bg-white shadow-md">
      <div className="flex">
        <input
          onChange={onLabelChange}
          placeholder="Unit Title"
          value={field.data.label}
          className="text-xl bg-transparent w-full" />
        <FieldControls fieldId={field.id} />
      </div>
      <div>
        <label htmlFor={`${field.id}-unit`} className="sr-only">Unit select</label>
        <select
          id={`${field.id}-unit`}
          onChange={onUnitChange}
          value={field.data.unit}
          className="block py-2.5 px-0 w-full text-sm text-zinc-600 bg-transparent border-0 border-b-2 border-zinc-200 appearance-none dark:text-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-0 focus:border-zinc-200 peer">
          {Object.keys(units).map((unit) => (
            <option className="capitalize" key={unit} value={unit}>{unit}</option>
          ))}
        </select>
      </div>
      {field.data.unit && (
        <div>
          <label htmlFor={`${field.id}-denomination`} className="sr-only">Denomination</label>
          <select
            id={`${field.id}-denomination`}
            onChange={onDenomChange}
            value={field.data.denomination}
            className="block py-2.5 px-0 w-full text-sm text-zinc-600 bg-transparent border-0 border-b-2 border-zinc-200 appearance-none dark:text-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-0 focus:border-zinc-200 peer">
            {units[field.data.unit]?.map((unit) => (
              <option className="capitalize" key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}

export default UnitBuilder;