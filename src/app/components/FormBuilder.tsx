/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client';
import { type FC, type PropsWithChildren, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import { DndProvider, useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { type CustomForm, FieldType } from "./types";
import TitleBuilder from "./TitleBuilder";


const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<{ x: null | number, y: null | number }>({ x: null, y: null });
  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);
  return mousePosition;
};

const DraggableField: FC<PropsWithChildren<{ type: FieldType }>> = ({ children, type }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      item: { type },
      type: 'field',
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [],
  );
  
  return (
    <li ref={drag} className="bg-white shadow-md dark:bg-zinc-800/50 p-3 text-orange-500 dark:text-orange-400 cursor-move flex space-x-2 items-center">
      <FontAwesomeIcon className="text-zinc-300 dark:text-zinc-700" icon={faGripVertical} />
      <span>{children}</span>
    </li>
  )
}

const FormBuilder = () => {
  const [form, setFormData] = useState<CustomForm>({ titleField: { id: 'title', type: FieldType.Title, title: 'Form Title' }, fields: [] });
  const { x, y } = useMousePosition();


  return (
    <div className='content-grid dark:text-white mt-10'>
      <div>
        <TitleBuilder field={form.titleField} />
        {form.fields.map((field) => (
          <>{field.type}</>
        ))}
      </div>
      <div className="content-end w-64 hidden lg:block pr-3">
        <ol className="space-y-2">
          <DraggableField type={FieldType.Title}>Title</DraggableField>
          <DraggableField type={FieldType.Label}>Label</DraggableField>
          <DraggableField type={FieldType.MultipleChoice}>Multiple Choice</DraggableField>
          <DraggableField type={FieldType.Question}>Question</DraggableField>
          <DraggableField type={FieldType.Number}>Number</DraggableField>
        </ol>
      </div>
    </div>
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