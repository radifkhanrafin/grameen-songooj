"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type UserRole = "villager" | "admin" | "ngo"

interface AppContextType {
  userRole: UserRole
  setUserRole: (role: UserRole) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [userRole, setUserRole] = useState<UserRole>("villager")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedRole = localStorage.getItem("grameen_user_role") as UserRole
    if (savedRole) {
      setUserRole(savedRole)
    }
  }, [])

  const handleSetUserRole = (role: UserRole) => {
    setUserRole(role)
    localStorage.setItem("grameen_user_role", role)
  }

  return <AppContext.Provider value={{ userRole, setUserRole: handleSetUserRole }}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider")
  }
  return context
}
