
import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import dayjs from 'src/plugins/dayjs';


export default async function Profile() {
  const session = await getServerAuthSession();
  const user = session && await db.user.findFirst({ where: { id: session?.user.id } })

  if (!user) {
    redirect('/');
  }

  return (
    <div className="wrapper-xs pt-10">
      <div className=" dark:bg-zinc-800/50 p-5 border-l-4 border-orange-400 bg-white shadow-md text-center">
        <Image className="block rounded-full mb-5 mx-auto" alt="User's profile picture" width={128} height={128} src={user.image ?? ''} />
        <div>
          <h2 className="text-3xl">{user.name}</h2>
          <p>Created about {dayjs().to(user.createdAt)}</p>
        </div>
      </div>
    </div>
  );
}
