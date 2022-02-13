import styles from 'components/Banner.module.css'
import { ganimes } from 'constants/ganimes';

export default function Banner({ banner }) {

    return <div className={styles.banner}>
        <img className={styles.image} src={`/banners/${banner.image}`} alt="Banner" />

        <img className={styles.logo} src={`/logos/${banner.image}`} alt="Banner" />
        <div className={styles.phrase}>{banner.catchphrase}</div>

        <a href={'/item/' + ganimes.find((ganime) => ganime.name === banner.item).id} className={styles.watch}>지금 보러가기</a>
    </div>
}