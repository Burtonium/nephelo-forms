import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"
import { type User } from "prisma/zod"
import { type FC } from "react"

const UserDisplay: FC<{ user?: User | null }> = ({ user }) => {
  return user ? (
    <Link className="dark:hover:text-orange-400" href={`/profile/${user.id}`}>
      <span>
        <Image className="inline w-6 h-6 rounded-full" alt={`${user.name}'s profile picture`} width={32} height={32} src={user.image ?? ''} />
        &nbsp;
        {user.name}
      </span>
    </Link>
  ) : (
    <span className="space-x-1 flex-inline items-center">
      <FontAwesomeIcon className="dark:bg-zinc-700/50 bg-zinc-300/50 p-1.5 rounded-full inline -mb-1 w-3.5 h-3.5" icon={faUser} />
      <span>Anonymous</span>
    </span>
  )
}

export default UserDisplay;
