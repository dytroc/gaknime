import { Container } from "components/Container"
import { GaknimeItem } from "components/GaknimeItem"
import { useGaknimes } from "lib/client"
import { NextPage } from "next"
import { useRouter } from "next/router"
import React from "react"
import styled from "styled-components"

const Grid = styled.div`
  display: grid;
  gap: 16px;

  grid-template-columns: 1fr 1fr;

  @media screen and (min-width: 512px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  @media screen and (min-width: 960px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
`

const SearchPage: NextPage = () => {
  const router = useRouter()

  const gaknimes = useGaknimes()

  const result = React.useMemo(() => {
    if (typeof router.query.q !== "string") return []
    return gaknimes.filter(
      (x) =>
        x.title.includes(router.query.q as string) ||
        x.description.includes(router.query.q as string)
    )
  }, [gaknimes, router.query.q])

  return (
    <Container style={{ marginTop: 32 }}>
      <div style={{ fontSize: 32, fontWeight: 700 }}>
        {router.query.q} 검색결과
      </div>
      <Grid style={{ marginTop: 12 }}>
        {result.map((x, i) => (
          <GaknimeItem key={i} gaknime={x} />
        ))}
      </Grid>
    </Container>
  )
}

export default SearchPage
