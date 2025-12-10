"use client"

import type { Problem } from "@/lib/storage"

interface FilterBarProps {
  selectedCategory: Problem["category"] | "All"
  selectedStatus: Problem["status"] | "All"
  onCategoryChange: (category: Problem["category"] | "All") => void
  onStatusChange: (status: Problem["status"] | "All") => void
  searchTerm: string
  onSearchChange: (term: string) => void
}

const CATEGORIES: (Problem["category"] | "All")[] = [
  "All",
  "Road",
  "Water",
  "Health",
  "Education",
  "Sanitation",
  "Electricity",
  "Other",
]
const STATUSES: (Problem["status"] | "All")[] = ["All", "Pending", "In Progress", "Solved"]

export function FilterBar({
  selectedCategory,
  selectedStatus,
  onCategoryChange,
  onStatusChange,
  searchTerm,
  onSearchChange,
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-lg border border-border p-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Search Problems</label>
        <input
          type="text"
          placeholder="Search by title or location..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value as Problem["category"] | "All")}
            className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Status</label>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value as Problem["status"] | "All")}
            className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
