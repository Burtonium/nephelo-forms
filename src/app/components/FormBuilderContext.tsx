import { type FC, type PropsWithChildren, createContext, type Dispatch, useEffect } from "react";
import { useReducer } from "react";
import { type BuilderState, type BuilderActions, getInitialState, reducer, actions } from "~/state/reducers/formBuilder";

type ContextType = [BuilderState, Dispatch<BuilderActions>];

export const FormBuilderContext = createContext<ContextType>([] as unknown as ContextType);

export const FormBuilderContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const ctx = useReducer(reducer, getInitialState());
  const [, dispatch] = ctx;

  useEffect(() => {
    // Reset on mount to remove cached values
    dispatch(actions.reset());
  }, [dispatch])

  return (
    <FormBuilderContext.Provider value={ctx}>
      {children}
    </FormBuilderContext.Provider>
  )
}