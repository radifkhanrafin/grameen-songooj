"use client"

import { useAppContext } from "@/lib/context"
import Link from "next/link"
import { Navigation } from "./navigation"

export function Header() {
  const { userRole, setUserRole } = useAppContext()

  return (
    <>
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-foreground rounded-full flex items-center justify-center font-bold text-primary text-lg">
              GS
            </div>
            <div>
              <h1 className="text-xl font-bold">Grameen Songjog</h1>
              <p className="text-xs opacity-90">Rural Issue Reporting</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex gap-1 bg-primary-foreground/20 rounded-lg p-1">
              <button
                onClick={() => setUserRole("villager")}
                className={`px-3 py-2 rounded text-sm font-medium transition ${
                  userRole === "villager"
                    ? "bg-primary-foreground text-primary"
                    : "text-primary-foreground hover:bg-primary-foreground/10"
                }`}
              >
                Villager
              </button>
              <button
                onClick={() => setUserRole("admin")}
                className={`px-3 py-2 rounded text-sm font-medium transition ${
                  userRole === "admin"
                    ? "bg-primary-foreground text-primary"
                    : "text-primary-foreground hover:bg-primary-foreground/10"
                }`}
              >
                Admin
              </button>
              <button
                onClick={() => setUserRole("ngo")}
                className={`px-3 py-2 rounded text-sm font-medium transition ${
                  userRole === "ngo"
                    ? "bg-primary-foreground text-primary"
                    : "text-primary-foreground hover:bg-primary-foreground/10"
                }`}
              >
                NGO
              </button>
            </div>
          </div>
        </div>
      </header>
      <Navigation />
    </>
  )
}
