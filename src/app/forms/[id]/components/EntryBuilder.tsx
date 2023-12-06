import { type FC } from "react";
import type { CompleteField } from "prisma/zod";
import LabelEntryBuilder from "./LabelEntryBuilder";
import TitleEntryBuilder from "./TitleEntryBuilder";
import QuestionEntryBuilder from "./QuestionEntryBuilder";
import CheckboxEntryBuilder from "./CheckboxEntryBuilder";
import NumberEntryBuilder from "./NumberEntryBuilder";

const EntryBuilder: FC<{ field: CompleteField }> = ({ field }) => {
  switch (field.type) {
    case "TITLE":
    case "MAIN_TITLE":
      return <TitleEntryBuilder field={field} />
    case "LABEL":
      return <LabelEntryBuilder field={field} />
    case "MULTIPLE_CHOICE":
      return <CheckboxEntryBuilder field={field} />
    case "QUESTION":
      return <QuestionEntryBuilder field={field} />
    case "UNIT":
      return <NumberEntryBuilder field={field} />
  }
}

export default EntryBuilder;