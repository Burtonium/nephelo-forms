'use client';
import { type CompleteFormEntry } from "prisma/zod/formEntry";
import { type FC, type PropsWithChildren, createContext } from "react";

type ContextType = CompleteFormEntry;

export const EntryDisplayContext = createContext<ContextType>({} as unknown as ContextType);

export const EntryDisplayContextProvider: FC<PropsWithChildren<{ entry: CompleteFormEntry }>> = ({ children, entry }) => {
  return (
    <EntryDisplayContext.Provider value={entry}>
      {children}
    </EntryDisplayContext.Provider>
  )
}