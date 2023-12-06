import { type FC } from "react";
import type { CompleteField } from "prisma/zod";
import LabelDisplay from "src/app/forms/[id]/components/LabelEntryBuilder";
import TitleEntryBuilder from "src/app/forms/[id]/components//TitleEntryBuilder";
import InputDisplay from "./InputDisplay";
import MultipleChoiceDisplay from "./MultipleChoiceDisplay";
import NumberDisplay from "./NumberDisplay";

const FieldEntryDisplay: FC<{ field: CompleteField }> = ({ field }) => {
  switch (field.type) {
    case "TITLE":
    case "MAIN_TITLE":
      return <TitleEntryBuilder field={field} />
    case "LABEL":
      return <LabelDisplay field={field} />
    case "MULTIPLE_CHOICE":
      return <MultipleChoiceDisplay field={field} />
    case "QUESTION":
      return <InputDisplay field={field} />
    case "UNIT":
      return <NumberDisplay field={field} />
  }
}

export default FieldEntryDisplay;