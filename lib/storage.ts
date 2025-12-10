// LocalStorage management for problems, comments, and NGO responses
export interface Comment {
  id: string
  user: string
  message: string
  timestamp: number
}

export interface NGOResponse {
  id: string
  ngoName: string
  message: string
  status: "Will Visit" | "Visited" | "Resolved"
  timestamp: number
}

export interface Problem {
  id: string
  title: string
  description: string
  category: "Road" | "Water" | "Health" | "Education" | "Sanitation" | "Electricity" | "Other"
  location: string
  image: string | null
  status: "Pending" | "In Progress" | "Solved"
  comments: Comment[]
  ngoResponses: NGOResponse[]
  createdAt: number
  updatedAt: number
}

const STORAGE_KEY = "grameen_songjog_problems"

export const storageService = {
  // Get all problems
  getAllProblems: (): Problem[] => {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  },

  // Get single problem by ID
  getProblemById: (id: string): Problem | null => {
    const problems = storageService.getAllProblems()
    return problems.find((p) => p.id === id) || null
  },

  // Add new problem
  addProblem: (problem: Omit<Problem, "id" | "createdAt" | "updatedAt">): Problem => {
    const problems = storageService.getAllProblems()
    const newProblem: Problem = {
      ...problem,
      id: Date.now().toString(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    problems.push(newProblem)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(problems))
    return newProblem
  },

  // Update problem status
  updateProblemStatus: (id: string, status: Problem["status"]): Problem | null => {
    const problems = storageService.getAllProblems()
    const problem = problems.find((p) => p.id === id)
    if (problem) {
      problem.status = status
      problem.updatedAt = Date.now()
      localStorage.setItem(STORAGE_KEY, JSON.stringify(problems))
      return problem
    }
    return null
  },

  // Add comment to problem
  addComment: (problemId: string, comment: Omit<Comment, "id" | "timestamp">): Comment | null => {
    const problems = storageService.getAllProblems()
    const problem = problems.find((p) => p.id === problemId)
    if (problem) {
      const newComment: Comment = {
        ...comment,
        id: Date.now().toString(),
        timestamp: Date.now(),
      }
      problem.comments.push(newComment)
      problem.updatedAt = Date.now()
      localStorage.setItem(STORAGE_KEY, JSON.stringify(problems))
      return newComment
    }
    return null
  },

  // Add NGO response
  addNGOResponse: (problemId: string, response: Omit<NGOResponse, "id" | "timestamp">): NGOResponse | null => {
    const problems = storageService.getAllProblems()
    const problem = problems.find((p) => p.id === problemId)
    if (problem) {
      const newResponse: NGOResponse = {
        ...response,
        id: Date.now().toString(),
        timestamp: Date.now(),
      }
      problem.ngoResponses.push(newResponse)
      problem.updatedAt = Date.now()
      localStorage.setItem(STORAGE_KEY, JSON.stringify(problems))
      return newResponse
    }
    return null
  },

  // Delete problem
  deleteProblem: (id: string): boolean => {
    const problems = storageService.getAllProblems()
    const index = problems.findIndex((p) => p.id === id)
    if (index > -1) {
      problems.splice(index, 1)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(problems))
      return true
    }
    return false
  },

  // Get problems by category
  getProblemsByCategory: (category: Problem["category"]): Problem[] => {
    return storageService.getAllProblems().filter((p) => p.category === category)
  },

  // Get problems by status
  getProblemsByStatus: (status: Problem["status"]): Problem[] => {
    return storageService.getAllProblems().filter((p) => p.status === status)
  },

  // Initialize with demo data
  initializeDemoData: (): void => {
    const problems = storageService.getAllProblems()
    if (problems.length === 0) {
      const demoProblem: Problem = {
        id: "1",
        title: "Broken Road Near School",
        description:
          "The main road leading to the school is severely damaged. Vehicles frequently get stuck, and it causes accidents during rainy season.",
        category: "Road",
        location: "Mirpur, Dhaka",
        image: null,
        status: "Pending",
        comments: [
          {
            id: "1",
            user: "Villager",
            message: "This is dangerous for our children!",
            timestamp: Date.now() - 3600000,
          },
        ],
        ngoResponses: [],
        createdAt: Date.now() - 86400000,
        updatedAt: Date.now() - 86400000,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify([demoProblem]))
    }
  },
}
