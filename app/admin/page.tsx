"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AdminStats } from "@/components/admin-stats"
import { AdminTable } from "@/components/admin-table"
import { storageService, type Problem } from "@/lib/storage"
import { useAppContext } from "@/lib/context"
import { useSyncedState } from "@/hooks/use-synced-state"

export default function AdminPage() {
  const router = useRouter()
  const { userRole } = useAppContext()
  const problems = useSyncedState(() => storageService.getAllProblems(), [])
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [statusFilter, setStatusFilter] = useState<Problem["status"] | "All">("All")
  const [categoryFilter, setCategoryFilter] = useState<Problem["category"] | "All">("All")

  const filteredProblems = useMemo(() => {
    let filtered = problems

    if (statusFilter !== "All") {
      filtered = filtered.filter((p) => p.status === statusFilter)
    }

    if (categoryFilter !== "All") {
      filtered = filtered.filter((p) => p.category === categoryFilter)
    }

    return filtered.sort((a, b) => b.createdAt - a.createdAt)
  }, [problems, statusFilter, categoryFilter])

  // Redirect non-admin users
  const redirectNonAdminUsers = () => {
    if (userRole !== "admin") {
      return (
        <div className="min-h-screen bg-background flex flex-col">
          <Header />
          <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
              <p className="text-muted-foreground">Admin access required. Switch to Admin role to view this page.</p>
            </div>
          </main>
          <Footer />
        </div>
      )
    }
  }

  const handleStatusChange = (id: string, status: Problem["status"]) => {
    storageService.updateProblemStatus(id, status)
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {redirectNonAdminUsers()}

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage all reported problems and track community issues</p>
        </div>

        <AdminStats problems={problems} />

        <div className="bg-white rounded-lg border border-border p-6 mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4">Filter Problems</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as Problem["status"] | "All")}
                className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Solved">Solved</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as Problem["category"] | "All")}
                className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="All">All Categories</option>
                <option value="Road">Road</option>
                <option value="Water">Water</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
                <option value="Sanitation">Sanitation</option>
                <option value="Electricity">Electricity</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        <AdminTable problems={filteredProblems} onStatusChange={handleStatusChange} />
      </main>

      <Footer />
    </div>
  )
}
