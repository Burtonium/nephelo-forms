import { type FC, type PropsWithChildren, createContext, useContext, useState, useCallback } from "react";
import { FieldType, type CustomForm, Field } from "./types"

type FormBuilderContextType = {
  form: CustomForm;
  reorderField: (field: Field, newIndex: number) => void;
  createField: (type: FieldType, index: number) => void;
}

const defaultForm: CustomForm = {
  titleField: {
    id: 'title',
    type: FieldType.Title,
    title: 'Untitled Form'
  },
  fields: []
};


export const FormBuilderContext = createContext<FormBuilderContextType>({
  form: defaultForm,
} as FormBuilderContextType);

export const FormBuilderContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [form, setForm] = useState<CustomForm>(defaultForm);

  const reorderField = useCallback<FormBuilderContextType['reorderField']>((field, newIndex) => {
    const found = form.fields.find((f) => f.id === field.id);
  }, []);

  const createField = useCallback<FormBuilderContextType['createField']>((type, index) => {
    /* suh dude */
  }, []);

  return (
    <FormBuilderContext.Provider value={{ form, createField, reorderField }} >
      {children}
    </FormBuilderContext.Provider>
  )
}

export const useFormBuilder = () =>  useContext(FormBuilderContext);