import { useGaknimes } from "lib/client"
import React from "react"
import { MdClose } from "react-icons/md"
import styled from "styled-components"
import { EpisodeListItem } from "./EpisodeListItem"

const Container = styled.div`
  background: var(--primary-color);
  border-radius: 12px;
  overflow-x: hidden;
  overflow-y: scroll;
  width: calc(100vw - 48px);
  max-width: 1100px;
  max-height: calc(100vh - 48px);

  ::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 768px) {
    width: 100vw;
    height: 100vh;
    max-height: 100vh;
    border-radius: 0;
  }
`

export const GaknimeModal: React.FC<{ id: string; close: () => void }> = ({
  id,
  close,
}) => {
  const gaknimes = useGaknimes()

  const gaknime = gaknimes.find((x) => x.id === parseInt(id))

  React.useEffect(() => {
    window.document.body.style.overflow = "hidden"

    return () => {
      window.document.body.style.overflow = "auto"
    }
  }, [])

  if (!gaknime) return null

  return (
    <Container>
      <div
        style={{
          background: "var(--episode-title)",
          width: "100%",
        }}
      >
        <div
          style={{
            position: "relative",
            padding: 32,
          }}
        >
          <div
            style={{
              backgroundImage: `url(https://i.ytimg.com/vi/${gaknime.thumbnail}/original.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              maskImage: `url(/assets/mask.png)`,
              WebkitMaskImage: `url(/assets/mask.png)`,
              position: "absolute",
              maskSize: "cover",
              maskPosition: "top right",
              WebkitMaskPosition: "top right",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              filter: "brightness(.5)",
            }}
          />

          <div style={{ position: "relative" }}>
            <div style={{ display: "flex" }}>
              <div style={{ flexGrow: 1 }} />
              <div
                style={{
                  background: "rgba(0, 0, 0, 0.5)",
                  padding: 4,
                  color: "#fff",
                  display: "flex",
                  borderRadius: 100,
                  cursor: "pointer",
                }}
                onClick={close}
              >
                <MdClose size={32} />
              </div>
            </div>
            <div style={{ marginTop: 48 }} className="introFlex">
              <style jsx>{`
                .introFlex {
                  display: flex;
                  gap: 24px;
                }
                @media screen and (max-width: 768px) {
                  .introFlex {
                    flex-direction: column;
                  }
                  .thumbnail {
                    width: 100%;
                  }
                }
              `}</style>
              <div
                style={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ color: "#fff", fontSize: 36, fontWeight: 700 }}>
                  {gaknime.title}
                </div>
                <div
                  style={{
                    fontSize: 18,
                    color: "#ccc",
                    marginTop: 6,
                  }}
                >
                  {gaknime.genres.join(", ")}
                </div>
                <div style={{ flexGrow: 1, height: 0 }} />
                <div style={{ color: "#ddd", marginTop: 32 }}>
                  {gaknime.description}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  width={320}
                  className="thumbnail"
                  style={{ borderRadius: 12 }}
                  src={`https://i.ytimg.com/vi/${gaknime.thumbnail}/original.jpg`}
                  alt="thumbnail"
                  draggable="false"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: 32 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {gaknime.episodes.map((x, i) => (
            <EpisodeListItem index={i} gaknime={gaknime} key={i} episode={x} />
          ))}
        </div>
      </div>
    </Container>
  )
}
