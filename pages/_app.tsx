import "../styles/globals.scss"
import type { AppProps } from "next/app"
import React from "react"
import "swiper/css/bundle"
import { Layout } from "components/layout"
import Swiper, { Autoplay } from "swiper"

Swiper.use([Autoplay])

const MyApp = ({ Component, pageProps }: AppProps) => {
  React.useEffect(() => {
    document.body.classList.add("theme-light")
  })

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
