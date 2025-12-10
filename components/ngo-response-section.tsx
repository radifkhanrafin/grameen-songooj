"use client"

import type React from "react"
import { useState } from "react"
import { storageService, type NGOResponse } from "@/lib/storage"
import { useAppContext } from "@/lib/context"

interface NGOResponseSectionProps {
  problemId: string
  ngoResponses: NGOResponse[]
  onResponseAdded?: () => void
}

const RESPONSE_STATUS_COLORS: Record<NGOResponse["status"], string> = {
  "Will Visit": "bg-blue-100 text-blue-800",
  Visited: "bg-purple-100 text-purple-800",
  Resolved: "bg-green-100 text-green-800",
}

export function NGOResponseSection({ problemId, ngoResponses, onResponseAdded }: NGOResponseSectionProps) {
  const { userRole } = useAppContext()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    ngoName: "",
    message: "",
    status: "Will Visit" as NGOResponse["status"],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.ngoName.trim() || !formData.message.trim()) {
      alert("Please fill in all fields")
      return
    }

    setIsSubmitting(true)

    try {
      storageService.addNGOResponse(problemId, {
        ngoName: formData.ngoName,
        message: formData.message,
        status: formData.status,
      })

      setFormData({ ngoName: "", message: "", status: "Will Visit" })
      setShowForm(false)
      onResponseAdded?.()
    } catch (error) {
      console.error("Error adding NGO response:", error)
      alert("Error adding response")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-foreground">NGO Responses ({ngoResponses.length})</h3>
        {userRole === "ngo" && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/90 transition"
          >
            {showForm ? "Cancel" : "I Want to Help"}
          </button>
        )}
      </div>

      {showForm && userRole === "ngo" && (
        <form onSubmit={handleSubmit} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">NGO/Organization Name</label>
              <input
                type="text"
                value={formData.ngoName}
                onChange={(e) => setFormData((prev) => ({ ...prev, ngoName: e.target.value }))}
                placeholder="Enter your organization name"
                className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                maxLength={100}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Response Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as NGOResponse["status"] }))}
                className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              >
                <option value="Will Visit">Will Visit</option>
                <option value="Visited">Visited</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Your Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                placeholder="Describe what you will do or have done..."
                className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none text-sm"
                rows={3}
                maxLength={300}
              />
              <p className="text-xs text-muted-foreground mt-1">{formData.message.length}/300 characters</p>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
              >
                {isSubmitting ? "Submitting..." : "Submit Response"}
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {ngoResponses.length === 0 ? (
          <p className="text-center text-muted-foreground py-6 text-sm">
            No NGO responses yet. {userRole === "ngo" ? "Be the first to help!" : "Waiting for NGOs to respond"}
          </p>
        ) : (
          ngoResponses.map((response) => (
            <div key={response.id} className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="font-medium text-foreground">{response.ngoName}</span>
                  <span
                    className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${RESPONSE_STATUS_COLORS[response.status]}`}
                  >
                    {response.status}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(response.timestamp).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="text-sm text-foreground break-words">{response.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
