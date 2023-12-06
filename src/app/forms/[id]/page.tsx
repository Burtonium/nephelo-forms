import { api } from "~/trpc/server"
import FieldDisplay from "./components/FieldDisplay";
import Image from "next/image";
import Link from "next/link";
import { notFound } from 'next/navigation'
import dayjs from "src/plugins/dayjs";
import { EntryBuilderContextProvider } from "~/contexts/EntryBuilderContext";
import { getServerAuthSession } from "~/server/auth";
import EntrySubmitButton from "./components/EntrySubmitButton";

export default async function Page({ params }: { params: { id: string } }) {
  const form = await api.form.fetch.query({ id: params.id });
  const session = await getServerAuthSession();


  if (!form) {
    return notFound();
  }
  
  return (
    <div className="my-10 wrapper-sm space-y-6 form-display">
      <div className="">
        {form.createdBy && (
          <div>
            <span>Created by</span>
            &nbsp;&nbsp;
            <Link className="dark:hover:text-orange-400" href={`/profiles/${form.createdBy.id}`}>
              <span>
                <Image className="inline w-6 h-6 rounded-full" alt={`${form.createdBy.name}'s profile picture`} width={32} height={32} src={form.createdBy.image ?? ''} />
                &nbsp;
                {form.createdBy.name}
              </span>
            </Link>
            &nbsp;
            <span>about {dayjs().to(form.createdAt)}.</span>
          </div>
        )}
      </div>
      <EntryBuilderContextProvider formId={form.id} userId={session?.user.id}>
        <>
          {form?.fields.map((f) => (<FieldDisplay key={f.id} field={f} />))}
          <div className="my-10 text-center">
            <EntrySubmitButton />
          </div>
        </>
      </EntryBuilderContextProvider>
    </div>
  )
}