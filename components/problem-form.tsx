"use client"

import type React from "react"

import { useState, useRef } from "react"
import { storageService, type Problem } from "@/lib/storage"

interface ProblemFormProps {
  onSuccess?: (problem: Problem) => void
}

const CATEGORIES: Problem["category"][] = ["Road", "Water", "Health", "Education", "Sanitation", "Electricity", "Other"]

export function ProblemForm({ onSuccess }: ProblemFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Road" as Problem["category"],
    location: "",
    image: null as string | null,
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const base64String = event.target?.result as string
        setFormData((prev) => ({ ...prev, image: base64String }))
        setImagePreview(base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.description.trim() || !formData.location.trim()) {
      alert("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    try {
      const newProblem = storageService.addProblem({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        location: formData.location,
        image: formData.image,
        status: "Pending",
        comments: [],
        ngoResponses: [],
      })

      alert("Problem reported successfully!")
      setFormData({
        title: "",
        description: "",
        category: "Road",
        location: "",
        image: null,
      })
      setImagePreview(null)
      onSuccess?.(newProblem)
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Error reporting problem. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-border p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Report a Problem</h2>

      <div className="space-y-5">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
            Problem Title *
          </label>
          <input
            id="title"
            type="text"
            placeholder="e.g., Broken road near the school"
            value={formData.title}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            maxLength={100}
          />
          <p className="text-xs text-muted-foreground mt-1">{formData.title.length}/100 characters</p>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
            Description *
          </label>
          <textarea
            id="description"
            placeholder="Describe the problem in detail..."
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            rows={4}
            maxLength={500}
          />
          <p className="text-xs text-muted-foreground mt-1">{formData.description.length}/500 characters</p>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
            Category *
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value as Problem["category"] }))}
            className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-foreground mb-2">
            Location *
          </label>
          <input
            id="location"
            type="text"
            placeholder="e.g., Mirpur, Dhaka"
            value={formData.location}
            onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
            className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            maxLength={100}
          />
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-foreground mb-2">
            Upload Photo (Optional)
          </label>
          <input
            ref={fileInputRef}
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full px-4 py-3 border-2 border-dashed border-border rounded-lg hover:border-primary hover:bg-primary/5 transition text-muted-foreground hover:text-foreground"
          >
            {imagePreview ? "Change Photo" : "Click to Upload Photo"}
          </button>
          {imagePreview && (
            <div className="mt-4 relative">
              <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="max-h-64 w-auto rounded-lg" />
              <button
                type="button"
                onClick={() => {
                  setImagePreview(null)
                  setFormData((prev) => ({ ...prev, image: null }))
                }}
                className="mt-2 px-3 py-1 bg-destructive text-destructive-foreground rounded text-sm hover:bg-destructive/90"
              >
                Remove Image
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit Report"}
        </button>
      </div>
    </form>
  )
}
