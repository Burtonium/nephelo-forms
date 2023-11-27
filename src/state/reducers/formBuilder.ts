import { FieldType } from '@prisma/client';
import { type PayloadAction, createSlice, type Reducer } from '@reduxjs/toolkit';
import { sortBy } from 'lodash';
import { type FormInsert, type FieldInsert } from 'prisma/zod';
import { v4 as uuid } from 'uuid';


export type BuilderState = {
  form: FormInsert,
  fields: FieldInsert[];
};

const makeDefaultField = (formId: string, type: FieldType, options?: { index: number }): FieldInsert[] => {
  const id = uuid();

  const defaultShared = {
    id,
    index: options?.index ?? 0,
    parentId: null
  }

  switch (type) {
    case FieldType.MAIN_TITLE:
      return [{
        ...defaultShared,
        type,
        data: { title: 'Untitled Form' }
      }]
    case FieldType.TITLE:
      return [{
        ...defaultShared,
        type,
        data: { title: 'Untitled Title' }
      }]
    case FieldType.QUESTION:
    case FieldType.LABEL:
    case FieldType.CHOICE:
      return [{
        ...defaultShared,
        type,
        data: { label: `Untitled ${type.toLocaleLowerCase()}` }
      }]
    case FieldType.MULTIPLE_CHOICE:
      return [{
        ...defaultShared,
        type,
        data: { label: 'Untitled Multiple Choice' },
      }, {
        id: uuid(),
        type: FieldType.CHOICE,
        parentId: id,
        data: { label: 'Choice A' },
        index: 0,
      }, {
        id: uuid(),
        type: FieldType.CHOICE,
        parentId: id,
        data: { label: 'Choice B' },
        index: 1,
      }, {
        id: uuid(),
        type: FieldType.CHOICE,
        parentId: id,
        data: { label: 'Choice C' },
        index: 2,
      }]
    case FieldType.UNIT:
      return [{
        ...defaultShared,
        type,
        data: {
          label: 'Untitled Unit',
          unit: 'currency',
          denomination: 'USD'
        }
      }]
  }
}


const makeDefaultState = () => {
  const formId = uuid();
  const [titleField] = makeDefaultField(formId, FieldType.MAIN_TITLE) as [FieldInsert];

  return {
    form: {
      id: uuid(),
    },
    fields: [titleField],
  }
}

const initialState: BuilderState = makeDefaultState();

const formStateSlice = createSlice({
  name: 'formBuilder',
  initialState,
  reducers: {
    createDefaultField: (state, { payload: type }: PayloadAction<FieldType>) => {
      const index = Math.max(...state.fields.map((f) => f.index)) + 1;
      const fields = makeDefaultField(state.form.id, type, { index });

      return {
        ...state,
        fields: fields.concat(state.fields),
      };
    },
    createField: (state, { payload: field }: PayloadAction<Omit<FieldInsert, 'id'>>) => {
      const constructed = {
        ...field,
        id: uuid()
      }

      return {
        ...state,
        fields: [constructed].concat(...state.fields)
      };
    },
    updateField: (state, { payload: field }: PayloadAction<Partial<FieldInsert>>) => {
      const found = state.fields.find((f) => f.id === field.id);

      if (!found) return state;
      
      const updated = {
        ...found,
        ...field,
        data: {
          ...found.data,
          ...field.data
        }
      }
      
      return {
        ...state,
        fields: state.fields
          .filter((f) => f.id !== updated.id)
          .concat(updated)
      }
    },
    deleteField: (state, { payload: id }: PayloadAction<string>) => {
      return {
        ...state,
        fields: sortBy(state.fields.filter((f) => f.id !== id), ['index'])
          .map((f, i) => ({ ...f, index: i }))
      }
    },
    reorder: (state, { payload: { id, index } }: PayloadAction<{ id: string, index: number }>) => {
      const found = state.fields.find((f) => f.id === id);

      if (!found) return state;
      
      const updated = {
        ...found,
        index: index + 0.5
      }

      return {
        ...state,
        fields: sortBy(state.fields.filter((f) => f.id !== id).concat(updated), ['index']).map((f, i) => ({ ...f, index: i }))
      };
    },
    reset: () => makeDefaultState(),
  }
});

export const { getInitialState, actions } = formStateSlice;

export type BuilderActions = ReturnType<typeof actions[keyof typeof actions]>;
export const reducer = formStateSlice.reducer as Reducer<BuilderState, BuilderActions>;