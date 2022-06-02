import styles from 'components/GaknimeItem.module.css';
import { useRouter } from 'next/router';
import GanimeContextWrapper, { useGanimeContext } from 'contexts/GanimeContext';

export default function GaknimeItem(
    { gaknime, order = 0, currentOrder = [0, false], width = 18.3, style = {}, tilted = false },
) {

    const router = useRouter();
    let { setBackground } = useGanimeContext();

    return <GanimeContextWrapper>
        <div onClick={() => {
            setBackground({ url: router.route, q: { q: router.query.q } });
            router.push('/item/' + gaknime.id, undefined, { scroll: false }).then();
        }} className={styles.item} key={gaknime.title} style={{
            transition: currentOrder[1] ? 'transform 1.2s' : 'none',
            transform: `translate(${
                ((currentOrder[0] * 18.8) * -1) + (tilted ? 3.25 : 0)
            }vw, 0)`,
            marginLeft: 0,
            order: order,
            flex: `0 0 ${width}vw`,
            ...style,
        }}>
            <img className={styles.thumbnail} alt={gaknime.name}
                 src={`https://img.youtube.com/vi/${gaknime.thumbnail}/maxresdefault.jpg`} style={{
                width: width + 'vw',
            }}/>
            <div className={styles.title}>{gaknime.name}</div>
        </div>
    </GanimeContextWrapper>;

}