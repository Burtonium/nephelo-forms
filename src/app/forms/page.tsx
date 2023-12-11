import { api } from "~/trpc/server"
import Link from "next/link";
import dayjs from "src/plugins/dayjs";
import { type FC, useMemo } from "react";
import { FieldModel } from "prisma/zod";
import UserDisplay from "../components/UserDisplay";

type Awaited<T> = T extends PromiseLike<infer U> ? U : T
type Form = Awaited<ReturnType<typeof api.form.fetchAll.query>>[number];

const FormRow: FC<{ form: Form }> = ({ form }) => {
  const { title } = useMemo(() => {
    const title = form.fields.find((f) => f.type === 'MAIN_TITLE');
    const parsed = FieldModel.parse(title);
    return parsed.data;
  }, [form.fields]);


  return (
    <tr className="dark:odd:bg-zinc-800/50 odd:bg-zinc-200/50">
      <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8 text-lg font-semibold ">
        {title}
      </td>
      <td className="py-4 pl-0 pr-4 sm:pr-8">
        <UserDisplay user={form.createdBy} />
      </td>
      <td className="py-4 pl-0 pr-4 text-sm leading-6 dark:text-gray-400 sm:pr-6 lg:pr-8">
        <time dateTime={form.createdAt.toISOString()}>
          {dayjs().to(form.createdAt)}
        </time>
      </td>
      <td className="text-right pr-8">
        <Link className="btn" href={`/forms/${form.id}`}>
          View
        </Link>
      </td>
    </tr>
  )
}

export default async function Page() {
  const forms = await api.form.fetchAll.query();

  return (
    <div className="wrapper py-10">
      <h2 className="px-4 text-base font-semibold leading-7  sm:px-6 lg:px-8">
        Latest 10 forms
      </h2>
      <table className="mt-6 w-full whitespace-nowrap text-left ">
        <thead className="border-b dark:border-white/10 text-sm leading-6">
          <tr>
            <th scope="col" className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
              Title
            </th>
            <th scope="col" className="py-2 pl-0 pr-8 font-semibold">
              Created by
            </th>
            <th scope="col" className="py-2 pl-0 pr-8 font-semibold lg:pr-20">
              Timestamp
            </th>
            <th scope="col" className="py-2 pl-0 pr-4 text-right font-semibold" />
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {forms.map((form) => (
            <FormRow key={form.id} form={form} />
          ))}
        </tbody>
      </table>
    </div>
  );
}