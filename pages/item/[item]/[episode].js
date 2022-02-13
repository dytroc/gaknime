import { useRouter } from 'next/router';
import { ganimes } from 'constants/ganimes';
import { useMemo } from 'react';
import ReactPlayer from 'react-player'


export default function Episode() {
    const router = useRouter();
    const { item, episode } = router.query;

    const ganime = useMemo(() => ganimes.find((anime) => anime.id.toString() === item), [item]);

    if (!ganime) return <div />;

    return <div>
        <ReactPlayer
            url={"https://youtu.be/" + ganime.episodes[episode - 1].code}
            autoplay
            controls
            style={{
                position: 'fixed',
                top: 0,
                zIndex: 0,
            }}

            width="100vw"
            height="100vh"

            playing
            pip={false}

            onEnded={() => {
                router.push({ pathname: `/item/${item}/${Number(episode) < ganime.episodes.length ? Number(episode) + 1 : ''}` } )
            }}
        />
        <div id="back" style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100vw',
            position: 'fixed',
            top: 0,
            zIndex: 10,
            height: '25vh',
            cursor: 'pointer'
        }} onClick={() => router.push({ pathname: '/' })}>
            <div id="back-button" style={{
                position: 'fixed',
                zIndex: 10,
                color: 'white',
                fontWeight: 'bold',
                fontSize: '2.5vw',
                top: '1vh',
                textShadow: '0 0 0.25vw black'
            }}>뒤로 돌아가기</div>
        </div>
    </div>;
}