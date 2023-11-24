import { type FC } from "react";
import type { FieldInsert } from "prisma/zod";
import LabelBuilder from "./LabelBuilder";
import TitleBuilder from "./TitleBuilder";
import QuestionBuilder from "./QuestionBuilder";
import MultipleChoiceBuilder from "./MultipleChoiceBuilder";
import UnitBuilder from "./UnitBuilder";

const FieldBuilder: FC<{ field: FieldInsert }> = ({ field }) => {
  switch (field.type) {
    case "TITLE":
    case "MAIN_TITLE":
      return <TitleBuilder field={field} />
    case "LABEL":
      return <LabelBuilder field={field} />
    case "MULTIPLE_CHOICE":
      return <MultipleChoiceBuilder field={field} />
    case "QUESTION":
      return <QuestionBuilder field={field} />
    case "UNIT":
      return <UnitBuilder field={field} />
  }
}

export default FieldBuilder;