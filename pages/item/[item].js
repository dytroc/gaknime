import { useRouter } from 'next/router';
import styles from 'styles/Item.module.css';
import { ganimes } from 'constants/ganimes';
import { useMemo } from 'react';
import Episode from 'components/Episode';
import Head from 'next/head';
import NotFound from 'components/NotFound';

export default function Item() {
    const router = useRouter();
    const { item } = router.query;

    console.log(item);

    const ganime = useMemo(() => ganimes.find((anime) => anime.id.toString() === item), [item]);

    if (ganime == null) return <NotFound />

    return <div className={styles.main}>
        <Head>
            <title>{ganime.name} - 각프텔</title>
        </Head>
        <div className={styles.banner}>
            <img src={`https://img.youtube.com/vi/${ganime.thumbnail}/maxresdefault.jpg`} className={styles.image} />

            <div className={styles.detail}>
                <div className={styles.title}>{ganime.name}</div>
                <div className={styles.genre}>{ganime.genres.join(" / ")}</div>
            </div>
        </div>
        <div className={styles.content}>
            <div className={styles.episodes}>
                <div className={styles.episode_guide}>에피소드 ({ganime.episodes.length})</div>
                {ganime.episodes.map((episode, index) => <Episode key={index} episode={{
                    number: index + 1,
                    item_id: item,
                    ...episode
                }} />)}
            </div>
        </div>

    </div>
}