import { api } from "~/trpc/server"
import Image from "next/image";
import Link from "next/link";
import { notFound } from 'next/navigation';
import dayjs from "src/plugins/dayjs";
import { getServerAuthSession } from "~/server/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { EntryDisplayContextProvider } from "~/contexts/EntryDisplayContext";
import FieldEntryDisplay from "./components/FieldEntryDisplay";

export default async function Page({ params }: { params: { id: string } }) {
  const entry = await api.entry.fetch.query({ id: params.id });
  const session = await getServerAuthSession();

  if (!entry) {
    return notFound();
  }

  const userHasSubmittedThisEntry = session?.user?.id && session.user.id === entry.userId;

  return (
    <div className="my-10 wrapper-sm space-y-6 form-display">
      <div>
        {entry.user ? (
          <span>
            {userHasSubmittedThisEntry ?  (
              <>
                <span>You</span>
              </>
            ) : (
              <>
                <span>Form entry submitted by</span>
                &nbsp;&nbsp;
                <Link className="dark:hover:text-orange-400" href={`/profile/${entry.user.id}`}>
                  <span>
                    <Image className="inline w-6 h-6 rounded-full" alt={`${entry.user.name}'s profile picture`} width={32} height={32} src={entry.user.image ?? ''} />
                    &nbsp;
                    {entry.user.name}
                  </span>
                </Link>
              </>
            )}
            &nbsp;
            <span></span>
          </span>
        ) : (
          <>
            <span className="space-x-2 flex-inline items-center">
              <FontAwesomeIcon className="dark:bg-zinc-700/50 bg-zinc-300/50 p-1.5 rounded-full inline -mb-1 w-3.5 h-3.5" icon={faUser} />
              <span>Anonymous</span>
              &nbsp;
            </span>
          </>
        )}
        submitted this entry about {dayjs().to(entry.createdAt)}.
      </div>
      <EntryDisplayContextProvider entry={entry}>
        {entry.form.fields.map((field) => (<FieldEntryDisplay key={field.id} field={field} />))}
      </EntryDisplayContextProvider>
    </div>
  )
}