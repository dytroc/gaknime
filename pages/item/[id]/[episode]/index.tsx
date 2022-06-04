import { AppContext } from "components/AppContext"
import { GaknimeItem } from "components/GaknimeItem"
import { motion } from "framer-motion"
import { useGaknimes } from "lib/client"
import { loadGaknimes } from "lib/data"
import { Episode } from "lib/types"
import _ from "lodash"
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Link from "next/link"
import Router, { useRouter } from "next/router"
import React from "react"
import { FaArrowLeft } from "react-icons/fa"
import YouTube from "react-youtube"
import styled from "styled-components"
import { Swiper, SwiperSlide } from "swiper/react"

const SkipButton = styled.div`
  padding: 8px 24px;
  position: absolute;
  color: #000;
  background: #fff;
  bottom: 48px;
  right: 48px;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    filter: brightness(0.7);
  }
`

const Overlay = styled.div`
  z-index: 99999;

  opacity: 0;

  width: 0;
  height: 0;

  transition: all ease 0.2s;
`

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #000;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;

  &:hover ${Overlay} {
    opacity: 1;
  }
`

const ShowNextButton = styled(motion.div)`
  position: absolute;
  right: 48px;
  bottom: 48px;
  color: #fff;
  background: #313131;
  padding: 12px;
  border-radius: 24px;
  cursor: pointer;
  display: flex;
  gap: 12px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;

    right: 50%;

    transform: translateX(50%);

    width: calc(100% - 48px);

    max-width: 300px;

    img {
      width: 100% !important;
    }
  }

  &:hover {
    background: #585858;
  }
`

const ShowMore: React.FC<{ episode: Episode; next: () => void }> = ({
  episode,
  next,
}) => {
  const [remainingTime, setRemainingTime] = React.useState(10)

  const router = useRouter()

  const nextVideo = React.useCallback(() => {
    router.push(
      `/item/[id]/[episode]`,
      `/item/${router.query.id}/${
        parseInt(router.query.episode as string) + 1
      }`,
      { shallow: true }
    )
    next()
  }, [next, router])

  React.useEffect(() => {
    if (remainingTime === 0) {
      nextVideo()
      return
    }

    const timeout = setTimeout(() => {
      setRemainingTime(remainingTime - 1)
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [nextVideo, remainingTime])

  return (
    <ShowNextButton
      onClick={nextVideo}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${episode.code}/original.jpg`}
        alt="thumbnail"
        style={{
          borderRadius: 12,
          aspectRatio: "16 / 9",
          width: 240,
        }}
        draggable="false"
      />
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 300 }}>
        <div style={{ fontSize: 24, color: "#fff", fontWeight: 700 }}>
          다음화
        </div>
        <div style={{ fontSize: 16, color: "#ddd" }}>{episode.title}</div>
        <div style={{ flexGrow: 1 }} />
        <div style={{ color: "#fff", fontSize: 20 }}>
          <span style={{ color: "#b499ff" }}>{remainingTime}</span> 초 후 다음
          영상으로 넘어갑니다
        </div>
      </div>
    </ShowNextButton>
  )
}

const EpisodePlayer: React.FC = () => {
  const router = useRouter()

  const gaknime = useGaknimes().find(
    (x) => x.id === parseInt(router.query.id as string)
  )

  const episode =
    gaknime?.episodes[parseInt(router.query.episode as string) - 1]
  const app = React.useContext(AppContext)

  const containerRef = React.useRef<HTMLDivElement>(null)

  const [width, setWidth] = React.useState<number | "auto">(0)

  const [height, setHeight] = React.useState<number | "auto">(0)

  const [showSafety, setShowSafety] = React.useState(!app.hideWarn)

  const [showNext, setShowNext] = React.useState(false)

  React.useEffect(() => {
    if (containerRef.current) {
      const observer = new ResizeObserver((entries) => {
        const rect = entries[0].contentRect

        const scale = Math.min(rect.width / 1920, rect.height / 1080)

        setWidth(1920 * scale)
        setHeight(1080 * scale)
      })

      observer.observe(containerRef.current)

      return () => observer.disconnect()
    }
  }, [])

  if (!gaknime || !episode) {
    if (typeof window !== "undefined") {
      router.push("/")
    }

    return null
  }

  return (
    <Container ref={containerRef}>
      <Head>
        <title>{gaknime.title} 다시보기 - 각프텔</title>
      </Head>
      <Overlay>
        <Link
          href={`/?itemId=${router.query.id}`}
          as={`/item/${router.query.id}`}
          passHref
        >
          <a
            style={{
              color: "#fff",
              position: "absolute",
              left: 48,
              top: 48,
              padding: 8,
              background: `rgba(0, 0, 0, 0.4)`,
              display: "flex",
              borderRadius: 100,
              cursor: "pointer",
            }}
          >
            <FaArrowLeft size={32} />
          </a>
        </Link>
        {showSafety && (
          <SkipButton onClick={() => setShowSafety(false)}>스킵하기</SkipButton>
        )}
      </Overlay>
      {showSafety && (
        <div>
          <video
            autoPlay
            onEnded={() => {
              setShowSafety(false)
            }}
            style={{ width, height }}
            src="/videos/safety.mp4"
          ></video>
        </div>
      )}
      {episode && !showSafety && !showNext && (
        <YouTube
          opts={{
            width,
            height,
            playerVars: {
              autoplay: 1,
            },
          }}
          videoId={episode.code}
          onEnd={() => {
            setShowNext(true)
          }}
        />
      )}
      {showNext
        ? (() => {
            const nextEpisode =
              gaknime!.episodes[gaknime!.episodes.indexOf(episode!) + 1]

            if (!nextEpisode) return

            return (
              <ShowMore
                next={() => {
                  setShowNext(false)
                }}
                episode={nextEpisode}
              />
            )
          })() || <ShowOthers />
        : null}
    </Container>
  )
}

const ShowOthers: React.FC = () => {
  const router = useRouter()

  const gaknimes = useGaknimes()

  const selected = React.useMemo(() => {
    const filtered = gaknimes.filter(
      (x) => x.id !== parseInt(router.query.id as string)
    )
    return _.sampleSize(filtered, 10)
  }, [gaknimes, router.query.id])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        width: "100%",
        position: "absolute",
        color: "#fff",
        bottom: 0,
        padding: 24,
      }}
    >
      <div style={{ fontSize: 24, color: "#fff", fontWeight: 700 }}>
        다른 각니메도 보기
      </div>
      <div style={{ marginTop: 12 }}>
        <Swiper slidesPerView="auto" spaceBetween={16}>
          {selected.map((x, i) => (
            <SwiperSlide style={{ width: 200 }} key={i}>
              <div style={{ width: 200 }}>
                <GaknimeItem
                  gaknime={x}
                  textStyle={{ color: "#fff", fontSize: 16 }}
                  onClick={() => {
                    console.log("play", x)
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const out: string[] = []

  const gaknimes = await loadGaknimes()

  for (const gaknime of gaknimes) {
    out.push(...gaknime.episodes.map((x, i) => `/item/${gaknime.id}/${i}`))
  }

  return {
    paths: out,
    fallback: false,
  }
}

export default EpisodePlayer
