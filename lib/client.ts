import { AppContext } from "components/AppContext"
import React from "react"

export const useGaknimes = () => {
    return React.useContext(AppContext).gaknimes
  }