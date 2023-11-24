'use client';
import { type FC, type PropsWithChildren } from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { FieldType } from "../../types";
import { actions } from "~/state/reducers/formBuilder";
import { FormBuilderContextProvider } from "./FormBuilderContext";
import FieldBuilder from "./FieldBuilder";
import useFormBuilder from "~/hooks/useDataBuilder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const FieldCreatorButton: FC<PropsWithChildren<{ type: FieldType }>> = ({ children, type }) => {
  const { dispatch } = useFormBuilder();

  const onClick = () => dispatch(actions.createDefaultField(type))

  return (
    <button onClick={onClick} className="bg-white shadow-md dark:bg-zinc-800/50 p-3 text-orange-500 dark:text-orange-400 flex space-x-2 items-center w-full dark:hover:bg-zinc-700/50 hover:bg-zinc-100/50">
      <FontAwesomeIcon className="w-4" icon={faPlus} />
      <span>{children}</span>
    </button>
  )
}

const FieldBuilders = () => {
  const { fields } = useFormBuilder();

  return (
    <div className="space-y-5">
      {fields.filter((f) => f.parentId === undefined).map((f) => (
        <FieldBuilder key={f.id} field={f} />
      ))}
    </div>
  )
}

const FormBuilder = () => {
  return (
    <FormBuilderContextProvider>
      <div className='content-grid dark:text-white my-10'>
        <div>
          <FieldBuilders />
          <div className="text-center mt-10">
            <button className="btn">Publish</button>
          </div>
        </div>
        <div className="content-end w-64 hidden lg:block pr-3">
          <ol className="space-y-2 sticky top-5">
            <FieldCreatorButton type={FieldType.TITLE}>Title</FieldCreatorButton>
            <FieldCreatorButton type={FieldType.LABEL}>Label</FieldCreatorButton>
            <FieldCreatorButton type={FieldType.MULTIPLE_CHOICE}>Multiple Choice</FieldCreatorButton>
            <FieldCreatorButton type={FieldType.QUESTION}>Question</FieldCreatorButton>
            <FieldCreatorButton type={FieldType.UNIT}>Unit</FieldCreatorButton>
          </ol>
        </div>
      </div>
    </FormBuilderContextProvider>
  )
}


const FormBuilderContainer = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <FormBuilder />
    </DndProvider>
  )
}

export default FormBuilderContainer;