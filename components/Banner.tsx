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

  --swiper-navigation-size: 60px;

  .swiper-button-next,
  .swiper-button-prev {
    &:not(:hover) {
      color: rgba(255, 255, 255, 0.6) !important;
    }

    &:hover {
      color: #fff;
    }
  }
`

const Container = styled.div<{ directory: string }>`
  cursor: pointer;
  aspect-ratio: 2.5;
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
`

const Phrase = styled.div`
  color: var(--primary-color);

  font-size: 80px;
  font-weight: bold;

  position: absolute;

  bottom: 25%;
  left: 3%;

  text-shadow: var(--text-shadow-color) 0 0 0.2vw;
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
  }, [swiper])

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

        .icon {
          pointer-events: auto;
          color: rgba(255, 255, 255, 0.6);
          transition: all ease 0.2s;
          cursor: pointer;
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
          <FaChevronLeft size={60} />
        </div>
      )) || <div />}
      {(!swiper.isEnd && (
        <div
          onClick={() => {
            swiper.slideNext()
          }}
          className="icon"
        >
          <FaChevronRight size={60} />
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
  }, [swiper])

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
  }, [setScale, containerRef.current])

  return (
    <Root ref={(instance) => (containerRef.current = instance)}>
      <Swiper
        style={{
          transform: `scale(${scale})`,
          width: 3200,
          height: 1280,
          transformOrigin: "left top",
        }}
      >
        <Navigation />
        <Pagination />
        {banners.map((x, i) => (
          <SwiperSlide key={i}>
            <Container
              directory={x.directory}
              onClick={() => console.log("sans")}
            >
              <Logo src={`/banners/${x.directory}/logo.png`} />
              <Phrase>{x.catchPhrase}</Phrase>
              <WatchButton>지금 보러가기</WatchButton>
            </Container>
          </SwiperSlide>
        ))}
      </Swiper>
    </Root>
  )
}
