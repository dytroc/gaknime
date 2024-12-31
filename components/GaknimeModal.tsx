import { useGaknimes } from 'lib/client'
import Head from 'next/head'
import React from 'react'
import { MdClose } from 'react-icons/md'
import styled from 'styled-components'
import { EpisodeListItem } from './EpisodeListItem'
import { PlayButton } from './PlayButton';

const Container = styled.div`
  background: var(--primary-color);
  border-radius: 12px;
  overflow-x: hidden;
  overflow-y: scroll;
  width: calc(100vw - 48px);
  max-width: 1100px;
  max-height: calc(100vh - 48px);
  scrollbar-width: none;
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }
  
  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }

  @media screen and (max-width: 768px) {
    width: 100vw;
    min-height: 100vh;
    height: 100vh;
    max-height: 100vh;
    border-radius: 0;
  }
`

const RightRelative = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    right: -1rem;
    top: 5rem;
    width: 20rem;
    
    @media screen and (max-width: 1000px) {
        display: none !important;
    }
`

const GaknimeTitle = styled.div`
    color: #fff;
    font-size: 38px;
    font-weight: 700;
    width: CALC(100% - 20rem);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    
    @media screen and (max-width: 1000px) {
        width: CALC(100% - 5rem);
    }
    
    @media screen and (max-width: 768px) {
        width: CALC(100%);
    }
`

const GaknimeDescription = styled.div`
    color: #ddd;
    margin-top: 32px;
    width: CALC(100% - 20rem);
    font-size: 0.9rem;
    
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    
    @media screen and (max-width: 1000px) {
        width: CALC(100% - 5rem);
    }
    
    @media screen and (max-width: 768px) {
        width: CALC(100%);  
    }
`

export const GaknimeModal: React.FC<{ id: string; close: () => void }> = ({ id, close }) => {
    const gaknimes = useGaknimes()

    const gaknime = gaknimes.find((x) => x.id === parseInt(id))

    React.useEffect(() => {
        window.document.body.style.overflow = 'hidden'

        return () => {
            window.document.body.style.overflow = 'auto'
        }
    }, [])

    if (!gaknime) return null

    return (
        <Container>
            <Head>
                <title>{gaknime.title} - 각프텔</title>
            </Head>
            <div
                style={{
                    background: 'var(--episode-title)',
                    width: '100%',
                    height: '35rem'
                }}
            >
                <div
                    style={{
                        position: 'relative',
                        padding: 50,
                        height: '100%',
                        width: '100%'
                    }}
                >
                    <div
                        style={{
                            backgroundImage: `
              linear-gradient(0deg, rgba(53, 57, 74, 1) 8%, rgba(53, 57, 74, 0) 92%),
              linear-gradient(to right, rgba(53, 57, 74, 1) 30%, rgba(53, 57, 74, 0.4) 70%),
              url(https://i.ytimg.com/vi/${gaknime.thumbnail}/maxresdefault.jpg)`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: '100%',
                            height: '100%',
                            filter: 'brightness(.5)',
                        }}
                    />

                    <div style={{ position: 'relative' }}>
                        <div style={{ display: 'flex' }}>
                            <RightRelative>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    width='100%'
                                    className="thumbnail"
                                    style={{ borderRadius: 12 }}
                                    src={`https://i.ytimg.com/vi/${gaknime.thumbnail}/maxresdefault.jpg`}
                                    alt="thumbnail"
                                    draggable="false"
                                />
                            </RightRelative>

                            <div style={{ flexGrow: 1 }}/>
                            <div
                                style={{
                                    background: 'rgba(0, 0, 0, 0.5)',
                                    padding: 4,
                                    color: '#fff',
                                    display: 'flex',
                                    borderRadius: 100,
                                    cursor: 'pointer',
                                }}
                                onClick={close}
                            >
                                <MdClose size={32}/>
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
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <div style={{
                                    height: 100
                                }}>
                                    <GaknimeTitle>
                                        {gaknime.title}
                                    </GaknimeTitle>
                                    <div
                                        style={{
                                            fontSize: 15,
                                            color: '#ccc',
                                            marginTop: 6,
                                        }}
                                    >
                                        {gaknime.genres.join('·')}
                                    </div>
                                </div>
                                <div style={{ flexGrow: 1, height: 0 }}/>
                                <PlayButton targetEpisodeIndex={0} gaknime={gaknime}/>
                                <GaknimeDescription>
                                    {gaknime.description}
                                </GaknimeDescription>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ padding: 32 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {gaknime.episodes.map((x, i) => (
                        <EpisodeListItem index={i} gaknime={gaknime} key={i} episode={x}/>
                    ))}
                </div>
            </div>
        </Container>
    )
}
