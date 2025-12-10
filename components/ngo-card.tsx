"use client"

import Link from "next/link"
import type { Problem } from "@/lib/storage"

interface NGOCardProps {
  problem: Problem
  hasResponded: boolean
}

const CATEGORY_COLORS: Record<Problem["category"], string> = {
  Road: "bg-blue-100 text-blue-800",
  Water: "bg-cyan-100 text-cyan-800",
  Health: "bg-red-100 text-red-800",
  Education: "bg-green-100 text-green-800",
  Sanitation: "bg-purple-100 text-purple-800",
  Electricity: "bg-yellow-100 text-yellow-800",
  Other: "bg-gray-100 text-gray-800",
}

const PRIORITY_COLORS: Record<Problem["status"], string> = {
  Pending: "ring-2 ring-orange-500",
  "In Progress": "ring-2 ring-blue-500",
  Solved: "ring-2 ring-green-500",
}

export function NGOCard({ problem, hasResponded }: NGOCardProps) {
  return (
    <Link href={`/problems/${problem.id}`}>
      <div
        className={`bg-white rounded-lg border border-border hover:border-primary/50 hover:shadow-lg transition cursor-pointer h-full ${hasResponded ? PRIORITY_COLORS[problem.status] : ""}`}
      >
        {problem.image && (
          <div className="h-32 bg-gray-200 overflow-hidden rounded-t-lg">
            <img src={problem.image || "/placeholder.svg"} alt={problem.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-lg text-foreground flex-1 line-clamp-2">{problem.title}</h3>
            {hasResponded && (
              <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded">✓ Responded</span>
            )}
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{problem.description}</p>

          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`px-2 py-1 rounded text-xs font-medium ${CATEGORY_COLORS[problem.category]}`}>
              {problem.category}
            </span>
          </div>

          <div className="text-xs text-muted-foreground space-y-1">
            <p>📍 {problem.location}</p>
            <p>
              💬 {problem.comments.length} comments • 🤝 {problem.ngoResponses.length} NGO responses
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
