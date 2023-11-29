import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";


export default async function Profile() {
  const session = await getServerAuthSession();
  const user = session && await db.user.findFirst({ where: { id: session?.user.id } })

  if (!user) {
    redirect('/');
  }

  return (
    <div>
      Hi {user?.name}
    </div>
  );
}
