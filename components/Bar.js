import styles from './Bar.module.css';
import GanimeItem from 'components/GanimeItem';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function Bar({ title, items }) {

    const listRef = useRef(null);

    const [currentOrder, setCurrentOrder] = useState([0, false]);
    const [hasMoved, setHasMoved] = useState(false);

    const [isMoving, setIsMoving] = useState(false);

    const order = useMemo(() => {
        const result = new Map();

        items.forEach((item, key) => {
            result.set(key, item);
            if (items.length > 5)   {
                result.set(items.length + key + 1, item);
                if (items.length < 7) result.set((items.length * 2) + key + 1, item);
                if (key >= items.length - 6) {
                    result.set(key - items.length, item);
                }
            }

        });
        // console.log(result)
        return result;
    }, []);

    useEffect(() => {
        if (!currentOrder[1]) return
        const timeout = setTimeout(() => {
            let result = currentOrder[0];

            if (result > items.length) {
                result -= items.length
            }

            if (result < 4) {
                result += items.length
            }

            setCurrentOrder([result, false])

            setIsMoving(false);
        }, 800);

        return () => clearTimeout(timeout)
    }, [currentOrder])

    return !order.size ? <div /> : <div className={styles.bar}>
        <div className={styles.title}>{title}</div>
        <div className={styles.list} ref={listRef}>
            {hasMoved && <Arrow side='<' style={{
                left: 0,
                borderBottomRightRadius: '0.35vw',
                borderTopRightRadius: '0.35vw',
            }} />}
            {Array.from(order).map(([index, ganime]) => <GanimeItem
                ganime={ganime} order={index} isFirst={!hasMoved && index === 0} currentOrder={currentOrder[0]} key={index}
                transitionDisplayed={currentOrder[1]} hasMoved={hasMoved} hasNegative={items.length > 5}
            />)}
            {order.size > 5 && <Arrow side='>' style={{
                right: 0,
                borderBottomLeftRadius: '0.35vw',
                borderTopLeftRadius: '0.35vw',
            }} />}
        </div>
    </div>

    function Arrow({ side, style }) {
        return (<div className={styles.arrow} style={style} onClick={() => {
            if (isMoving) return
            setIsMoving(true);
            let result = currentOrder[0] + (side === '>' ? 5 : -5) + (hasMoved ? 0 : 5)
            setCurrentOrder([result, true]);
            setHasMoved(true);
        }}>
            {side}
        </div>)
    }
}