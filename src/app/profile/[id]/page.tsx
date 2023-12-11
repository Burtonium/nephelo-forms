
import { notFound } from "next/navigation";
import { db } from "~/server/db";
import ProfilePage from "../components/ProfilePage";


export default async function Profile({ params }: { params: { id: string } }) {
  const user = await db.user.findFirst({
    where: { id: params.id },
    include: {
      badges: true
    }
  })


  if (!user) {
    notFound();
  }

  // cheap email obfuscation
  user.email = '';

  return (
    <ProfilePage user={user} />
  );
}
