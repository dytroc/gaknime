import { useRouter } from 'next/router';
import styles from 'styles/Item.module.css';
import { gaknimes } from 'constants/gaknimes';
import { useEffect, useMemo, useState } from 'react';
import Episode from 'components/Episode';
import Head from 'next/head';
import NotFound from 'components/NotFound';
import { useGanimeContext } from 'contexts/GanimeContext';

export default function Item({ background }) {
    const router = useRouter();
    const { item } = router.query;
    const { setBackground } = useGanimeContext();

    const gaknime = useMemo(() => gaknimes.find((anime) => anime.id.toString() === item), [item]);
    const [mainStyles, setStyles] = useState({});
    useEffect(() => {
        const timeout = setTimeout(() => {
            setStyles({ opacity: 1, transform: 'translateY(0%)' });
        }, 50);
        return () => clearTimeout(timeout);
    }, []);

    if (gaknime == null) return <NotFound/>;

    return <>
        <div className={styles.background} onClick={() => hideModal()}/>
        <div className={styles.main} style={mainStyles}>
            <Head>
                <title>{gaknime.name} - 각프텔</title>
            </Head>
            <div className={styles.banner}>
                <div className={styles.detail}>
                    <img src={`https://img.youtube.com/vi/${gaknime.thumbnail}/maxresdefault.jpg`}
                         className={styles.image}/>

                    <div className={styles.exit} onClick={() => hideModal()}>
                        <svg width="1.5vw" height="1.5vw" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                             className="ItemHeader__StyledIcon-sc-53k7ce-5 bzAeER">
                            <path fillRule="evenodd" clipRule="evenodd"
                            d="M6.052 4.352a1.202 1.202 0 10-1.7 1.7L10.3 12l-5.948 5.948a1.202 1.202 0 001.7 1.7L12 13.7l5.948 5.948a1.202
                            1.202 0 001.7-1.7L13.7 12l5.948-5.948a1.202 1.202 0 00-1.7-1.7L12 10.3 6.052 4.352z"
                            fill="currentColor"/>
                        </svg>
                    </div>

                    <div className={styles.basic}>
                        <div className={styles.title}>{gaknime.name}</div>
                        <div className={styles.subheading}>
                            <span>{gaknime.genres.join('·')}</span>
                            <div style={{
                                background: 'rgb(138, 138, 138)',
                                height: '1vw',
                                width: '0.05vw',
                                margin: '0 0.5vw'
                            }} />
                            <span>성인 이용가</span>
                        </div>
                    </div>

                    <div className={styles.description}>{gaknime.description}</div>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.episodes}>
                    <div className={styles.title_guide}>{gaknime.name}</div>
                    {gaknime.episodes.map((episode, index) => <Episode hideModal={hideModal} key={index} episode={{
                        number: index + 1,
                        item_id: item,
                        ...episode,
                    }}/>)}
                </div>
            </div>
        </div>
    </>;

    function hideModal(location = background) {
        setBackground(undefined);
        router.push(location ? { pathname: location.url, query: location.q || {} } : '/', undefined, { scroll: false }).then();
    }
}