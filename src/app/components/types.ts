export enum FieldType {
  Title = 'Title',
  Label = 'Label',
  MultipleChoice = 'Multiple Choice',
  Question = 'Question',
  Number = 'Number'
}

export type TitleField = {
  type: FieldType.Title;
  title: string;
  description?: string;
}

export type LabelField = {
  type: FieldType.Label;
  label: string;
}

export type QuestionField = {
  type: FieldType.Question;
  label: string;
}

type Choice = {
  label: string;
}

export type MultipleChoiceField = {
  type: FieldType.MultipleChoice;
  label: string;
  choices: Choice[];
}

export type NumberField = {
  type: FieldType.Number;
  label: string;
  amount: number;
}

export type Field = TitleField | LabelField | QuestionField | MultipleChoiceField | NumberField & {
  id: string;
};

export type CustomForm = {
  titleField: TitleField;
  fields: Field[];
}
