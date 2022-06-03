import "../styles/globals.scss"
import type { AppProps } from "next/app"
import React from "react"
import "swiper/css/bundle"

const MyApp = ({ Component, pageProps }: AppProps) => {
  React.useEffect(() => {
    document.body.classList.add("theme-light")
  })

  return <Component {...pageProps} />
}

export default MyApp
