import { api } from "~/trpc/server"
import FieldDisplay from "./components/FieldDisplay";

export default async function Page({ params }: { params: { id: string } }) {
  const form = await api.form.fetch.query({ id: params.id });

  return (
    <div className="content-grid my-10">
      {form?.fields.map((f) => (<FieldDisplay key={f.id} field={f} />))}
    </div>
  )
}