"use client"

import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProblemForm } from "@/components/problem-form"

export default function ReportPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Report a Problem</h1>
          <p className="text-muted-foreground">
            Help improve your locality by reporting issues. Your report will be visible to administrators and NGOs.
          </p>
        </div>

        <ProblemForm
          onSuccess={() => {
            setTimeout(() => {
              router.push("/problems")
            }, 1000)
          }}
        />
      </main>

      <Footer />
    </div>
  )
}
