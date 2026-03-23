'use client'

import React from "react"
import Navbar from "./navbar"
import HomePage from "@/app/(primary)/home/page"

const LandingPage = () => {
  return (
    <div className="relative w-full h-screen">
      <div className="relative z-10 flex flex-col h-full">
        <Navbar />
        <HomePage />
      </div>
    </div>
  )
}

export default LandingPage
