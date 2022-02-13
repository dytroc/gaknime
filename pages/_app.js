import '../styles/globals.css'
import Header from '../components/Header';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
    const router = useRouter();

    return (<div id="gaknime-app">
        <Head>
            <title>각프텔 - 각니메 스트리밍</title>
            <meta name="description" content="각니메들을 손쉽게 플레이리스트로 스트리밍하세요." />
            <meta name="keywords" content="각별, 각니메, 각프텔" />
            <meta name="theme-color" content="#eeee00" />
        </Head>
        {router.route !== '/item/[item]/[episode]' && <Header />}
        <Component style={{
            background: 'red'
        }} {...pageProps} />
    </div>);
}
