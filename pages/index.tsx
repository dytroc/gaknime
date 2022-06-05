import React, { lazy } from "react"
import { GetStaticProps, NextPage } from "next"
import { loadBanners, loadGaknimes } from "lib/data"
import { Banner as BannerType, Gaknime } from "lib/types"
import { Banner } from "components/Banner"
import { GaknimeCategory, randomCategories } from "components/GaknimeCategory"
import { Container } from "components/Container"
import { writeFile } from "fs/promises"
import { join } from "path"
import { useGaknimes } from "lib/client"

type PageProps = {
  banners: BannerType[]
}

const Home: NextPage<PageProps> = ({ banners }) => {
  const [categories, setCategories] = React.useState<
    ReturnType<typeof randomCategories>
  >([])

  const gaknimes = useGaknimes()

  React.useEffect(() => {
    setCategories(randomCategories(gaknimes, 5))
  }, [gaknimes])

  return (
    <div>
      <Banner banners={banners} />
      <Container>
        {categories.map((x, i) => (
          <GaknimeCategory key={i} gaknimes={x.items} title={x.title} />
        ))}
      </Container>
    </div>
  )
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const banners = await loadBanners()

  return {
    props: {
      banners,
    },
  }
}

export default Home
