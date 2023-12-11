
import { notFound } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import ProfilePage from "./components/ProfilePage";

export default async function Profile() {
  const session = await getServerAuthSession();
  const user = session && await db.user.findFirst({
    where: { id: session?.user.id },
    include: {
      badges: true
    }
  });

  if (!user) {
    notFound();
  }

  return (
    <ProfilePage user={user} />
  );
}
