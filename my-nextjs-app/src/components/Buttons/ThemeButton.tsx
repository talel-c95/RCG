"use client"

import { useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"

const ThemeToggleButton = () => {
  const { theme, toggleTheme, isReady } = useTheme()

  // Avoid hydration mismatch by not rendering icons until ready
  useEffect(() => {}, [])

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 
                 transition-all duration-300 group overflow-hidden"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      disabled={!isReady}
    >
      <div className="relative w-5 h-5">
        <Sun
          className={`absolute inset-0 w-5 h-5 text-amber-500 transition-all duration-500 transform
                     ${theme === "dark" ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`}
        />
        <Moon
          className={`absolute inset-0 w-5 h-5 text-blue-400 transition-all duration-500 transform
                     ${theme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`}
        />
      </div>
    </button>
  )
}

export default ThemeToggleButton
