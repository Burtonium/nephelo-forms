import { type FC } from "react";
import type { CompleteField } from "prisma/zod";
import LabelDisplay from "./LabelDisplay";
import TitleDisplay from "./TitleDisplay";
import QuestionDisplay from "./QuestionDisplay";
import CheckboxDisplay from "./CheckboxDisplay";
import NumberDisplay from "./NumberDisplay";

const FieldDisplay: FC<{ field: CompleteField }> = ({ field }) => {
  switch (field.type) {
    case "TITLE":
    case "MAIN_TITLE":
      return <TitleDisplay field={field} />
    case "LABEL":
      return <LabelDisplay field={field} />
    case "MULTIPLE_CHOICE":
      return <CheckboxDisplay field={field} />
    case "QUESTION":
      return <QuestionDisplay field={field} />
    case "UNIT":
      return <NumberDisplay field={field} />
  }
}

export default FieldDisplay;