"use client"

import Link from "next/link"
import type { Problem } from "@/lib/storage"

interface AdminTableProps {
  problems: Problem[]
  onStatusChange?: (id: string, status: Problem["status"]) => void
}

const STATUS_COLORS: Record<Problem["status"], string> = {
  Pending: "bg-orange-100 text-orange-800",
  "In Progress": "bg-blue-100 text-blue-800",
  Solved: "bg-green-100 text-green-800",
}

const CATEGORY_COLORS: Record<Problem["category"], string> = {
  Road: "bg-blue-50 text-blue-700",
  Water: "bg-cyan-50 text-cyan-700",
  Health: "bg-red-50 text-red-700",
  Education: "bg-green-50 text-green-700",
  Sanitation: "bg-purple-50 text-purple-700",
  Electricity: "bg-yellow-50 text-yellow-700",
  Other: "bg-gray-50 text-gray-700",
}

export function AdminTable({ problems, onStatusChange }: AdminTableProps) {
  return (
    <div className="bg-white rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Problem</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Category</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Location</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Comments</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">NGO Response</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {problems.map((problem) => (
              <tr key={problem.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <Link href={`/problems/${problem.id}`} className="text-primary hover:underline font-medium">
                    {problem.title.substring(0, 30)}
                    {problem.title.length > 30 ? "..." : ""}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${CATEGORY_COLORS[problem.category]}`}>
                    {problem.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">{problem.location}</td>
                <td className="px-6 py-4">
                  <select
                    value={problem.status}
                    onChange={(e) => onStatusChange?.(problem.id, e.target.value as Problem["status"])}
                    className={`px-3 py-1 rounded text-xs font-medium border border-gray-200 ${STATUS_COLORS[problem.status]} cursor-pointer`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Solved">Solved</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-sm text-foreground font-medium">{problem.comments.length}</td>
                <td className="px-6 py-4 text-sm text-foreground font-medium">{problem.ngoResponses.length}</td>
                <td className="px-6 py-4">
                  <Link
                    href={`/problems/${problem.id}`}
                    className="px-3 py-1 bg-primary text-primary-foreground rounded text-xs font-medium hover:bg-primary/90 transition inline-block"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {problems.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No problems found</p>
        </div>
      )}
    </div>
  )
}
