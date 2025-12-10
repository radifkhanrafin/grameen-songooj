"use client"

import { useState, useEffect } from "react"

export function useSyncedState<T>(initializer: () => T, dependencies: any[] = []) {
  const [state, setState] = useState<T | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setState(initializer())
  }, dependencies)

  return state !== null ? state : initializer()
}
