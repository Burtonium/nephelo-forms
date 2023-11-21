import { type FC } from "react";
import { type Field, FieldType } from "./types";
import LabelBuilder from "./LabelBuilder";
import TitleBuilder from "./TitleBuilder";
import QuestionBuilder from "./QuestionBuilder";
import MultipleChoiceBuilder from "./MultipleChoiceBuilder";
import NumberBuilder from "./NumberBuilder";


const FieldBuilder: FC<{ field: Field }> = ({ field }) => {
  switch (field.type) {
    case FieldType.Title:
      return <TitleBuilder field={field} />
    case FieldType.Label:
      return <LabelBuilder field={field} />
    case FieldType.MultipleChoice:
      return <MultipleChoiceBuilder field={field} />
    case FieldType.Question:
      return <QuestionBuilder field={field} />
    case FieldType.Number:
      return <NumberBuilder field={field} />
  }
}

export default FieldBuilder;