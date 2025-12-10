"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useAppContext } from "@/lib/context"
import { storageService } from "@/lib/storage"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Home() {
  const { userRole } = useAppContext()

  useEffect(() => {
    storageService.initializeDemoData()
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Welcome to Grameen Songjog</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Empowering rural communities to report and resolve local issues
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card p-8 text-center">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-xl font-bold mb-2">Report Issues</h3>
            <p className="text-muted-foreground mb-4">
              Submit problems in your locality including photos and location details.
            </p>
            <Link href="/report" className="btn-primary inline-block">
              Report Now
            </Link>
          </div>

          <div className="card p-8 text-center">
            <div className="text-4xl mb-4">👁️</div>
            <h3 className="text-xl font-bold mb-2">View Problems</h3>
            <p className="text-muted-foreground mb-4">
              Browse all reported issues, track status, and view community responses.
            </p>
            <Link href="/problems" className="btn-primary inline-block">
              View All
            </Link>
          </div>

          <div className="card p-8 text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-2">Track Progress</h3>
            <p className="text-muted-foreground mb-4">
              Monitor how issues are being addressed by authorities and NGOs.
            </p>
            <Link href="/problems" className="btn-primary inline-block">
              Check Status
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-border p-8">
          <h3 className="text-2xl font-bold mb-4">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-3">
                1
              </div>
              <h4 className="font-semibold mb-2">Report</h4>
              <p className="text-sm text-muted-foreground">Submit an issue with details and photos</p>
            </div>
            <div>
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-3">
                2
              </div>
              <h4 className="font-semibold mb-2">Track</h4>
              <p className="text-sm text-muted-foreground">View problem status in real-time</p>
            </div>
            <div>
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-3">
                3
              </div>
              <h4 className="font-semibold mb-2">Engage</h4>
              <p className="text-sm text-muted-foreground">NGOs respond and offer assistance</p>
            </div>
            <div>
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-3">
                4
              </div>
              <h4 className="font-semibold mb-2">Resolve</h4>
              <p className="text-sm text-muted-foreground">Issue gets addressed and resolved</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
