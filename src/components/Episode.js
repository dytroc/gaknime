import styles from 'components/Episode.module.css';
import { useState } from 'react';

export default function Episode({ episode, hideModal }) {
    const [warpToSafetyVideo] = useState(() => {
        return localStorage.getItem('safety') !== 'on';
    });

    return <div className={styles.main} onClick={() => hideModal({
        url: `/item/${episode.item_id}/${episode.number}`,
        q: warpToSafetyVideo ? {
            safety: 'on',
        } : {},
    })}>
        <img
            className={styles.thumbnail}
            src={`https://img.youtube.com/vi/${episode.code}/${episode.hq_default ? 'hqdefault' : 'maxresdefault'}.jpg`}
            alt="thumbnail"
        />
        <div className={styles.title}>{!episode.no_prefix && episode.number + '화'} {episode.title}</div>
    </div>;
}