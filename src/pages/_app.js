import 'styles/themes.css';
import 'styles/globals.css';
import Header from 'components/Header';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Home from 'pages/index';
import Search from 'pages/search';
import GanimeContextWrapper, { useGanimeContext } from 'contexts/GanimeContext';
import { useEffect, useState } from 'react';
import Item from 'pages/item/[item]';

export default function App({ Component, pageProps }) {
    const router = useRouter();
    const [background, setBackground] = useState(undefined);
    const [darkMode, setDarkMode] = useState('off');
    const [searchKeyword, setSearchKeyword] = useState(undefined);

    useEffect(() => {
        document.body.style.overflow = router.route === '/item/[item]' ? 'hidden' : 'scroll';
    });
    useEffect(() => {
        setDarkMode(localStorage.getItem('dark'));
    }, []);

    return <GanimeContextWrapper overwrittingValues={{ setBackground, setDarkMode }}>
        <div id="gaknime-app" className={darkMode === 'on' ? 'dark' : 'light'}>
            <Head>
                <title>각프텔 - 각니메 스트리밍</title>
                <meta name="description" content="각니메들을 손쉽게 플레이리스트로 스트리밍하세요."/>
                <meta name="keywords" content="각별, 각니메, 각프텔"/>
                <meta name="theme-color" content="#eeee00"/>

                <link rel="shortcut icon" href="/favicon.png"/>
            </Head>
            {router.route !== '/item/[item]/[episode]' && <Header searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} />}
            {background ?
                (background.url.startsWith('/search') ? <Search overrideWord={background.q}/> :
                    <Home/>)
                : (router.route === '/item/[item]' ? <Home /> : <Component {...pageProps} />)}

            {router.route === '/item/[item]' && <Item background={background} />}
        </div>
    </GanimeContextWrapper>;
}
