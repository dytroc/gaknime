import { GaknimeModal } from 'components/GaknimeModal'
import Overlay from 'components/Overlay'
import { useRouter } from 'next/router'
import React from 'react'
import { Header } from './header'

export const Layout: React.FC<{ children: React.ReactNode }> = ({
                                                                    children,
                                                                }) => {
    const router = useRouter()

    // if (router.route === "/item/[id]/[episode]") {
    //     return <>{children}</>
    // }

    const closeModal = () => {
        const query = router.query
        delete query.itemId

        const q = Object.keys(router.query).length
            ? `?${new URLSearchParams(query as Record<string, string>)}`
            : ''

        router.push(`${router.route}${q}`, `${router.pathname}${q}`, {
            shallow: true,
            scroll: false,
        })
    }

    return (
        <div
            style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden' }}
        >
            <Header />
            {children}
            <footer style={{
                height: '2rem'
            }} />
            <Overlay
                open={!!router.query.itemId}
                close={() => {
                    closeModal()
                }}
            >
                <GaknimeModal
                    close={() => {
                        closeModal()
                    }}
                    id={router.query.itemId as string}
                />
            </Overlay>
        </div>
    )
}
