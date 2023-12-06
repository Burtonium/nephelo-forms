'use client';
import { type FC, type PropsWithChildren, createContext, type Dispatch } from "react";
import { useReducer } from "react";
import { type EntryBuilderActions, type EntryBuilderState, reducer } from "~/state/reducers/entryBuilder";

type ContextType = [EntryBuilderState, Dispatch<EntryBuilderActions>];

export const EntryBuilderContext = createContext<ContextType>([] as unknown as ContextType);

export const EntryBuilderContextProvider: FC<PropsWithChildren<{ formId: string, userId?: string } >> = ({ children, ...entryState }) => {
  const ctx = useReducer(reducer, { entry: entryState, entries: [] });

  return (
    <EntryBuilderContext.Provider value={ctx}>
      {children}
    </EntryBuilderContext.Provider>
  )
}