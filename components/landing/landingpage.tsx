'use client'

import React from "react"
import Navbar from "./navbar"
import dynamic from 'next/dynamic'
import HomePage from "@/app/(primary)/home/page"

const SplineBackground = dynamic(
  () => import('../spline/SplineBackground'),
  { ssr: false }
)

const LandingPage = () => {
  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <SplineBackground />
      </div>
      <div className="relative z-10 flex flex-col h-full">
        <Navbar />
        <HomePage />
      </div>
    </div>
  )
}

export default LandingPage
