"use client"

import Link from "next/link"
import { useAppContext } from "@/lib/context"
import { usePathname } from "next/navigation"

export function Navigation() {
  const { userRole } = useAppContext()
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="bg-card border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-muted-foreground">Quick Links:</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href="/"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              isActive("/") ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            Home
          </Link>

          <Link
            href="/problems"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              isActive("/problems")
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            View Problems
          </Link>

          {userRole === "villager" && (
            <Link
              href="/report"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                isActive("/report")
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              Report Issue
            </Link>
          )}

          {userRole === "admin" && (
            <Link
              href="/admin"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                isActive("/admin") ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              Admin Dashboard
            </Link>
          )}

          {userRole === "ngo" && (
            <Link
              href="/ngo"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                isActive("/ngo") ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              NGO Panel
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
