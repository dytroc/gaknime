import { useRouter } from 'next/router';
import styles from 'styles/Search.module.css';
import { useMemo } from 'react';
import { ganimes } from 'constants/ganimes';
import GanimeItem from 'components/GanimeItem';

export default function Search() {
    const router = useRouter();
    const word = router.query.q;


    const items = useMemo(() => ganimes.filter((anime) => anime.name.replaceAll(' ', '').includes(word.replaceAll(' ', '')))
        .sort((a, b) => a.length - b.length), [word]);


    if (!items) return (<div />); else if (!items.length) return <div className={styles.not_found}>
        <div className={styles.result} style={{
            position: 'absolute',
            top: '8vh'
        }}><span className={styles.keyword}>‘{word}’</span> 검색 결과</div>
        <span className={styles.not_found_text}>아쉽게도 해당 검색 결과에 맞는 각니메가 없습니다.</span>
    </div>

    return <div className={styles.main}>
        <div className={styles.result}><span className={styles.keyword}>‘{word}’</span> 검색 결과</div>

        <div className={styles.items}>
            {items.map((item, index) => <GanimeItem key={index} ganime={item} width={(96.5 - 2.5) / 6} style={{
                marginBottom: '3.5vh'
            }} />)}
        </div>
    </div>
}