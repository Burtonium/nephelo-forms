import { type User, type UserBadge } from "@prisma/client"
import dayjs from "src/plugins/dayjs"
import Image from "next/image"
import { type FC } from "react"
import Badge from "./Badge"

type Props = {
  user: User & { badges: UserBadge[] }
}

const ProfilePage: FC<Props> = ({ user }) => (
  <div className="wrapper-xs pt-10 space-y-5">
    <div className=" dark:bg-zinc-800/50 p-5 border-l-4 border-orange-400 bg-white shadow-md text-center space-y-5">
      <Image className="block rounded-full mb-5 mx-auto" alt="User's profile picture" width={128} height={128} src={user.image ?? ''} />
      <div>
        <h2 className="text-3xl font-semibold">{user.name}</h2>
        <p>Created about {dayjs().to(user.createdAt)}</p>
      </div>
    </div>

    <div className=" dark:bg-zinc-800/50 p-5 border-l-4 border-orange-400 bg-white shadow-md text-center space-y-5">
      <h2 className="text-3xl font-semibold">Badges</h2>
      <div className="flex justify-center">
        {user.badges.map((badge) => (
          <Badge key={badge.id} award={badge.award} />
        ))}
      </div>
    </div>
  </div>
)

export default ProfilePage;
