import { type FC } from "react";
import { type Field, FieldType } from "../../types";
import LabelBuilder from "./LabelBuilder";
import TitleBuilder from "./TitleBuilder";
import QuestionBuilder from "./QuestionBuilder";
import MultipleChoiceBuilder from "./MultipleChoiceBuilder";
import UnitBuilder from "./UnitBuilder";

const FieldBuilder: FC<{ field: Field }> = ({ field }) => {
  switch (field.type) {
    case FieldType.TITLE:
    case FieldType.MAIN_TITLE:
      return <TitleBuilder field={field} />
    case FieldType.LABEL:
      return <LabelBuilder field={field} />
    case FieldType.MULTIPLE_CHOICE:
      return <MultipleChoiceBuilder field={field} />
    case FieldType.QUESTION:
      return <QuestionBuilder field={field} />
    case FieldType.UNIT:
      return <UnitBuilder field={field} />
  }
}

export default FieldBuilder;