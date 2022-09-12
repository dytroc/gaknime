import React, { FC } from 'react';
import { FaPlay } from 'react-icons/fa';
import { Episode, Gaknime } from '../lib/types';
import Link from 'next/link';

export const PlayButton: FC<{
    targetEpisodeIndex: number,
    gaknime: Gaknime
}> = ({ targetEpisodeIndex, gaknime }) => {
    return (<Link href={`/item/${gaknime.id}/${targetEpisodeIndex + 1}`}>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginTop: '5rem',
            cursor: 'pointer'
        }}>
            <div style={{
                background: 'white',
                width: '3.75rem',
                height: '3.75rem',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}><FaPlay color='black' size='1.25rem' style={{
                marginLeft: '2.5px'
            }}/></div>
            <span style={{
                color: 'white',
                fontSize: '1.4rem',
                fontWeight: 'bolder',
            }}>{targetEpisodeIndex + 1}화 재생하기</span>
        </div>
    </Link>);
}