import styles from 'styles/Home.module.css'
import Banner from 'components/Banner';
import { banners } from 'constants/banners';
import { bars, getRandomBars } from 'constants/bars';
import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Home() {

    const [displayedBars, setDisplayedBars] = useState();

    useEffect(() => {
        setDisplayedBars(getRandomBars(3));
    }, [bars])

    return (
    <>
        <div className={styles.main}>
            <Banner banner={banners[Math.floor(Math.random() * banners.length)]} />
            <br />
            {displayedBars}
            <br />
        </div>
    </>)
}
