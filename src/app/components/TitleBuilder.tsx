import { type FC, useCallback, type ChangeEventHandler } from "react";

type Data = {
  title: string;
  description?: string;
}

type Props = {
  title: string;
  description?: string;
  onChange: (data: Data) => void;
}

const TitleBuilder: FC<Props> = ({ title, description, onChange }) => {
  const onTitleChanged = useCallback<ChangeEventHandler<HTMLInputElement>>((event) => {
    onChange({ title: event.target.value , description });
  }, [description, onChange]);

  const onDescChanged = useCallback<ChangeEventHandler<HTMLTextAreaElement>>((event) => {
    onChange({ title, description: event.target.value });
  }, [title, onChange]);

  return (
    <div className="space-y-2 dark:bg-zinc-800/50 p-5 border-l-4 border-orange-400 bg-white shadow-md">
      <input
        placeholder="Form Title"
        value={title}
        className="text-4xl bg-transparent w-full"
        onChange={onTitleChanged} />
      <textarea
        value={description}
        className="text-xl bg-transparent placeholder:dark:text-zinc-400 dark:text-zinc-300  w-full resize-none"
        placeholder="Form Description"
        onChange={onDescChanged} />
    </div>
  )
}

export default TitleBuilder;