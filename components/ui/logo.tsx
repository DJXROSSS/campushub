import Link from "next/link"
import { MyIcon } from "./icon"

export const Logo = () => {
  return (
    <Link href="/" className="mb-1.5 flex items-center space-x-2">
      <MyIcon className="h-5 w-5 text-black dark:text-white" />
      <span className="text-xl font-bold text-black dark:text-white">
        CampusHub
      </span>
    </Link>
  )
}
