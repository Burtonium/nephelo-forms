export enum FieldType {
  MAIN_TITLE = 'MAIN_TITLE',
  TITLE = 'TITLE',
  LABEL = 'LABEL',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  QUESTION = 'QUESTION',
  CHOICE = 'CHOICE',
  UNIT = 'UNIT'
}

export type Field = {
  type: FieldType,
  id: string;
  index: number;
  data: Record<string, string>;
  parentId?: string;
}

export type FieldOptions = Pick<Field, 'index'>;

export type CustomForm = {
  id: string;
  fields: Record<string, Field>;
}
