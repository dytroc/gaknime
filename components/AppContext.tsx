import React from "react"

export const AppContext = React.createContext<{
  darkMode: boolean
  setDarkMode: (v: boolean) => void
  hideWarn: boolean
  setHideWarn: (v: boolean) => void
}>({
  darkMode: false,
  setDarkMode: (_: boolean) => null,
  hideWarn: false,
  setHideWarn: (_: boolean) => null,
})
