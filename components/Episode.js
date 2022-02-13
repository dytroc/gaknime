import styles from 'components/Episode.module.css'
import { useRouter } from 'next/router';

export default function Episode({ episode }) {
    const router = useRouter();
    return <div className={styles.main} onClick={() => router.push({ pathname: `/item/${episode.item_id}/${episode.number}` })}>
        <img
            className={styles.thumbnail}
            src={`https://img.youtube.com/vi/${episode.code}/${episode.hq_default ? 'hqdefault' : 'maxresdefault'}.jpg`}
            alt='thumbnail'
        />
        <div className={styles.title}>{!episode.no_prefix && episode.number + '화'} {episode.title}</div>
    </div>
}