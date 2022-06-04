import { useForceRefresh } from "lib/hooks"
import { Gaknime } from "lib/types"
import _ from "lodash"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import styled from "styled-components"
import { FreeMode, Pagination } from "swiper"
import { Swiper, SwiperSlide, useSwiper } from "swiper/react"

const Container = styled.div`
  margin-top: 64px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const Label = styled.div`
  font-size: 24px;
  font-weight: 700;
`

const CategoryItem: React.FC<{ gaknime: Gaknime }> = ({ gaknime }) => {
  const router = useRouter()
  return (
    <Link
      scroll={false}
      href={`${router.pathname}?itemId=${gaknime.id}`}
      as={`/item/${gaknime.id}`}
    >
      <a>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${gaknime.thumbnail}/original.jpg`}
            alt="Thumbnail"
            width={240}
            style={{ borderRadius: 6 }}
          />
          <div style={{ fontSize: 16, width: 240 }}>{gaknime.title}</div>
        </div>
      </a>
    </Link>
  )
}

const StyledSwiper = styled(Swiper)`
  width: calc(100% + 96px);
  transform: translateX(-48px);
  padding-left: 64px;

  @media screen and (max-width: 768px) {
    width: calc(100% + 48px);
    transform: translateX(-24px);
  }

  .navigation-button {
    opacity: 0;
  }

  &:hover {
    .navigation-button {
      opacity: 1;
    }
  }
`

const BaseNavigationItem = styled.div`
  position: absolute;
  top: 0;
  z-index: 100;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 12px;
  display: flex;
  align-items: center;
  color: #fff;
  transition: all ease 0.2s;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
`

const Navigation: React.FC = () => {
  const swiper = useSwiper()

  return (
    <>
      <BaseNavigationItem
        className="navigation-button"
        onClick={() => {
          swiper.slideTo(
            swiper.activeIndex - Math.floor(window.innerWidth / 240) - 1
          )
        }}
        style={{
          left: 0,
          borderTopRightRadius: 12,
          borderBottomRightRadius: 12,
        }}
      >
        <FaChevronLeft size={24} />
      </BaseNavigationItem>
      <BaseNavigationItem
        className="navigation-button"
        onClick={() => {
          swiper.slideTo(
            swiper.activeIndex + Math.floor(window.innerWidth / 240) - 1
          )
        }}
        style={{
          right: 0,
          borderTopLeftRadius: 12,
          borderBottomLeftRadius: 12,
        }}
      >
        <FaChevronRight size={24} />
      </BaseNavigationItem>
    </>
  )
}

export const GaknimeCategory: React.FC<{
  title: string
  gaknimes: Gaknime[]
}> = ({ title, gaknimes }) => {
  const looped = React.useMemo(() => {
    return [...gaknimes, ...gaknimes, ...gaknimes, ...gaknimes, ...gaknimes]
  }, [gaknimes])

  return (
    <Container>
      <Label>{title}</Label>
      <StyledSwiper
        loop
        slidesPerView="auto"
        spaceBetween={16}
        style={{ position: "relative" }}
      >
        <Navigation />
        {looped.map((x, i) => (
          <SwiperSlide key={i} style={{ width: 240 }}>
            <CategoryItem gaknime={x} />
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </Container>
  )
}

export const randomCategories = (gaknimes: Gaknime[], count: number) => {
  const items = _.sampleSize(bars, count)

  return items.map((x) => ({ title: x.catchphrase, items: x.filter(gaknimes) }))
}

const bars: {
  catchphrase: string
  filter: (gaknimes: Gaknime[]) => Gaknime[]
}[] = [
  {
    catchphrase: "웃음이 절로 나오는 미니게임",
    filter: (gaknimes: Gaknime[]) =>
      gaknimes.filter((item) => item.genres.includes("미니게임")),
  },
  {
    catchphrase: "엄마, 나 방송에 나왔어요!",
    filter: (gaknimes: Gaknime[]) =>
      gaknimes.filter((item) => item.tags.includes("시참")),
  },
  {
    catchphrase: "마크가 아니여도 재밌잖아?",
    filter: (gaknimes: Gaknime[]) =>
      gaknimes.filter(
        (item) =>
          item.genres.includes("일상") || item.genres.includes("마크 외 게임")
      ),
  },
  {
    catchphrase: "어르신... 고생하시네요...",
    filter: (gaknimes: Gaknime[]) =>
      gaknimes.filter((item) => item.tags.includes("패널티")),
  },
  {
    catchphrase:
      "지금까지 이런 크루는 없었다. 이것은 싸우는 건가 협동하는 걸까. 공각기동대입니다.",
    filter: (gaknimes: Gaknime[]) =>
      gaknimes.filter((item) => item.tags.includes("공각기동대")),
  },
  {
    catchphrase: "우리 학교도 이렇게 가르쳐줬으면 재밌었을텐데...",
    filter: (gaknimes: Gaknime[]) =>
      gaknimes.filter((item) => item.genres.includes("교육")),
  },
  {
    catchphrase: "사실은 오래전부터 당신 같은 개발자를 기다려 왔다우",
    filter: (gaknimes: Gaknime[]) =>
      gaknimes.filter((item) => item.genres.includes("개발")),
  },
  {
    catchphrase: "라떼는... 이런 거 봤었어",
    filter: (gaknimes: Gaknime[]) =>
      gaknimes.filter((item) => item.tags.includes("그 시절")),
  },
  {
    catchphrase: "마크의 근본은 역시 야생이지",
    filter: (gaknimes: Gaknime[]) =>
      gaknimes.filter((item) => item.genres.includes("야생")),
  },
]
