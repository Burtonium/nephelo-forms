import { useEffect, type FC } from "react";
import type { Field } from "../../types";
import useFieldBuilderInput from "~/hooks/useFieldBuilderInput";
import useFormBuilder, { actions } from "~/hooks/useDataBuilder";
import FieldControls from "./FieldControls";

type Props = {
  field: Field;
}

const units: Record<string, string[]> = {
  weight: ['kg', 'mg'],
  currency: ['CAD', 'USD', 'THB'],
  metric: ['mm', 'cm', 'm', 'km']
}

const NumberBuilder: FC<Props> = ({ field }) => {
  const { dispatch } = useFormBuilder();
  const onLabelChange = useFieldBuilderInput(field.id, 'label');

  const onUnitChange = useFieldBuilderInput(field.id, 'unit');
  const onDenomChange = useFieldBuilderInput(field.id, 'denomination');

  useEffect(() => {
    const { unit, denomination } = field.data;
    if (unit && denomination) {
      if (!units[unit]?.includes(denomination)) {
        const defaultDenom = units[unit]?.[0];
        if (defaultDenom) {
          dispatch(actions.updateFieldData({
            id: field.id,
            data: {
              ...field.data,
              denomination: defaultDenom
            }
          }))
        }
      }
    }
  }, [dispatch, field.data, field.id]);

  return (
    <div className="space-y-2 dark:bg-zinc-800/50 p-5 border-l-4 border-orange-400 bg-white shadow-md">
      <div className="flex">
        <input
          onChange={onLabelChange}
          placeholder="Form Title"
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
          className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
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
            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
            {units[field.data.unit]?.map((unit) => (
              <option className="capitalize" key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}

export default NumberBuilder;