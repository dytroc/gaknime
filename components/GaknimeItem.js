import styles from './GaknimeItem.module.css';

export default function GaknimeItem({
    gaknime, order = 0, currentOrder = 0, isFirst = false,
    transitionDisplayed = false, hasNegative = false, hasMoved = false, width = 18.3,
    style = {}
}) {

    return <a href={"/item/" + gaknime.id} className={styles.item} key={gaknime.title} style={{
        transition: transitionDisplayed ? 'transform 1.2s' : 'none',
        transform: `translate(${
            ((currentOrder * 18.8) + (hasNegative ? hasMoved ? 15.58 : 112.8 : hasNegative)) * -1
        }vw, 0)`,
        marginLeft: isFirst ? "3.25vw" : 0,
        order: order,
        flex: `0 0 ${width}vw`,
        ...style
    }}>
        <img className={styles.thumbnail} alt={gaknime.name} src={`https://img.youtube.com/vi/${gaknime.thumbnail}/maxresdefault.jpg`} style={{
            width: width + 'vw'
        }} />
        <div className={styles.title}>{gaknime.name}</div>
    </a>

}