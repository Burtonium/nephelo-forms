import { type PayloadAction, createSlice, type Reducer } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

import { type CustomForm, FieldType, type Field } from '~/types';

export type BuilderState = {
  form: CustomForm,
};

const makeDefaultField = (type: FieldType, options?: { index: number }): Field[] => {
  const id = uuid();

  const defaultShared = {
    id,
    index: options?.index ?? 0
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
        data: { label: `Untitled ${type}` }
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
        }
      }]
  }
}

const [titleField] = makeDefaultField(FieldType.MAIN_TITLE) as [Field];

const initialState: BuilderState = {
  form: {
    id: uuid(),
    fields: {
      [titleField.id]: titleField,
    },
  },
}


const formStateSlice = createSlice({
  name: 'formBuilder',
  initialState,
  reducers: {
    createDefaultField: (state, { payload: type }: PayloadAction<FieldType>) => {
      const index = Math.max(...Object.values(state.form.fields).map((f) => f.index)) + 1;
      const fields = makeDefaultField(type, { index })
        .reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {} as typeof state.form.fields);


      return {
        ...state,
        form: {
          ...state.form,
          fields: {
            ...state.form.fields,
            ...fields
          }
        }
      };
    },
    createField: (state, { payload: field }: PayloadAction<Omit<Field, 'id'>>) => {
      const id = uuid();

      return {
        ...state,
        form: {
          ...state.form,
          fields: {
            ...state.form.fields,
            [id]: {
              id,
              ...field
            }
          }
        }
      };
    },
    updateFieldData: (state, { payload: field }: PayloadAction<Pick<Field, 'id' | 'data'>>) => {
      const existing = state.form.fields[field.id];
      if (!existing) return state;
      
      return {
        ...state,
        form: {
          ...state.form,
          fields: {
            ...state.form.fields,
            [existing.id]: {
              ...existing,
              data: {
                ...existing.data,
                ...field.data
              }
            }
          }
        }
      };
    },
    deleteField: (state, { payload: id }: PayloadAction<string>) => {
      delete state.form.fields[id];
    }
  }
});

export const { getInitialState, actions } = formStateSlice;

export type BuilderActions = ReturnType<typeof actions[keyof typeof actions]>;
export const reducer = formStateSlice.reducer as Reducer<BuilderState, BuilderActions>;