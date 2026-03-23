"use client"
import { Geist, Geist_Mono } from "next/font/google"
import dynamic from "next/dynamic"

import "./globals.css"
import { cn } from "@/lib/utils"
import Provider from "@/provider/provider"

const SplineBackground = dynamic(
  () => import('@/components/spline/SplineBackground'),
  { ssr: false }
)

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <SplineBackground />
        </div>
        <Provider>
          <div className="relative z-10">{children}</div>
        </Provider>
      </body>
    </html>
  )
}
