import { GaknimeModal } from "components/GaknimeModal"
import Overlay from "components/Overlay"
import { useRouter } from "next/router"
import React from "react"
import { Header } from "./header"

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter()

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      {children}
      <Overlay
        open={!!router.query.itemId}
        close={() => {
          router.push(router.pathname, router.pathname, {
            shallow: true,
            scroll: false,
          })
        }}
      >
        <GaknimeModal
          close={() => {
            router.push(router.pathname, router.pathname, {
              shallow: true,
              scroll: false,
            })
          }}
          id={router.query.itemId as string}
        />
      </Overlay>
    </div>
  )
}
