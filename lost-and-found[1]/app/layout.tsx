import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ItemsProvider } from "@/context/items-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "FindIt - Digital Lost and Found Platform",
  description: "A digital lost-and-found platform for public spaces to help reunite people with their lost belongings.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <ItemsProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ItemsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
