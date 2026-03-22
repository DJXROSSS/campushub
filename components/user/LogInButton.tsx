"use client"
import React from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { Spinner } from "../ui/spinner"

type Props = { text: string }

const LoginButton = ({ text }: Props) => {
  const { status } = useSession()

  return (
    <Link href="/signin">
      <button className="flex h-fit min-h-[33.6px] min-w-20 items-center justify-center rounded-xl border border-neutral-300 bg-transparent px-3 py-1.5 text-sm font-semibold shadow-[inset_0px_1.2px_0px_rgba(255,255,255,0.3)] text-white transition-all duration-300 ">
        {status === "loading" ? <Spinner /> : <>{text}</>}
      </button>
    </Link>
  )
}

export default LoginButton