import { type PayloadAction, createSlice, type Reducer } from '@reduxjs/toolkit';
import { type FieldEntry } from 'prisma/zod/fieldEntry';
import { type FormEntryInsert } from 'prisma/zod/formEntry';

export type EntryBuilderState = {
  entry?: FormEntryInsert,
  entries: FieldEntry[];
};

const initialState: EntryBuilderState = {
  entries: []
};

const entryStateSlice = createSlice({
  name: 'entryBuilder',
  initialState,
  reducers: {
    intialize: (_, { payload: { formId, userId } }: PayloadAction<{ formId: string, userId?: string }>) => {
      return {
        entry: {
          formId,
          userId
        },
        entries: []
      }
    },
    upsertEntry: (state, { payload: entry }: PayloadAction<FieldEntry> ) => {
      const entryIndex = state.entries.findIndex((e) => e.fieldId === entry.fieldId);

      return {
        ...state,
        entries: [
          ...state.entries.slice(0, entryIndex),
          ...state.entries.slice(entryIndex + 1),
          ...[entry]
        ]
      }
    },
    deleteEntry: (state, { payload: fieldId }: PayloadAction<string> ) => {
      return {
        ...state,
        entries: state.entries.filter((e) => e.fieldId !== fieldId)
      }
    },
  }
});

export const { getInitialState, actions } = entryStateSlice;

export type EntryBuilderActions = ReturnType<typeof actions[keyof typeof actions]>;
export const reducer = entryStateSlice.reducer as Reducer<EntryBuilderState, EntryBuilderActions>;