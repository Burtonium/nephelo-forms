'use client';
import { type FC, type PropsWithChildren, useCallback, useState } from "react";
import TitleBuilder from "./TitleBuilder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";

type CustomForm = {
  title: string;
  description?: string;
}

const DraggableInput: FC<PropsWithChildren> = ({ children }) => (
  <li className="bg-white shadow-md dark:bg-zinc-800/50 p-3 text-orange-500 dark:text-orange-400 cursor-move flex space-x-2 items-center">
    <FontAwesomeIcon className="text-zinc-300 dark:text-zinc-700" icon={faGripVertical} />
    <span>{children}</span>
  </li>
)

const FormBuilder = () => {
  const [formValues, setFormValues] = useState<CustomForm>({ title: 'Untitled Form' });

  const onTitleDescChange = useCallback((data: Pick<CustomForm, 'title' | 'description'>) => {
    setFormValues((values) => ({
      ...values,
      ...data
    }))
  }, []);

  return (
    <main className='content-grid dark:text-white mt-10'>
      <div>
        <TitleBuilder title={formValues.title} description={formValues.description} onChange={onTitleDescChange} />
      </div>
      <div className="content-end w-64 hidden lg:block pr-3">
        <ol className="space-y-2">
          <DraggableInput>Title</DraggableInput>
          <DraggableInput>Label</DraggableInput>
          <DraggableInput>Multiple Choice</DraggableInput>
          <DraggableInput>Question</DraggableInput>
          <DraggableInput>Number</DraggableInput>
        </ol>
      </div>
    </main>
  )
}

export default FormBuilder;