import { Episode, Gaknime } from 'lib/types'
import Link from 'next/link'
import { FaPlay } from 'react-icons/fa'
import { MdPlayArrow } from 'react-icons/md'
import styled from 'styled-components'

const Thumbnail = styled.div`
  width: 200px;
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

const ThumbnailContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  font-size: 32px;
  color: #fff;
  @media screen and (max-width: 768px) {
    font-size: 24px;
  }
`

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`

const Container = styled.a`
  display: flex;
  gap: 16px;
  cursor: pointer;

  ${ThumbnailContent} {
    opacity: 0;
  }

  &:hover {
    ${ThumbnailContent} {
      opacity: 1;
    }
  }
`

export const EpisodeListItem: React.FC<{
    episode: Episode
    index: number
    gaknime: Gaknime
}> = ({ episode, index, gaknime }) => {
    return (
        <Link
            passHref
            href="/item/[id]/[episode]"
            as={`/item/${gaknime.id}/${gaknime.episodes.indexOf(episode) + 1}`}
        >
            <Container>
                <div>
                    <Thumbnail
                        style={{
                            backgroundImage: `url(https://i.ytimg.com/vi/${episode.code}/original.jpg)`,
                        }}
                    >
                        <ThumbnailContent>
                            <FaPlay/>
                        </ThumbnailContent>
                    </Thumbnail>
                </div>
                <div style={{ flexGrow: 1, width: 0 }}>
                    <Title>
                        {episode.noPrefix ? null : `${index + 1}화`} {episode.title}
                    </Title>
                </div>
            </Container>
        </Link>
    )
}
