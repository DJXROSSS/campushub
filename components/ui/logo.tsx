import { FaBookOpen } from "react-icons/fa"

const MyIcon = ({ className = "" }: { className?: string }) => (
  <FaBookOpen className={className} />
)

export const Logo = () => {
  return (
    <a href="#" className="mb-1.5 flex items-center space-x-2">
      <MyIcon className="h-5 w-5 text-black dark:text-white" />
      <span className="text-xl font-bold text-black dark:text-white">
        CampusHub
      </span>
    </a>
  )
}
