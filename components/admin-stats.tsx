"use client"

import type { Problem } from "@/lib/storage"

interface AdminStatsProps {
  problems: Problem[]
}

export function AdminStats({ problems }: AdminStatsProps) {
  const totalProblems = problems.length
  const pending = problems.filter((p) => p.status === "Pending").length
  const inProgress = problems.filter((p) => p.status === "In Progress").length
  const solved = problems.filter((p) => p.status === "Solved").length
  const withNGOResponses = problems.filter((p) => p.ngoResponses.length > 0).length

  const stats = [
    { label: "Total Problems", value: totalProblems, color: "bg-blue-100 text-blue-800" },
    { label: "Pending", value: pending, color: "bg-orange-100 text-orange-800" },
    { label: "In Progress", value: inProgress, color: "bg-yellow-100 text-yellow-800" },
    { label: "Solved", value: solved, color: "bg-green-100 text-green-800" },
    { label: "NGO Responses", value: withNGOResponses, color: "bg-purple-100 text-purple-800" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
      {stats.map((stat) => (
        <div key={stat.label} className={`rounded-lg p-4 ${stat.color}`}>
          <p className="text-sm font-medium opacity-80">{stat.label}</p>
          <p className="text-3xl font-bold mt-1">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}
