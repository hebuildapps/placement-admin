"use client"

import { useState, useEffect } from "react"

export function useSessionStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const [isLoaded, setIsLoaded] = useState(false)

  // Initialize from sessionStorage on mount
  useEffect(() => {
    try {
      const item = typeof window !== "undefined" ? window.sessionStorage.getItem(key) : null
      if (item) {
        setStoredValue(JSON.parse(item))
      }
    } catch (error) {
      console.error("[v0] Error reading from sessionStorage:", error)
    } finally {
      setIsLoaded(true)
    }
  }, [key])

  // Update sessionStorage when value changes
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error("[v0] Error writing to sessionStorage:", error)
    }
  }

  return [storedValue, setValue, isLoaded] as const
}
