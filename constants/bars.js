import { gaknimes } from 'constants/gaknimes';
import Bar from 'components/Bar';

export const bars = [
    { catchphrase: '웃음이 절로 나오는 미니게임', filter: gaknimes.filter((item) => item.genres.includes("미니게임")) },
    { catchphrase: '엄마, 나 방송에 나왔어요!', filter: gaknimes.filter((item) => item.tags.includes("시참")) },
    { catchphrase: '마크가 아니여도 재밌잖아?', filter: gaknimes.filter((item) => item.genres.includes("일상") || item.genres.includes("마크 외 게임")) },
    { catchphrase: '어르신... 고생하시네요...', filter: gaknimes.filter((item) => item.tags.includes("패널티")) },
    { catchphrase: '지금까지 이런 크루는 없었다. 이것은 싸우는 건가 협동하는 걸까. 공각기동대입니다.', filter: gaknimes.filter((item) => item.tags.includes("공각기동대")) },
    { catchphrase: '우리 학교도 이렇게 가르쳐줬으면 재밌었을텐데...', filter: gaknimes.filter((item) => item.genres.includes("교육")) },
    { catchphrase: '사실은 오래전부터 당신 같은 개발자를 기다려 왔다우', filter: gaknimes.filter((item) => item.genres.includes("개발")) },
]

export function getRandomBars(count) {
    const cloned = [...bars].sort(() => 0.5 - Math.random());
    return cloned.slice(0, count).map((bar, index) => {
        return <Bar key={index} title={bar.catchphrase} items={bar.filter.sort(() => 0.5 - Math.random())} />;
    });
}