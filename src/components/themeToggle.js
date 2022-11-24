import React from "react"
import { ThemeToggler } from "gatsby-plugin-dark-mode"
import "../styles/slider.css"

export default function ThemeToggle() {
  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => (
        <div className="container pt-6 pb-12 md:pt-12">
          <label className="switch">
            <input
              type="checkbox"
              onChange={e => toggleTheme(e.target.checked ? "dark" : "light")}
              checked={theme === "dark"}
            />
            <span className="slider round"></span>
          </label>
        </div>
      )}
    </ThemeToggler>
  )
}
