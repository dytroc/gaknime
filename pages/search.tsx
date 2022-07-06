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
  
  a {
    margin-top: 25px;
  }
`

const f = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ',
    'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ',
    'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const s = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ',
    'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ',
    'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
const t = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ',
    'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ',
    'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ',
    'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

const expression = /[가-힣]/g

const ga = 44032;

const disassembleKoreanString = (string: string): string => {
    let result = '';

    for (let i = 0; i < string.length; i++) {
        if (string.charAt(i).match(expression)) {
            const uni = string.charCodeAt(i) - ga;

            const fn = Math.floor(uni / 588);
            result += f[fn] + s[Math.floor((uni - (fn * 588)) / 28)] + t[Math.floor(uni % 28)];
        } else result += string.charAt(i);
    }
    return result;
}

const SearchPage: NextPage = () => {
  const router = useRouter()

  const gaknimes = useGaknimes()

  const result = React.useMemo(() => {
    if (typeof router.query.q !== "string") return []
    return gaknimes.filter(
      (x) =>
          disassembleKoreanString(x.title).includes(disassembleKoreanString(router.query.q as string))
    )
  }, [gaknimes, router.query.q])

  return (
    <Container style={{ marginTop: 32 }}>
      <div style={{ fontSize: 32, fontWeight: 700 }}>
          {`'${router.query.q}'`} <span style={{ color: 'var(--search-secondary-color)' }}>검색 결과</span>
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
