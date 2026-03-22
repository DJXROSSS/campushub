'use client'

import React from "react"
import Navbar from "./navbar"
import dynamic from 'next/dynamic'

const SplineBackground = dynamic(
  () => import('../SplineBackground'),
  { ssr: false }
)

const LandingPage = () => {
  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <SplineBackground />
      </div>
      <div className="relative z-10">
        <Navbar />
      </div>

    </div>
  )
}

export default LandingPage
