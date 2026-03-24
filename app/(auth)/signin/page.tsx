"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import SignInCard from "@/components/auth/signin/SignInCard"

export default function SignInPage() {
  const [signinLoading, setSigninLoading] = useState(false)
  const router = useRouter()

  const handleSignIn = async () => {
    setSigninLoading(true)
    try {
      await signIn("google", { callbackUrl: "/onboarding" })
    } catch (error) {
      console.error("Failed to sign in:", error)
      setSigninLoading(false)
    }
  }

  const handleSkipLogin = () => {
    localStorage.setItem("skipLogin", "true")
    localStorage.setItem(
      "campushub_user",
      JSON.stringify({
        name: "Demo User",
        email: "demo@college.edu",
        image: null,
      })
    )
    router.push("/onboarding")
  }

  return (
    <div className="relative min-h-screen">
      <div className="flex min-h-screen">
        <div className="flex w-full items-center justify-center bg-white/80 p-8 dark:bg-black/80 backdrop-blur-sm">
          <SignInCard
            signinLoading={signinLoading}
            onSignIn={handleSignIn}
            onSkip={handleSkipLogin}
          />
        </div>
      </div>
    </div>
  )
}
