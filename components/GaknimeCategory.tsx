import { Gaknime } from 'lib/types'
import _ from 'lodash'
import React, { Dispatch, SetStateAction, useContext, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { GaknimeItem } from './GaknimeItem'
import { AppContext } from './AppContext';
import { motion } from 'framer-motion'

const Container = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  width: 100vw;
`

const Label = styled.div`
  font-weight: 700;
  margin-left: 3.255vw;
`

const StyledList = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  -ms-overflow-style: none;
  scrollbar-width: none;
  
  ::-webkit-scrollbar {
    display: none;
  }
`

const StyledItems = styled.div`
  margin-left: 3.255vw;
  display: flex;
  flex-direction: row;
  width: 100%;
  scroll-behavior: smooth;
`

const StyledArrow = styled.div`
  position: absolute;
  display: flex;
  
  background: rgba(0, 0, 0, 0.5);
  width: 2.755vw;
  height: 10.29375vw;
  color: white;
  font-size: 2vw;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  transition: opacity 0.5s;
  opacity: 0;
  cursor: pointer;
  z-index: 900;
  
  ${StyledList}:hover & {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.6);
  }
`


const Arrow: React.FC<{
    right: boolean, style: any,setHasMoved: Dispatch<SetStateAction<boolean>>,  setCurrentOrder: Dispatch<SetStateAction<number>>,
    setIsMoving: Dispatch<SetStateAction<boolean>>, isMoving: boolean
}> = ({
    right, style = {}, setHasMoved, setCurrentOrder, isMoving, setIsMoving
}) => {
    return <StyledArrow style={style} onClick={() => {
        if (isMoving) return
        setIsMoving(true);
        setHasMoved(true);
        setCurrentOrder((currentOrder) => currentOrder + (right ? 5 : -5));
    }}>{right ? '>' : '<' }</StyledArrow>
}

export const GaknimeCategory: React.FC<{
    title: string
    gaknimes: Gaknime[]
}> = ({ title, gaknimes }) => {
    const isMobile = useContext(AppContext).isMobile;

    const [currentOrder, setCurrentOrder] = useState(0);
    const [hasMoved, setHasMoved] = useState(false);

    const [isMoving, setIsMoving] = useState(false);

    const order = useMemo(() => {
        const result = new Array<Gaknime>();

        gaknimes.forEach((item, key) => {
            result[key] = item;
            if (!isMobile && gaknimes.length > 5) {
                result[key + gaknimes.length] = item;
                result[key + (gaknimes.length * 2)] = item;
                result[key + (gaknimes.length * 3)] = item;
                result[key + (gaknimes.length * 4)] = item;
            }
        });
        setCurrentOrder(0);

        return result;
    }, [gaknimes, isMobile]) || new Array<Gaknime>();

    useEffect(() => {
        if (!isMoving) return;
        const timeout = setTimeout(() => {
            setIsMoving(false);

            if (currentOrder >= (gaknimes.length * 4) - (5 * 2)) {
                setCurrentOrder((current) => current - gaknimes.length);
            } else if (currentOrder <= gaknimes.length + 5) {
                setCurrentOrder((current) => current + gaknimes.length);
            }
        }, 1200);

        return () => clearTimeout(timeout);
    }, [isMoving]);

    return (
        <Container>
            <Label style={{
                fontSize: isMobile ? '1.25rem' : '1.5vw',
                marginBottom: isMobile ? '0.8rem' : '1rem',
            }}>{title}</Label>
            <StyledList style={{
                overflowX: isMobile ? 'scroll' : 'visible',
            }}>
                {hasMoved && !isMobile && <Arrow setIsMoving={setIsMoving} style={{
                    left: 0,
                    borderBottomRightRadius: '0.35vw',
                    borderTopRightRadius: '0.35vw',
                }} right={false} setHasMoved={setHasMoved} setCurrentOrder={setCurrentOrder} isMoving={isMoving} />}
                <StyledItems
                    style={isMobile ? {
                        gap: '2.5vw',
                        width: 'CALC(100% + 3.255vw)'
                    } : {
                        transition: isMoving ? 'transform ease 1.2s' : 'none',
                        transform: `translateX(${(-currentOrder - (gaknimes.length > 5 ? gaknimes.length : 0)) * (18.3 + 0.5)}vw)`,
                        gap: '0.5vw',
                    }}
                >
                    {order.map((gaknime, index) => <GaknimeItem
                        gaknime={gaknime} key={index} contentStyle={{
                            width: isMobile ? '52vw' : '18.3vw', gap: isMobile ? '1vw' : '0.5vw',
                            opacity: (!isMobile && gaknimes.length > 5 && !hasMoved && index < gaknimes.length) ? 0 : 1,
                            marginRight: index === gaknimes.length - 1 && isMobile ? '3.255vw' : '0vw'
                        }}
                    />)}
                </StyledItems>
                {order.length > 5 && !isMobile && <Arrow setIsMoving={setIsMoving} style={{
                    right: 0,
                    borderBottomLeftRadius: '0.35vw',
                    borderTopLeftRadius: '0.35vw',
                }} right={true} setHasMoved={setHasMoved} setCurrentOrder={setCurrentOrder} isMoving={isMoving} />}
            </StyledList>
        </Container>
    )
}

export const randomCategories = (gaknimes: Gaknime[], count: number) => {
    const items = _.sampleSize(bars, count)

    return items.map((x) => ({ title: x.catchphrase, items: x.filter(gaknimes) }))
}

const bars: {
    catchphrase: string
    filter: (gaknimes: Gaknime[]) => Gaknime[]
}[] = [
    {
        catchphrase: '웃음이 절로 나오는 미니게임',
        filter: (gaknimes: Gaknime[]) =>
            gaknimes.filter((item) => item.genres.includes('미니게임')),
    },
    {
        catchphrase: '엄마, 나 방송에 나왔어요!',
        filter: (gaknimes: Gaknime[]) =>
            gaknimes.filter((item) => item.tags.includes('시참')),
    },
    {
        catchphrase: '마크가 아니여도 재밌잖아?',
        filter: (gaknimes: Gaknime[]) =>
            gaknimes.filter(
                (item) =>
                    item.genres.includes('일상') || item.genres.includes('마크 외 게임')
            ),
    },
    {
        catchphrase: '어르신... 고생하시네요...',
        filter: (gaknimes: Gaknime[]) =>
            gaknimes.filter((item) => item.tags.includes('패널티')),
    },
    {
        catchphrase:
            '지금까지 이런 크루는 없었다. 이것은 싸우는 건가 협동하는 걸까. 공각기동대입니다.',
        filter: (gaknimes: Gaknime[]) =>
            gaknimes.filter((item) => item.tags.includes('공각기동대')),
    },
    {
        catchphrase: '우리 학교도 이렇게 가르쳐줬으면 재밌었을텐데...',
        filter: (gaknimes: Gaknime[]) =>
            gaknimes.filter((item) => item.genres.includes('교육')),
    },
    {
        catchphrase: '사실은 오래전부터 당신 같은 개발자를 기다려 왔다우',
        filter: (gaknimes: Gaknime[]) =>
            gaknimes.filter((item) => item.genres.includes('개발')),
    },
    {
        catchphrase: '라떼는... 이런 거 봤었어',
        filter: (gaknimes: Gaknime[]) =>
            gaknimes.filter((item) => item.tags.includes('그 시절')),
    },
    {
        catchphrase: '마크의 근본은 역시 야생이지',
        filter: (gaknimes: Gaknime[]) =>
            gaknimes.filter((item) => item.genres.includes('야생')),
    },
]
