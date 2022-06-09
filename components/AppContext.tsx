import {Gaknime} from "lib/types"
import {createContext} from "react"

export const AppContext = createContext<{
    darkMode: boolean,
    isMobile: boolean,
    setDarkMode: (v: boolean) => void
    setIsMobile: (v: boolean) => void
    hideWarn: boolean
    setHideWarn: (v: boolean) => void
    gaknimes: Gaknime[]
}>({
    darkMode: false,
    isMobile: false,
    setDarkMode: (_: boolean) => null,
    setIsMobile: (_: boolean) => null,
    hideWarn: false,
    setHideWarn: (_: boolean) => null,
    gaknimes: [],
})
