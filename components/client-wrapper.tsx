"use client"

import type { ReactNode } from "react"
import { AppProvider } from "@/lib/context"

export function ClientWrapper({ children }: { children: ReactNode }) {
  return <AppProvider>{children}</AppProvider>
}
