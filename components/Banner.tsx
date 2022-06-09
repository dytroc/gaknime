import {Banner as BannerType} from "lib/types"
import React, {useEffect} from "react"
import styled from "styled-components"
import {Swiper, SwiperSlide, useSwiper} from "swiper/react"
import {FaChevronLeft, FaChevronRight} from "react-icons/fa"
import {useForceRefresh} from "lib/hooks"
import {Autoplay, EffectFade} from "swiper"
import Link from "next/link"
import {useRouter} from "next/router"
import {effect} from "zod";

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
  background-image: url(/banners/${({directory}) => directory}/banner.png);
  background-size: cover;
  background-position: center;
  position: relative;
`

const Logo = styled.img`
  position: absolute;
  bottom: 40%;
  left: 3.5%;
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
  color: #fff;

  font-size: 50px;
  font-weight: bold;

  position: absolute;

  bottom: 31%;
  left: 4%;

  text-shadow: rgba(0, 0, 0, 0.4) 0 0 0.5vw;

  @media screen and (max-width: 768px) {
    position: static;
    font-size: 5vw;
  }
`

const WatchButton = styled.div`
  color: #000;
  font-size: 40px;
  font-weight: bold;

  position: absolute;

  bottom: 21%;
  left: 4%;

  background: #fff;
  width: 300px;
  height: 96px;
  line-height: 96px;

  text-align: center;
  border-radius: 7px;

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

    useEffect(() => {
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
          padding: 1%;
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
            <div
                className="icon"
                onClick={() => {
                    if (swiper.isBeginning) swiper.slideTo(swiper.slides.length - 1); else swiper.slidePrev();
                }}
            >
                <FaChevronLeft size="100%"/>
            </div>

            <div
                onClick={() => {
                    if (swiper.isEnd) swiper.slideTo(0); else swiper.slideNext();
                }}
                className="icon"
            >
                <FaChevronRight size="100%"/>
            </div>
        </div>
    )
}

const Pagination: React.FC = () => {
    const swiper = useSwiper()
    const update = useForceRefresh()

    useEffect(() => {
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
          width: 20px;
          height: 20px;
          border-radius: 50%;
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
                    style={{background: swiper.activeIndex === i ? "#fff" : ""}}
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

export const Banner: React.FC<{ banners: BannerType[] }> = ({banners}) => {
    const [scale, setScale] = React.useState(0)
    const containerRef = React.useRef<HTMLDivElement | null>(null)
    useEffect(() => {
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

    const router = useRouter()

    return (
        <Root ref={(instance) => (containerRef.current = instance)}>
            <StyledSwiper
                effect={"fade"}
                modules={[Autoplay, EffectFade]}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false
                }}
                speed={750}
                fadeEffect={{
                    crossFade: true
                }}
                allowTouchMove={false}
                style={{transform: `scale(${scale})`}}
            >
                <Navigation/>
                <Pagination/>
                {banners.map((x, i) => (
                    <SwiperSlide key={i}>
                        <Link
                            scroll={false}
                            href={`${router.pathname}?itemId=${x.gaknime.id}`}
                            as={`/item/${x.gaknime.id}`}
                        >
                            <a>
                                <Container directory={x.directory}>
                                    <WatchButton>지금 보러가기</WatchButton>
                                    <Phrase>{x.catchPhrase}</Phrase>
                                    <Logo src={`/banners/${x.directory}/logo.png`}/>
                                </Container>
                            </a>
                        </Link>
                    </SwiperSlide>
                ))}
            </StyledSwiper>
        </Root>
    )
}
