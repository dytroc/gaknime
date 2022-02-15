import styles from 'styles/Home.module.css'
import Banner from 'components/Banner';
import { banners } from 'constants/banners';
import { bars, getRandomBars } from 'constants/bars';
import { useEffect, useState } from 'react';

export default function Home() {

    const [displayedBars, setDisplayedBars] = useState();
    const [banner, setBanner] = useState(banners[0]);

    useEffect(() => {
        setDisplayedBars(getRandomBars(4));
        setBanner(banners[Math.floor(Math.random() * banners.length)])
    }, []);


    return (
    <>
        <div className={styles.main}>
            <Banner banner={banner} />
            <br />
            {displayedBars}
            <br />
        </div>
    </>)
}
