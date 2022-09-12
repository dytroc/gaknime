import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import { FaCog, FaGithub, FaSearch } from 'react-icons/fa'
import { AnimatePresence, motion } from 'framer-motion';

const absolute = ['/']

const Container = styled.div<{ isAbsolute: boolean }>`
  height: 65px;
  width: 100%;

  gap: 24px;
  ${({ isAbsolute }) =>
    isAbsolute
        ? css`
          position: fixed;
          z-index: 1000;
        `
        : ''}

  display: flex;

  align-items: center;

  padding: 0 24px;
`

const Logo = styled.a`
  transition-duration: 0.4s;
  transition-property: color, text-shadow;
  font-size: 25px;

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

    useEffect(() => {
        if (router.query.q) {
            setSearchTerm(router.query.q as string)
        }
    }, [router.query])

    const isAbsolute = absolute.includes(router.pathname)

    const [searchOpen, setSearchOpen] = React.useState(false)

    const [searchTerm, setSearchTerm] = React.useState('')

    useEffect(() => {
        if (!isAbsolute) return
        setScrollY(window.scrollY)
        const onScroll = () => setScrollY(window.scrollY)
        // clean up code
        window.removeEventListener('scroll', onScroll)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [isAbsolute])

    return (
        <Container
            isAbsolute={isAbsolute}
            style={{
                background:
                    scrollY <= 100 && isAbsolute ? 'transparent' : 'var(--primary-color)',
                boxShadow:
                    scrollY <= 100 && isAbsolute ? 'var(--border-color) 0 0 0 0' : 'var(--border-color) 0 0.2vh 0 0',
                transition: 'all ease .2s',
            }}
        >
            <Link href="/" passHref>
                <Logo
                    style={{
                        color:
                            scrollY <= 100 && isAbsolute
                                ? 'var(--primary-color)'
                                : 'var(--primary-contrast-color)',
                        textShadow: `var(--text-shadow-color) 0 0 ${
                            scrollY <= 100 && isAbsolute ? '4px' : 0
                        }`,
                    }}
                >
                    GAKNIME
                </Logo>
            </Link>
            <div style={{ flexGrow: 1, width: 0 }}/>
            <AnimatePresence>{searchOpen && (
                <motion.form
                    initial={{
                        scaleX: 0
                    }}
                    animate={{
                        scaleX: 1
                    }}
                    exit={{
                        scaleX: 0
                    }}
                    transition={{
                        duration: 0.2,
                    }}
                    style={{
                        transformOrigin: 'right',
                        flexGrow: 1,
                        maxWidth: 300,
                        position: 'relative',
                        right: '-55px',
                        zIndex: '100'
                    }}
                    onSubmit={(e) => {
                        e.preventDefault()
                        if (searchTerm.replace(/\s/g, '').length === 0) return;
                        router
                            .push({ pathname: '/search', query: { q: searchTerm } })
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
                </motion.form>
            )}</AnimatePresence>
            <div
                style={{
                    display: 'flex',
                    gap: 24,
                    alignItems: 'center',
                    filter: 'drop-shadow(2px 2px 0 var(--text-shadow-color))',
                }}
            >
                <FaSearch
                    onClick={() => {
                        setSearchOpen(true)
                    }}
                    style={{ cursor: 'pointer', transition: 'color ease .4s' }}
                    color={
                        scrollY <= 100 && isAbsolute
                            ? 'var(--primary-color)'
                            : 'var(--primary-contrast-color)'
                    }
                    size={24}
                />
                <a
                    style={{
                        transition: 'color ease .4s',
                        color:
                            scrollY <= 100 && isAbsolute
                                ? 'var(--primary-color)'
                                : 'var(--primary-contrast-color)',
                    }}
                    href="https://github.com/dytroc/gaknime"
                    target="_blank"
                    rel="noreferrer"
                >
                    <FaGithub size={24}/>
                </a>
                <Link href="/settings">
                    <a
                        style={{
                            transition: 'color ease .4s',
                            color:
                                scrollY <= 100 && isAbsolute
                                    ? 'var(--primary-color)'
                                    : 'var(--primary-contrast-color)',
                        }}
                    >
                        <FaCog size={24}/>
                    </a>
                </Link>
            </div>
        </Container>
    )
}
