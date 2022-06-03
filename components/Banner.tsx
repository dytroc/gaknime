import { Banner as BannerType } from "lib/types"
import React from "react"
import styled from "styled-components"
import { Swiper, SwiperSlide, useSwiper } from "swiper/react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { useForceRefresh } from "lib/hooks"

const Root = styled.div`
  position: relative;
  aspect-ratio: 2.5;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    aspect-ratio: unset;
    height: 100vh;
  }
`

const Container = styled.div<{ directory: string }>`
  cursor: pointer;
  aspect-ratio: 2.5;
  @media screen and (max-width: 768px) {
    aspect-ratio: unset;
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column-reverse;
    justify-content: center;

    gap: 24px;

    padding: 24px;
  }
  width: 3200px;
  background-image: url(/banners/${({ directory }) => directory}/banner.png);
  background-size: cover;
  background-position: center;
  position: relative;
`

const Logo = styled.img`
  position: absolute;
  bottom: 40%;
  left: 2%;
  width: 45%;
  user-select: none;

  @media screen and (max-width: 768px) {
    position: static;
    left: unset;
    top: unset;
    width: 100%;
  }
`

const Phrase = styled.div`
  color: var(--primary-color);

  font-size: 80px;
  font-weight: bold;

  position: absolute;

  bottom: 25%;
  left: 3%;

  text-shadow: var(--text-shadow-color) 0 0 0.2vw;

  @media screen and (max-width: 768px) {
    position: static;
    font-size: 6vw;
  }
`

const WatchButton = styled.div`
  color: var(--primary-contrast-color);
  font-size: 41.6px;
  font-weight: bold;

  position: absolute;

  bottom: 15%;
  left: 3%;

  background: var(--primary-color);
  width: 288px;
  height: 96px;
  line-height: 96px;

  text-align: center;
  border-radius: 9.6px;

  &:hover {
    background: #ccc;
  }

  @media screen and (max-width: 768px) {
    position: static;
    font-size: 4vw;
    width: fit-content;
    height: fit-content;
    line-height: normal;
    padding: 12px;
  }
`

const Navigation: React.FC = () => {
  const swiper = useSwiper()
  const update = useForceRefresh()

  React.useEffect(() => {
    const callback = () => {
      update()
    }
    swiper.on("slideChange", callback)
    return () => {
      swiper.off("slideChange", callback)
    }
  }, [swiper, update])

  return (
    <div className="container">
      <style jsx>{`
        .container {
          z-index: 1000;
          top: 0;
          left: 0;
          height: 100%;
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          pointer-events: none;
        }

        @media screen and (max-width: 768px) {
          .container {
            height: fit-content;
            bottom: 24px;
            padding: 0 12px;
            top: auto;
          }

          .icon {
            width: 24px !important;
            height: 24px !important;
          }
        }

        .icon {
          pointer-events: auto;
          color: rgba(255, 255, 255, 0.6);
          transition: all ease 0.2s;
          cursor: pointer;
          width: 60px;
          height: 60px;
        }

        .icon:hover {
          color: #fff;
        }
      `}</style>
      {(!swiper.isBeginning && (
        <div
          className="icon"
          onClick={() => {
            swiper.slidePrev()
          }}
        >
          <FaChevronLeft size="100%" />
        </div>
      )) || <div />}
      {(!swiper.isEnd && (
        <div
          onClick={() => {
            swiper.slideNext()
          }}
          className="icon"
        >
          <FaChevronRight size="100%" />
        </div>
      )) || <div />}
    </div>
  )
}

const Pagination: React.FC = () => {
  const swiper = useSwiper()
  const update = useForceRefresh()

  React.useEffect(() => {
    const callback = () => {
      update()
    }
    swiper.on("slideChange", callback)
    return () => {
      swiper.off("slideChange", callback)
    }
  }, [swiper, update])

  return (
    <div className="container">
      <style jsx>{`
        .container {
          z-index: 1000;
          position: absolute;
          gap: 24px;
          display: flex;
          align-items: center;
          pointer-events: none;
          bottom: 48px;
          right: 48px;
        }

        @media screen and (max-width: 768px) {
          .dot {
            width: 16px !important;
            height: 16px !important;
          }
          .container {
            gap: 12px !important;
            left: 48px !important;
            right: auto !important;
            bottom: 28px;
          }
        }

        .dot {
          pointer-events: auto;
          background: rgba(255, 255, 255, 0.6);
          transition: all ease 0.2s;
          cursor: pointer;
          width: 48px;
          height: 48px;
          border-radius: 24px;
        }

        .dot:hover {
          background: #fff;
        }
      `}</style>
      {swiper.slides.map((_, i) => (
        <div
          onClick={() => {
            swiper.slideTo(i)
          }}
          key={i}
          style={{ background: swiper.activeIndex === i ? "#fff" : "" }}
          className="dot"
        />
      ))}
    </div>
  )
}

const StyledSwiper = styled(Swiper)`
  width: 3200px;
  height: 1280px;
  transform-origin: left top;

  @media screen and (max-width: 768px) {
    aspect-ratio: unset;
    height: 100vh;
    width: 100vw;
    transform: scale(1) !important;
  }
`

export const Banner: React.FC<{ banners: BannerType[] }> = ({ banners }) => {
  const [scale, setScale] = React.useState(0)
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  React.useEffect(() => {
    if (containerRef.current) {
      const observer = new ResizeObserver((entry) => {
        const rect = entry[0].contentRect
        setScale(Math.min(rect.width / 3200))
      })

      observer.observe(containerRef.current)

      return () => {
        observer.disconnect()
      }
    }
  }, [setScale])

  return (
    <Root ref={(instance) => (containerRef.current = instance)}>
      <StyledSwiper
        autoplay={{ delay: 5000 }}
        style={{ transform: `scale(${scale})` }}
      >
        <Navigation />
        <Pagination />
        {banners.map((x, i) => (
          <SwiperSlide key={i}>
            <Container
              directory={x.directory}
              onClick={() => console.log("sans")}
            >
              <WatchButton>지금 보러가기</WatchButton>
              <Phrase>{x.catchPhrase}</Phrase>
              <Logo src={`/banners/${x.directory}/logo.png`} />
            </Container>
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </Root>
  )
}
