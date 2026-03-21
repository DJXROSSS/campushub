"use client"

import { signIn, useSession } from "next-auth/react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Loader } from "../ui/loader"
type Props = { text: string }

const SignInButton = ({ text }: Props) => {
  const { status } = useSession()
  const [open, setOpen] = useState(false)
  const [signinLoading, setSigninLoading] = useState(false)

  const handleSignIn = async () => {
    setSigninLoading(true)
    try {
      await signIn("google", { callbackUrl: "/blocks/hero-section" })
    } catch (error) {
      console.error("Failed to sign in:", error)
      setSigninLoading(false)
    }
  }

  if (status === "loading") {
    return (
      <button className="flex h-fit min-h-[33.6px] min-w-16 items-center justify-center text-sm font-semibold text-foreground/60 transition-colors hover:text-foreground/80">
        <Loader />
      </button>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex h-fit min-h-[33.6px] min-w-16 cursor-pointer items-center justify-center text-sm font-semibold text-foreground/60 transition-colors hover:text-foreground/80">
          {text}
        </button>
      </DialogTrigger>

      <DialogContent className="border-0 bg-card/95 shadow-2xl backdrop-blur-xl sm:max-w-lg">
        <div className="absolute inset-0 rounded-lg bg-linear-to-br from-primary/5 via-transparent to-accent/5" />

        <DialogHeader className="relative space-y-4 text-center">
          <DialogTitle className="text-2xl font-bold text-primary">
            Sign in to Unlock ForgeUI Pro
          </DialogTitle>
        </DialogHeader>

        <div className="relative space-y-6 pt-2">
          <div className="space-y-3 pt-1">
            <p className="text-center text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
              <span className="font-medium text-neutral-800 dark:text-neutral-300">
                Important:
              </span>{" "}
              Please sign in with the{" "}
              <span className="font-medium">same Google account</span> you used
              <span> (or will use)</span> to make the payment. Access is linked
              to your payment email.
            </p>

            <Button
              className={cn(
                "relative flex w-full cursor-pointer items-center justify-center",
                "rounded-sm bg-neutral-950 px-4 py-5 text-sm font-medium text-white",
                "dark:bg-neutral-50 dark:text-neutral-900",
                "overflow-hidden hover:bg-black dark:hover:bg-white",

                "after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:h-[30%] after:w-full hover:after:h-[20%]",
                "after:bg-linear-to-t after:from-white/35 after:to-transparent dark:after:from-black/20",
                "transition-all duration-300"
              )}
              onClick={handleSignIn}
              disabled={signinLoading}
            >
              {signinLoading ? (
                <>
                  <Loader2 className="mt-0.5 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <svg className="mt-0.5 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign in with Google
                </>
              )}
            </Button>
            <p className="text-center text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              By signing up, you agree to our{" "}
              <Link
                className="underline transition-colors hover:text-neutral-800 dark:hover:text-neutral-200"
                href="/termsofservice"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                className="underline transition-colors hover:text-neutral-800 dark:hover:text-neutral-200"
                href="/privacypolicy"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SignInButton
