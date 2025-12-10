"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NGOCard } from "@/components/ngo-card"
import { storageService, type Problem } from "@/lib/storage"
import { useAppContext } from "@/lib/context"
import { useSyncedState } from "@/hooks/use-synced-state"

export default function NGOPage() {
  const { userRole } = useAppContext()
  const problems = useSyncedState(() => storageService.getAllProblems(), [])
  const [categoryFilter, setCategoryFilter] = useState<Problem["category"] | "All">("All")
  const [statusFilter, setStatusFilter] = useState<Problem["status"] | "All">("All")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => {
      const categoryMatch = categoryFilter === "All" || problem.category === categoryFilter
      const statusMatch = statusFilter === "All" || problem.status === statusFilter
      const searchMatch =
        searchTerm === "" ||
        problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        problem.location.toLowerCase().includes(searchTerm.toLowerCase())

      return categoryMatch && statusMatch && searchMatch
    })
  }, [problems, categoryFilter, statusFilter, searchTerm])

  const problemsWithMyResponses = new Set(problems.flatMap((p) => (p.ngoResponses.length > 0 ? [p.id] : [])))

  // Redirect non-NGO users
  const redirectNonNGOUsers = () => {
    if (userRole !== "ngo") {
      return (
        <div className="min-h-screen bg-background flex flex-col">
          <Header />
          <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground mb-2">NGO Panel</h1>
              <p className="text-muted-foreground">NGO access required. Switch to NGO role to view this page.</p>
            </div>
          </main>
          <Footer />
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {redirectNonNGOUsers()}

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">NGO/Volunteer Panel</h1>
          <p className="text-muted-foreground">
            View community problems and respond to offer help. Your responses encourage action and support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground">Total Problems</p>
            <p className="text-3xl font-bold text-foreground">{problems.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground">Pending Issues</p>
            <p className="text-3xl font-bold text-orange-600">
              {problems.filter((p) => p.status === "Pending").length}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground">With NGO Response</p>
            <p className="text-3xl font-bold text-green-600">{problemsWithMyResponses.size}</p>
          </div>
          <div className="bg-white rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground">Solved Issues</p>
            <p className="text-3xl font-bold text-emerald-600">
              {problems.filter((p) => p.status === "Solved").length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-border p-6 mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4">Find Issues to Help With</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Search</label>
              <input
                type="text"
                placeholder="Search by title or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>
          </div>
        </div>

        {filteredProblems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-border">
            <p className="text-lg text-muted-foreground mb-4">No problems found matching your filters</p>
            <button
              onClick={() => {
                setCategoryFilter("All")
                setStatusFilter("All")
                setSearchTerm("")
              }}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-4">Showing {filteredProblems.length} problems</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProblems.map((problem) => (
                <NGOCard key={problem.id} problem={problem} hasResponded={problemsWithMyResponses.has(problem.id)} />
              ))}
            </div>
          </>
        )}

        <div className="mt-12 bg-blue-50 rounded-lg border border-blue-200 p-8">
          <h3 className="text-xl font-bold text-blue-900 mb-3">How to Help</h3>
          <ul className="space-y-2 text-blue-800">
            <li>1. Browse all community problems using the filters above</li>
            <li>2. Click on any problem to view full details and community comments</li>
            <li>3. Click "I Want to Help" to submit your organization's response</li>
            <li>4. Update your response status as you make progress (Will Visit → Visited → Resolved)</li>
            <li>5. Engage with the community through comments and updates</li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  )
}
