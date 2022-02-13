import { useRouter } from 'next/router';
import styles from 'styles/Item.module.css';
import { gaknimes } from 'constants/gaknimes';
import { useMemo } from 'react';
import Episode from 'components/Episode';
import Head from 'next/head';
import NotFound from 'components/NotFound';

export default function Item() {
    const router = useRouter();
    const { item } = router.query;

    console.log(item);

    const gaknime = useMemo(() => gaknimes.find((anime) => anime.id.toString() === item), [item]);

    if (gaknime == null) return <NotFound />

    return <div className={styles.main}>
        <Head>
            <title>{gaknime.name} - 각프텔</title>
        </Head>
        <div className={styles.banner}>
            <img src={`https://img.youtube.com/vi/${gaknime.thumbnail}/maxresdefault.jpg`} className={styles.image} />

            <div className={styles.detail}>
                <div className={styles.title}>{gaknime.name}</div>
                <div className={styles.genre}>{gaknime.genres.join(" / ")}</div>
            </div>
        </div>
        <div className={styles.content}>
            <div className={styles.episodes}>
                <div className={styles.episode_guide}>에피소드 ({gaknime.episodes.length})</div>
                {gaknime.episodes.map((episode, index) => <Episode key={index} episode={{
                    number: index + 1,
                    item_id: item,
                    ...episode
                }} />)}
            </div>
        </div>

    </div>
}