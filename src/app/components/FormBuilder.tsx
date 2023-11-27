'use client';
import { useState, type FC, type PropsWithChildren, useCallback } from "react";
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { actions } from "~/state/reducers/formBuilder";
import { FormBuilderContextProvider } from "./FormBuilderContext";
import FieldBuilder from "./FieldBuilder";
import useFormBuilder from "~/hooks/useFormBuilder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faGrip } from "@fortawesome/free-solid-svg-icons";
import { FieldType } from "@prisma/client";
import { useDrag } from 'react-dnd'
import classNames from "classnames";
import { type FieldInsert } from "prisma/zod";

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

const DropZone: FC<PropsWithChildren & { index: number }> = ({ children, index }) => {
  const [hoveringField, setHoveringField] = useState<FieldInsert>();
  const { dispatch,  } = useFormBuilder();

  const reorderHoveringField = useCallback(() => {
    if (hoveringField) {
      dispatch(actions.reorder({ id: hoveringField.id, index }))
    }
  }, [dispatch, hoveringField, index]);

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: 'field',
      drop: () => { reorderHoveringField() },
      hover: (item: FieldInsert) => { setHoveringField(item); },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [setHoveringField, reorderHoveringField],
  );

  return (
    <div ref={drop} className={classNames({"pb-5": !isOver },"w-full h-full top-[-2rem]")} >
      {children}
      {isOver && hoveringField && canDrop && (
        <div className="my-5 border-dashed border-2 border-orange-400">
          <FieldBuilder field={hoveringField} />
        </div>
      )}
    </div>
  )
}

const DraggableField: FC<{ field: FieldInsert }> = ({ field: f }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'field',
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
    item: () => { console.log(f); return f },
    canDrag: f.type !== 'MAIN_TITLE'
  }), [f]);

  return (
    <div className={classNames({ 'hidden': isDragging })}>
      {f.type !== FieldType.MAIN_TITLE && !isDragging && (
        <div ref={drag} className="absolute z-10 text-center w-full cursor-move" role="Handle">
          <FontAwesomeIcon className="dark:text-zinc-300 text-zinc-600/50" icon={faGrip} />
        </div>
      )}
      <DropZone index={f.index}>
        <FieldBuilder key={f.id} field={f} />
      </DropZone>
    </div>
  )
}

const FieldBuilders = () => {
  const { fields } = useFormBuilder();

  return (
    <div>
      {fields.filter((f) => !f.parentId).map((f) => (
        <DraggableField key={f.id} field={f} />
      ))}
    </div>
  )
}

const FormBuilder = () => {
  return (
    <FormBuilderContextProvider>
      <div className='content-grid dark:text-white my-10'>
        <div className="relative">
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