"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProblemCard } from "@/components/problem-card"
import { FilterBar } from "@/components/filter-bar"
import { storageService, type Problem } from "@/lib/storage"
import { useSyncedState } from "@/hooks/use-synced-state"

export default function ProblemsPage() {
  const problems = useSyncedState(() => storageService.getAllProblems(), [])
  const [selectedCategory, setSelectedCategory] = useState<Problem["category"] | "All">("All")
  const [selectedStatus, setSelectedStatus] = useState<Problem["status"] | "All">("All")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => {
      const categoryMatch = selectedCategory === "All" || problem.category === selectedCategory
      const statusMatch = selectedStatus === "All" || problem.status === selectedStatus
      const searchMatch =
        searchTerm === "" ||
        problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        problem.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        problem.description.toLowerCase().includes(searchTerm.toLowerCase())

      return categoryMatch && statusMatch && searchMatch
    })
  }, [problems, selectedCategory, selectedStatus, searchTerm])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">All Reported Problems</h1>
          <p className="text-muted-foreground">Browse and view details of reported issues in your community</p>
        </div>

        <FilterBar
          selectedCategory={selectedCategory}
          selectedStatus={selectedStatus}
          onCategoryChange={setSelectedCategory}
          onStatusChange={setSelectedStatus}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <div className="mt-8">
          {filteredProblems.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-border">
              <p className="text-lg text-muted-foreground mb-4">No problems found matching your filters</p>
              <Link
                href="/report"
                className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              >
                Report a Problem
              </Link>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                Showing {filteredProblems.length} of {problems.length} problems
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProblems.map((problem) => (
                  <ProblemCard key={problem.id} problem={problem} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
