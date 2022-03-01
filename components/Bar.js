import styles from './Bar.module.css';
import GaknimeItem from 'components/GaknimeItem';
import { useEffect, useMemo, useRef, useState } from 'react';
import { gaknimes } from 'constants/gaknimes';

export default function Bar({ title, items }) {

    const listRef = useRef(null);

    const [currentOrder, setCurrentOrder] = useState([0, false]);
    const [hasMoved, setHasMoved] = useState(false);

    const [isMoving, setIsMoving] = useState(false);

    const order = useMemo(() => {
        if (currentOrder[1] === true) return;
        const result = new Map();

        items.forEach((item, key) => {
            result.set(key, item);
            if (items.length > 5) {
                if (items.length >= 10) {
                    if (key < 10) result.set(items.length + key, item);
                } else {
                    result.set(items.length + key, item);
                    if (key < (10 - items.length)) {
                        result.set(items.length * 2 + key, item);
                    }
                }
            }
        });

        return result;
    }, []);

    useEffect(() => {
        if (!currentOrder[1]) return
        const timeout = setTimeout(() => {

            if (!order.has(-1)) {
                setCurrentOrder(current => [current[0] + 6, false])
                for (let i = 1; i <= 6; i++) {
                    order.set(-i, items[items.length - i])
                }
            } else {
                let result = currentOrder[0];


                if (result < 6) {
                    result += items.length;
                } else if (result >= order.size - 10) {
                    result -= items.length;
                }
                setCurrentOrder([result, false])
            }

            setIsMoving(false);
        }, 1200);

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
            {Array.from(order).map(([index, gaknime]) => <GaknimeItem
                gaknime={gaknime} order={index} currentOrder={currentOrder[0]} key={index}
                transitionDisplayed={currentOrder[1]} tilted
            />)}
            {order.size > 5 && <Arrow side='>' style={{
                right: 0,
                borderBottomLeftRadius: '0.35vw',
                borderTopLeftRadius: '0.35vw',
            }} />}
        </div>
    </div>

    function Arrow({ side, style, additionalClass = '' }) {
        return (<div className={styles.arrow + additionalClass} style={style} onClick={() => {
            if (isMoving) return
            setIsMoving(true);
            let result = currentOrder[0] + (side === '>' ? 5 : -5)
            setCurrentOrder([result, true]);
            setHasMoved(true);
        }}>
            {side}
        </div>)
    }
}