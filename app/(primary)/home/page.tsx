import SignInButton from "@/components/user/SignInButton"
import LoginButton from "@/components/user/LogInButton"
import { MyIcon } from "@/components/ui/icon"

const HomePage = () => {
    return (
        <div className="flex flex-col justify-center flex-1 px-6 sm:px-12 md:px-20 lg:px-28 pb-24">
            
            <div className="flex flex-row items-center gap-2">
                <MyIcon className="h-20 w-20 text-black dark:text-white" />
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-tight">
                    CampusHub
                </h1>
            </div>

            <p className="mt-4 max-w-lg text-base sm:text-lg md:text-xl italic text-neutral-300 leading-relaxed">
                Your and your College&apos;s best companion or somthing like that IDK
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
                <SignInButton text={"Sign Up"}/>
                <LoginButton text={"Log In"}/>
            </div>

            <p className="mt-4 text-sm text-neutral-400">
                Log in to get started
            </p>
        </div>
    )
}

export default HomePage