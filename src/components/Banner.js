import styles from 'components/Banner.module.css';
import { gaknimes } from 'constants/gaknimes';
import { useRouter } from 'next/router';
import { useGanimeContext } from 'contexts/GanimeContext';

export default function Banner({ banner }) {
    const router = useRouter();
    const { setBackground } = useGanimeContext();

    return <div className={styles.banner}>
        <img className={styles.image} src={`/banners/${banner.image}`} alt="Banner"/>

        <img className={styles.logo} src={`/logos/${banner.image}`} alt="Banner"/>
        <div className={styles.phrase}>{banner.catchphrase}</div>

        <div onClick={() => {
            setBackground({ url: router.route, q: router.query.q });
            router.push('/item/' + gaknimes.find((gaknime) => gaknime.name === banner.item).id, undefined, { scroll: false }).then();
        }} className={styles.watch}>
            지금 보러가기
        </div>
    </div>;
}