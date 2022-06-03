import React from "react"

export const useForceRefresh =() => {
    const [, set] = React.useState(false)
    return () => set(v => !v)
}