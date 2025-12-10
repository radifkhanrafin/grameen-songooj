"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CommentSection } from "@/components/comment-section"
import { NGOResponseSection } from "@/components/ngo-response-section"
import { storageService, type Problem } from "@/lib/storage"
import { useAppContext } from "@/lib/context"

const CATEGORY_COLORS: Record<Problem["category"], string> = {
  Road: "bg-blue-100 text-blue-800",
  Water: "bg-cyan-100 text-cyan-800",
  Health: "bg-red-100 text-red-800",
  Education: "bg-green-100 text-green-800",
  Sanitation: "bg-purple-100 text-purple-800",
  Electricity: "bg-yellow-100 text-yellow-800",
  Other: "bg-gray-100 text-gray-800",
}

const STATUS_COLORS: Record<Problem["status"], string> = {
  Pending: "bg-orange-100 text-orange-800",
  "In Progress": "bg-blue-100 text-blue-800",
  Solved: "bg-green-100 text-green-800",
}

export default function ProblemDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { userRole } = useAppContext()
  const [problem, setProblem] = useState<Problem | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  useEffect(() => {
    const prob = storageService.getProblemById(params.id as string)
    setProblem(prob)
    setLoading(false)
  }, [params.id, refreshTrigger])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </main>
        <Footer />
      </div>
    )
  }

  if (!problem) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Problem Not Found</h1>
            <p className="text-muted-foreground mb-6">The problem you're looking for doesn't exist.</p>
            <Link
              href="/problems"
              className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              Back to Problems
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const createdDate = new Date(problem.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <Link href="/problems" className="text-primary hover:underline text-sm font-medium mb-6 inline-block">
          ← Back to Problems
        </Link>

        <div className="bg-white rounded-lg border border-border p-8 mb-8">
          {problem.image && (
            <div className="mb-6 rounded-lg overflow-hidden max-h-96">
              <img
                src={problem.image || "/placeholder.svg"}
                alt={problem.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-4">{problem.title}</h1>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${CATEGORY_COLORS[problem.category]}`}>
                {problem.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${STATUS_COLORS[problem.status]}`}>
                {problem.status}
              </span>
            </div>

            <div className="space-y-2 text-muted-foreground mb-6">
              <p>📍 Location: {problem.location}</p>
              <p>📅 Reported: {createdDate}</p>
            </div>

            {userRole === "admin" && (
              <div className="bg-gray-50 rounded-lg p-4 border border-border mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">Update Status (Admin Only)</label>
                <select
                  value={problem.status}
                  onChange={(e) => {
                    storageService.updateProblemStatus(problem.id, e.target.value as Problem["status"])
                    setRefreshTrigger((prev) => prev + 1)
                  }}
                  className="w-full md:w-64 px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Solved">Solved</option>
                </select>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Description</h2>
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">{problem.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <CommentSection
              problemId={problem.id}
              comments={problem.comments}
              onCommentAdded={() => setRefreshTrigger((prev) => prev + 1)}
            />

            <NGOResponseSection
              problemId={problem.id}
              ngoResponses={problem.ngoResponses}
              onResponseAdded={() => setRefreshTrigger((prev) => prev + 1)}
            />
          </div>

          <div className="bg-white rounded-lg border border-border p-6 h-fit">
            <h3 className="font-bold text-foreground mb-4">Problem Summary</h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-muted-foreground font-medium">Category</p>
                <p className="text-foreground">{problem.category}</p>
              </div>
              <div>
                <p className="text-muted-foreground font-medium">Status</p>
                <p className={`font-semibold ${STATUS_COLORS[problem.status]}`}>{problem.status}</p>
              </div>
              <div>
                <p className="text-muted-foreground font-medium">Location</p>
                <p className="text-foreground">{problem.location}</p>
              </div>
              <div>
                <p className="text-muted-foreground font-medium">Comments</p>
                <p className="text-foreground">{problem.comments.length}</p>
              </div>
              <div>
                <p className="text-muted-foreground font-medium">NGO Responses</p>
                <p className="text-foreground">{problem.ngoResponses.length}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
