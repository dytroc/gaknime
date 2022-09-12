import { useGaknimes } from 'lib/client'
import { Episode, Gaknime } from 'lib/types'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { ResizeObserver } from '@juggle/resize-observer';
import { loadGaknimes } from '../../../../lib/data';
import { GetStaticPaths, GetStaticProps } from 'next';

const Container = styled.aside`
  display: flex;
  justify-content: center;
  padding: 1.5rem;
  width: 100vw;
  
  @media screen and (max-width: 1200px) {
    padding: 1rem;
  }
`

const PlayerLayout = styled.div`
  width: 100%;
  max-width: 1750px;
  display: grid;
  flex-direction: row;
  column-gap: 1.5rem;
  row-gap: 1rem;
  
  grid-template-columns: auto 24rem;
  
  @media screen and (max-width: 1200px) {
    grid-template-columns: auto;
    column-gap: 1rem;
    row-gap: 0.25rem;
  }
`

const VideoContainer = styled.div`
  max-width: 100%;
  min-width: 0%;
  aspect-ratio: 16 / 9;
  background-color: black;
  grid-column: 1;
  grid-area: 1 / 1 / 2 / 2;
  
  @media screen and (max-width: 1200px) {
    position: relative;
    top: -1rem;
    left: -1rem;
    width: 100vw;
  }
`

const EpisodeList = styled.div`
  width: 100%;
  height: fit-content;
  max-height: calc((min(100vw - 28.5rem, 1750px - 25.5rem)) * (9 / 16));
  border: 1px solid var(--border-color);
  box-sizing: border-box;
  border-radius: 5px;
  grid-area: 1 / 2 / 2 / 3;
  
  display: grid;
  grid-template-rows: 72px auto;
  overflow: hidden;
  margin: 0;
  padding: 0;
  
  @media screen and (max-width: 1200px) {
    grid-area: 3 / 1 / 3 / 1;
    width: 90vw;
    max-height: 100vw;
    margin-top: 1rem;
    
    position: relative;
    left: 1.5vw;
  }
`

const EpisodeListHeader = styled.div`
  width: 100%;
  display: flex;
  padding: 1.5rem;
  height: 72px;
  box-sizing: border-box;
  grid-area: 1 / 1 / 1 / 1;
`

const EpisodeDescription = styled.div`
  grid-area: 2 / 1 / 2 / 1;
`

const GaknimeTitle = styled.div`
  display: inline;
  color: var(--tertiary-text-color);
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    color: #d1cc3b;
  }
  
  @media screen and (max-width: 1200px) {
    font-size: 0.9rem;
  }
`

const EpisodeTitle = styled.div`
  color: var(--primary-text-color);
  margin-top: 0.25rem;
  font-size: 1.2rem;
  font-weight: 700;
`


const Thumbnail = styled.div`
    width: 110px;
    aspect-ratio: 16 / 9;
    background-position: center;
    background-size: cover;
    border-radius: 6px;
    flex-shrink: 0;
    overflow: hidden;
    @media screen and (max-width: 768px) {
      width: 120px;
    }
  `

const EpisodeItemTitle = styled.div`
    font-size: 14px;
    font-weight: 600;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    @media screen and (max-width: 768px) {
      font-size: 12px;
    }
  `

const EpisodeItemContainer = styled.a<{ isCurrentEpisode: boolean; isLast: boolean; }>`
    display: flex;
    gap: 16px;
    cursor: pointer;
    padding: 0.5rem 1.5rem;
    ${(props) => props.isCurrentEpisode ? 'background-color: var(--selected-episode);' : ''}
    ${(props) => props.isLast ? 'border-radius: 0 0 5px 5px;' : ''}
  
    &:hover {
      background-color: var(--selected-episode);
    }
`

const EpisodeItem: React.FC<{ gaknime: Gaknime; episode: Episode; index: number; isCurrentEpisode: boolean; isLast: boolean; }> = ({
   gaknime,
   episode,
   index,
   isCurrentEpisode = false,
   isLast = false,
}) => {

    return (
        <Link
            passHref
            href="/item/[id]/[episode]"
            as={`/item/${gaknime.id}/${gaknime.episodes.indexOf(episode) + 1}`}
        >
            <EpisodeItemContainer isCurrentEpisode={isCurrentEpisode} isLast={isLast}>
                <div>
                    <Thumbnail
                        style={{
                            backgroundImage: `url(https://i.ytimg.com/vi/${episode.code}/original.jpg)`,
                        }}
                    />
                </div>
                <div style={{ flexGrow: 1, width: 0 }}>
                    <EpisodeItemTitle>
                        {episode.noPrefix ? null : `${index + 1}화`} {episode.title}
                    </EpisodeItemTitle>
                </div>
            </EpisodeItemContainer>
        </Link>
    )
}

const EpisodePlayer: React.FC = () => {
    const router = useRouter()

    const gaknimes = useGaknimes();
    const gaknime = gaknimes.find(
        (x) => x.id === parseInt(router.query.id as string)
    )

    const episode =
        gaknime?.episodes[parseInt(router.query.episode as string) - 1]

    const [showNext, setShowNext] = useState(false)
    const [videoHeight, setVideoHeight] = useState<number>(72)
    const videoRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (videoRef.current) {
            const observer = new ResizeObserver((entries) => {
                const { height } = entries[0].contentRect;
                setVideoHeight(height);
            });

            observer.observe(videoRef.current);
            return () => observer.disconnect();
        }
    });

    if (router) {
        if (!gaknime || !episode) {
            if (typeof window !== 'undefined' && gaknimes.length > 0) {
                router.push('/').then(() => {
                });
            }
            return null;
        }
    } else {
        return null
    }

    return (
        <Container>
            <Head>
                <title>{gaknime.title} {router.query.episode}화 다시보기 | 각프텔</title>
            </Head>
            <PlayerLayout>
                <VideoContainer ref={videoRef}>
                    {episode && episode.code && !showNext && (
                        <ReactPlayer
                            url={'https://youtube.com/embed/' + episode.code + '?rel=0'}
                            controls
                            width='100%'
                            height='100%'
                            autoPlay
                            playing
                            onEnd={() => {
                                setShowNext(true);
                            }}
                        />
                    )}
                </VideoContainer>
                <EpisodeList>
                    <EpisodeListHeader>
              <span style={{
                  fontSize: '1rem',
                  lineHeight: '1.5rem',
                  verticalAlign: 'middle',
                  fontWeight: 700
              }}>총 {gaknime.episodes.length}편의 에피소드</span>
                    </EpisodeListHeader>
                    <SimpleBar style={{
                        width: '100%',
                        overflowX: 'hidden',
                        overflowY: 'auto',
                        gridArea: '2 / 1 / 2 / 1',
                        maxHeight: `${videoHeight - 72}px`
                    }} timeout={3000}>
                        {gaknime.episodes.map((displayed, index) => <EpisodeItem
                            key={index} episode={displayed} index={index} gaknime={gaknime} isCurrentEpisode={episode === displayed}
                            isLast={index === gaknime.episodes.length - 1}
                        />)}
                    </SimpleBar>
                </EpisodeList>
                <EpisodeDescription>
                    <GaknimeTitle onClick={() => router.push('/item/' + gaknime.id)}>{gaknime.title}</GaknimeTitle>
                    <EpisodeTitle>{router.query.episode}화 {episode.title}</EpisodeTitle>
                </EpisodeDescription>
            </PlayerLayout>
        </Container>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    return { props: {} }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const out: string[] = []

    const gaknimes = await loadGaknimes()

    for (const gaknime of gaknimes) {
        out.push(...gaknime.episodes.map((x, i) => `/item/${gaknime.id}/${i + 1}`))
    }

    return {
        paths: out,
        fallback: false,
    }
}

export default EpisodePlayer
