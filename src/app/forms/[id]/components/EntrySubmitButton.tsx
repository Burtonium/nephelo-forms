'use client';
import assert from "assert";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import useEntryBuilder from "~/hooks/useEntryBuilder"
import { api } from "~/trpc/react";

const EntrySubmitButton = () => {
  const builder = useEntryBuilder();
  const createEntry = api.entry.create.useMutation();
  const router = useRouter();

  const onSubmit = useCallback(async () => {
    assert(builder.entry, 'Entry is required');

    const e = await createEntry.mutateAsync({
      entry: builder.entry,
      entries: builder.entries
    });
    
    return router.push(`/entries/${e.id}`);
  }, [builder.entries, builder.entry, createEntry, router]);

  return (
    <button onClick={onSubmit} className="btn">
      {createEntry.isLoading ? 'Submitting' : 'Submit'}
    </button>
  )
}

export default EntrySubmitButton;
