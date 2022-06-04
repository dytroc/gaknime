import { GaknimeModal } from "components/GaknimeModal"
import Overlay from "components/Overlay"
import { useRouter } from "next/router"
import React from "react"
import { Header } from "./header"

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter()

  const closeModal = () => {
    const query = router.query
    delete query.itemId

    router.push(
      `${router.route}?${new URLSearchParams(query as Record<string, string>)}`,
      `${router.pathname}?${new URLSearchParams(
        query as Record<string, string>
      )}`,
      {
        shallow: true,
        scroll: false,
      }
    )
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      {children}
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
