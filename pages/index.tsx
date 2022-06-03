import React from "react"
import { GetStaticProps, NextPage } from "next"
import { loadBanners, loadGaknimes } from "lib/data"
import { Banner as BannerType, Gaknime } from "lib/types"
import { Banner } from "components/Banner"

type PageProps = {
  gaknimes: Gaknime[]
  banners: BannerType[]
}

const Home: NextPage<PageProps> = ({ gaknimes, banners }) => {
  return (
    <div>
      <Banner banners={banners} />
    </div>
  )
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const gaknimes = await loadGaknimes()
  const banners = await loadBanners(gaknimes)

  return {
    props: {
      gaknimes,
      banners,
    },
  }
}

export default Home
