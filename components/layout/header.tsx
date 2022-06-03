import React from "react"
import { useRouter } from "next/router"
import styled, { css } from "styled-components"
import Link from "next/link"
import { FaCog, FaGithub, FaSearch } from "react-icons/fa"

const absolute = ["/"]

const Container = styled.div<{ isAbsolute: boolean }>`
  height: 72px;
  width: 100%;

  gap: 24px;
  ${({ isAbsolute }) =>
    isAbsolute
      ? css`
          position: fixed;
          z-index: 10000;
        `
      : ""}

  display: flex;

  align-items: center;

  padding: 0 24px;
`

const Logo = styled.a`
  transition-duration: 0.4s;
  transition-property: color, text-shadow;
  font-size: 32px;

  font-family: ONE-Mobile-POP, -apple-system, BlinkMacSystemFont, Segoe UI,
    Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
    sans-serif;

  cursor: pointer;
  color: var(--primary-contrast-color);
`

const SearchInput = styled.input`
  padding: 8px;
  font-size: 16px;
  border-radius: 4px;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 100%;

  @media screen and (max-width: 768px) {
    position: fixed;
    left: 50%;
    transform: translate(-50%, 100%);
    max-width: 300px;
    z-index: 1000;
  }
`

export const Header: React.FC = () => {
  const [scrollY, setScrollY] = React.useState(200)
  const router = useRouter()

  const isAbsolute = absolute.includes(router.pathname)

  const [searchOpen, setSearchOpen] = React.useState(false)

  const [searchTerm, setSearchTerm] = React.useState("")

  React.useEffect(() => {
    if (!isAbsolute) return
    setScrollY(window.scrollY)
    const onScroll = () => setScrollY(window.scrollY)
    // clean up code
    window.removeEventListener("scroll", onScroll)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [isAbsolute])

  return (
    <Container
      isAbsolute={isAbsolute}
      style={{
        background: scrollY <= 100 && isAbsolute ? "transparent" : "#fff",
      }}
    >
      <Link href="/" passHref>
        <Logo
          style={{
            color:
              scrollY <= 100 && isAbsolute
                ? "var(--primary-color)"
                : "var(--primary-contrast-color)",
            textShadow: `var(--text-shadow-color) 0 0 ${
              scrollY <= 100 && isAbsolute ? "4px" : 0
            }`,
          }}
        >
          GAKNIME
        </Logo>
      </Link>
      <div style={{ flexGrow: 1, width: 0 }} />
      {searchOpen && (
        <form
          style={{
            flexGrow: 1,
            maxWidth: 300,
          }}
          onSubmit={(e) => {
            e.preventDefault()
            router
              .push({ pathname: "/search", query: { q: searchTerm } })
              .then(() => {
                setScrollY(200)
              })
          }}
        >
          <SearchInput
            autoFocus
            onBlur={() => {
              setSearchOpen(false)
            }}
            type="text"
            placeholder="검색어 입력..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      )}
      <div
        style={{
          display: "flex",
          gap: 24,
          alignItems: "center",
          filter: "drop-shadow(2px 2px 0 var(--text-shadow-color))",
        }}
      >
        {!searchOpen && (
          <FaSearch
            onClick={() => {
              setSearchOpen(true)
            }}
            style={{ cursor: "pointer" }}
            color={
              scrollY <= 100 && isAbsolute
                ? "var(--primary-color)"
                : "var(--primary-contrast-color)"
            }
            size={24}
          />
        )}
        <a
          style={{
            color:
              scrollY <= 100 && isAbsolute
                ? "var(--primary-color)"
                : "var(--primary-contrast-color)",
          }}
          href="https://github.com/dytroinc/gaknime"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub size={24} />
        </a>
        <Link href="/settings">
          <a
            style={{
              color:
                scrollY <= 100 && isAbsolute
                  ? "var(--primary-color)"
                  : "var(--primary-contrast-color)",
            }}
          >
            <FaCog size={24} />
          </a>
        </Link>
      </div>
    </Container>
  )
}
