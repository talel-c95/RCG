"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

const ThemeToggleButton = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  const applyTheme = (newTheme: "light" | "dark") => {
    document.documentElement.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    setTheme(newTheme)
  }

  const toggleTheme = () => {
    applyTheme(theme === "dark" ? "light" : "dark")
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    if (savedTheme) {
      applyTheme(savedTheme)
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      applyTheme(prefersDark ? "dark" : "light")
    }
  }, [])

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 
                 transition-all duration-300 group overflow-hidden"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
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
