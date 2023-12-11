'use client';
import { type FC, type PropsWithChildren, createContext, type Dispatch } from "react";
import { useReducer } from "react";
import { type BuilderState, type BuilderActions, reducer } from "~/state/reducers/formBuilder";

type ContextType = [BuilderState, Dispatch<BuilderActions>];

export const FormBuilderContext = createContext<ContextType>([] as unknown as ContextType);

export const FormBuilderContextProvider: FC<PropsWithChildren<{ state: BuilderState }>> = ({ children, state }) => {
  const ctx = useReducer(reducer, state);

  return (
    <FormBuilderContext.Provider value={ctx}>
      {children}
    </FormBuilderContext.Provider>
  )
}