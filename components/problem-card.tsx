"use client"

import Link from "next/link"
import type { Problem } from "@/lib/storage"

interface ProblemCardProps {
  problem: Problem
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

const STATUS_COLORS: Record<Problem["status"], string> = {
  Pending: "bg-orange-100 text-orange-800",
  "In Progress": "bg-blue-100 text-blue-800",
  Solved: "bg-green-100 text-green-800",
}

export function ProblemCard({ problem }: ProblemCardProps) {
  const createdDate = new Date(problem.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <Link href={`/problems/${problem.id}`}>
      <div className="bg-white rounded-lg border border-border hover:border-primary/50 hover:shadow-lg transition cursor-pointer h-full">
        {problem.image && (
          <div className="h-40 bg-gray-200 overflow-hidden rounded-t-lg">
            <img src={problem.image || "/placeholder.svg"} alt={problem.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="p-4">
          <h3 className="font-bold text-lg text-foreground line-clamp-2 mb-2">{problem.title}</h3>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{problem.description}</p>

          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`px-2 py-1 rounded text-xs font-medium ${CATEGORY_COLORS[problem.category]}`}>
              {problem.category}
            </span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${STATUS_COLORS[problem.status]}`}>
              {problem.status}
            </span>
          </div>

          <div className="text-xs text-muted-foreground space-y-1">
            <p>📍 {problem.location}</p>
            <p>📅 {createdDate}</p>
            <p>
              💬 {problem.comments.length} comments • 🤝 {problem.ngoResponses.length} NGO responses
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
