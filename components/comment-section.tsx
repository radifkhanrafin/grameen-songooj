"use client"

import type React from "react"
import { useState } from "react"
import { storageService, type Comment } from "@/lib/storage"

interface CommentSectionProps {
  problemId: string
  comments: Comment[]
  onCommentAdded?: () => void
}

export function CommentSection({ problemId, comments, onCommentAdded }: CommentSectionProps) {
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim()) {
      alert("Please enter a comment")
      return
    }

    setIsSubmitting(true)

    try {
      storageService.addComment(problemId, {
        user: "Villager",
        message: message.trim(),
      })

      setMessage("")
      onCommentAdded?.()
    } catch (error) {
      console.error("Error adding comment:", error)
      alert("Error adding comment")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-foreground">Comments ({comments.length})</h3>

      <form onSubmit={handleSubmitComment} className="bg-gray-50 rounded-lg p-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Add a comment..."
          className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          rows={3}
          maxLength={300}
        />
        <div className="flex justify-between items-center mt-3">
          <p className="text-xs text-muted-foreground">{message.length}/300 characters</p>
          <button
            type="submit"
            disabled={isSubmitting || !message.trim()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            {isSubmitting ? "Posting..." : "Post Comment"}
          </button>
        </div>
      </form>

      <div className="space-y-3">
        {comments.length === 0 ? (
          <p className="text-center text-muted-foreground py-6 text-sm">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <span className="font-medium text-sm text-foreground">{comment.user}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(comment.timestamp).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="text-sm text-foreground break-words">{comment.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
