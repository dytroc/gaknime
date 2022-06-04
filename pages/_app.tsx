import "../styles/globals.scss"
import type { AppProps } from "next/app"
import React from "react"
import "swiper/css/bundle"
import { Layout } from "components/layout"
import { AppContext } from "components/AppContext"
import { Gaknime } from "lib/types"
import Head from "next/head"

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [darkMode, setDarkMode] = React.useState(
    typeof window !== "undefined" ? !!localStorage.getItem("__darkmode") : false
  )
  const [hideWarn, setHideWarn] = React.useState(
    typeof window !== "undefined" ? !!localStorage.getItem("__hideWarn") : false
  )

  const [gaknimes, setGaknimes] = React.useState<Gaknime[]>([])

  React.useEffect(() => {
    if (darkMode) {
      document.body.classList.remove("theme-light")
      document.body.classList.add("theme-dark")
    } else {
      document.body.classList.remove("theme-dark")
      document.body.classList.add("theme-light")
    }
  }, [darkMode])

  React.useEffect(() => {
    ;(async () => {
      const json = await (await fetch("/gaknimes.json")).json()
      setGaknimes(json)
    })()
  }, [])

  return (
    <AppContext.Provider
      value={{
        darkMode: darkMode,
        setDarkMode: (v: boolean) => {
          setDarkMode(v)
          if (v) {
            localStorage.setItem("__darkmode", "1")
          } else {
            localStorage.removeItem("__darkmode")
          }
        },
        hideWarn: hideWarn,
        setHideWarn: (v) => {
          setHideWarn(v)
          if (v) {
            localStorage.setItem("__hideWarn", "1")
          } else {
            localStorage.removeItem("__hideWarn")
          }
        },
        gaknimes,
      }}
    >
      <Head>
        <title>각프텔 - 각니메 스트리밍</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      {(gaknimes.length && (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )) ||
        null}
    </AppContext.Provider>
  )
}

export default MyApp
