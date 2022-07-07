import "../styles/globals.scss"
import type {AppProps} from "next/app"
import React, {useEffect, useState} from "react"
import "swiper/css/bundle"
import {Layout} from "components/layout"
import {AppContext} from "components/AppContext"
import {Gaknime} from "lib/types"
import Head from "next/head"
import Script from 'next/script';

const MyApp = ({Component, pageProps}: AppProps) => {
    const [darkMode, setDarkMode] = useState(
        typeof window !== "undefined" ? !!localStorage.getItem("__darkmode") : false
    )
    const [isMobile, setIsMobile] = useState(false)
    const [hideWarn, setHideWarn] = useState(
        typeof window !== "undefined" ? !!localStorage.getItem("__hideWarn") : false
    )

    const [gaknimes, setGaknimes] = useState<Gaknime[]>([])

    useEffect(() => {
        if (darkMode) {
            document.body.classList.remove("theme-light")
            document.body.classList.add("theme-dark")
        } else {
            document.body.classList.remove("theme-dark")
            document.body.classList.add("theme-light")
        }
    }, [darkMode])

    useEffect(() => {
        ;(async () => {
            const json = await (await fetch("/gaknimes.json")).json()
            setGaknimes(json)
        })()

        const listener = () => {
            setIsMobile(window.innerWidth <= 768);
        }

        listener();

        window.addEventListener('resize', listener)

        return () => {
            window.removeEventListener('resize', listener);
        }
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
                isMobile: isMobile,
                setIsMobile: setIsMobile,
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
                <link rel="icon" href="/favicon.png"/>
                <link rel="shortcut icon" href="/favicon.png"/>

                <meta property="og:type" content="website"/>
                <meta property="og:title" content="각프텔"/>
                <meta property="description" content="각니메들을 손쉽게 플레이리스트로 스트리밍하세요."/>
                <meta property="og:description" content="각니메들을 손쉽게 플레이리스트로 스트리밍하세요."/>
                <meta property="og:image" content="/favicon.png"/>
                <meta name="theme-color" content="#eeee00"/>
                <meta property="twitter:creator" content="@dytro_dev"/>
                <meta name="keywords" content="각별, 각니메, 각프텔"/>

                <script async src="https://www.googletagmanager.com/gtag/js?id=G-XYB2R9CF72"></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
                    }}
                />
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AppContext.Provider>
    )
}

export default MyApp
