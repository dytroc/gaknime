let universalId = 0;

class Ganime {
    constructor(name, thumbnail, tags = ["없음"], genres = ["없음"], episodes = [{
        title: "", code: "", no_prefix: false, hqdefault: false
    }]) {
        this.name = name;
        this.thumbnail = thumbnail;
        this.tags = tags;
        this.genres = genres;
        this.id = ++universalId;

        this.episodes = episodes;
    }
}

// 태그: 공각기동대, 시참, 패널티
// 장르: 야생, 일상, 개발, 실험, 미니게임, 마크 외 게임, 교육

export const ganimes = [
    new Ganime(
        "좀비생활!", "Amyg8VJl7Gg", ["공각기동대", "시참"], ["야생"],
        [
            { title: '모든 일의 시작', code: 'Amyg8VJl7Gg' },
            { title: '인간이라는 더 위험한 존재', code: '_H8XZubT7rw' },
            { title: '결함', code: 'MrwZ1Zh-U4s' },
            { title: '좀비 생활', code: 'Vx4VKIH3sLQ' },
            { title: '대규모 확산', code: 'bYxfMmWC8us' },
            { title: '좀비 지능의 발달', code: 'P7wjk80cKXI' },
            { title: '시뮬레이션', code: 'I5pjJhYZ2Ps' },
            { title: '인간 말살 프로젝트: Alpha', code: 'HA4hXheEMFI' },
            { title: '멸종', code: 'pEKxnwI_DI4' },
            { title: 'OVA 비하인드', code: 'Uhhb8uSYf80', no_prefix: true },
        ]
    ),
    new Ganime(
        "마인크래프트 무인도 대탈출 리얼 서바이벌 생존기", "qnGmq2jATes", ["공각기동대", "시참"], ["야생"],
        [
            { title: '사고', code: 'qnGmq2jATes' },
            { title: '배신', code: 'wjyh896ne3I' },
            { title: '살생', code: '1h1zP34SWz4' },
            { title: '건설', code: 'g9J4xdcp5jQ' },
            { title: '해적', code: '48qftVDS4L8' },
            { title: '탈출', code: 'KpqYlP4V_wM' },
        ]
    ),
    new Ganime(
        "내 부동산이 이렇게 비쌀리가 없어", "gcDuBGnFwtQ", [""],["미니게임"],
        [
            { title: '지역 계획', code: 'gcDuBGnFwtQ' },
            { title: '건물 설계', code: 'iGl8lRxCyl8' },
            { title: '지원', code: '5s5y3b5fm7E' },
            { title: '민주주의의 심판', code: 'w3qHlcewO90' },
            { title: '진행 (1편)', code: 'Qd2VPRzN0-0' },
            { title: '진행 (2편)', code: '412hu4hsf-w' },
            { title: '진행 (3편)', code: 'HTcbF6XOQYg' },
        ]
    ),
    new Ganime(
        "각별 님은 인벤토리를 확장하고 싶어", "bO6ZVEeTa5k", ["공각기동대", "패널티"], ["야생"],
        [
            { title: '각별 님은 인벤토리를 확장하고 싶어', code: 'bUziXPSoP30' },
            { title: '각별 님은 탐험을 하고 싶어', code: 'YQvLfQsyAfo' },
            { title: '공룡 님은 독립을 하고 싶어', code: 'd3nIZT3XSpY' },
            { title: '공룡 님은 명령을 하고 싶어', code: '05qjQQcOBSo' },
            { title: '각별 님은 유튭각을 뽑고 싶어', code: 'lOvR1LPtI78' },
            { title: '각별 님은 내기를 이기고 싶어', code: 'bO6ZVEeTa5k' },
            { title: '각별 님은 네더라이트를 얻고 싶어', code: '4vhwbUEAxEE' },
            { title: '공룡 님은 내기를 이기고 싶어', code: 'FtF_xS7VD-w' },
            { title: '각별 님은 동거를 끝내고 싶어', code: 'mgCnMmUN6WQ' },
        ]
    ),
    new Ganime(
        "새해에 뭐 하세요? 바쁘세요? 해돋이 볼 수 있나요?", "8Hi1Kprk5m8", ["시참"], ["야생"],
        [
            { title: '2020년', code: 'ObciwqTSnNk', no_prefix: true },
            { title: '2021년', code: '8Hi1Kprk5m8', no_prefix: true },
            { title: '2022년', code: 'DGZbQnZGi-w', no_prefix: true },
        ]
    ),
    new Ganime(
        "배신의 형태", "umrhcUDEoeQ", ["패널티"], ["야생"],
        [
            { title: '모든 것의 시작', code: 'umrhcUDEoeQ' },
            { title: '부주의', code: 'zq8NLUnYqcY' },
            { title: '고속도로가 일으킨 전쟁', code: 'RQnjxdWe4Cg' },
            { title: '전쟁 준비', code: '-IFBvG0avRE' },
            { title: '완벽 범죄', code: 'q4IpHXo2wcc' },
            { title: '테러 그리고 살생', code: 'z5-epr7ucaM' },
            { title: 'OVA 비하인드', code: 'yoQuwKlsdLY', no_prefix: true },
        ]
    ),
    new Ganime(
        "노 부품 노 방송", "3X_XMJ2whOU", [""], ["일상"],
        [
            { title: '그래픽 카드 Graphic Card', code: '4XQ0fWI1UrA' },
            { title: '램 RAM', code: 'YETAjYLODos' },
            { title: '조립 Assembly', code: '73ON0H0TTP0' },
            { title: '소개 Introduction', code: '3X_XMJ2whOU' },
        ]
    ),
    new Ganime(
        "각별의 기묘한 능력", "kMJWVBGLrA4", [""], ["개발"],
        [
            { title: '기획자 공룡과 트수들', code: '5dV1zqGub5E' },
            { title: '나선수리검을 사용하는 자', code: 'jeJ80Ia-W6g' },
            { title: '새로운 능력자의 탄생!!', code: 'hOgkDxQatIk' },
            { title: '최신 능력자로 개발하라', code: 'kMJWVBGLrA4' },
            { title: '진정한 테러리스트', code: 'zPTzSYdG1wM' },
            { title: '바람으로 돌아간 광전사', code: 'EGSk5OrgAzU' },
            { title: '마크의 골렘', code: 'xXI8ebP2y8k' },
        ]
    ),
    new Ganime(
        "서버를 잘 만드는 각별씨", "Wte0_as9h3E", [""], ["개발", "실험"],
        [
            { title: '기획 시간', code: 'Wte0_as9h3E' },
            { title: '땅', code: 'MjPrylBmNaw' },
            { title: '재산 보호', code: 'V_E4jicEtks' },
            { title: '테러', code: 'UacQdT_h16Q' },
            { title: '농사 시간', code: 'CXSVfswk6E0' },
            { title: '농사 통제', code: '3Kfp2CRV5pY' },
            { title: '탐방', code: 'sLgMuH-7Ohs' },
            { title: '숙제', code: 'G9OOOacxt0o' },
        ]
    ),
    new Ganime(
        "주문은 돌입니까?", "Q30OeBJ9NEs", ["시참"], ["미니게임"],
        [
            { title: '옛날에 있던 전통을 요즘 시대로 재해석해봤어', code: 'FqAD6Z2Ivoo', hq_default: true },
            { title: '옛날 멤버들와 비교적 최신 멤버들', code: 'uZOSLgIVjDo' },
            { title: '추석에 하는 돌 던지기 게임 통칭 추석전', code: 'CqScnfhF54I' },
            { title: '각별은 멤버쉽들을 초대하고 버그를 고치며 석전을 테스트한다', code: '4sd1ZXAQnxI' },
            { title: '저번 석전 기억해? 팀원 조차도 모두가 각별을 죽이려 했잖아', code: 'Q30OeBJ9NEs' },
        ]
    ),
    new Ganime(
        "휴먼 슬레이어", "ZCpwesUfQnQ", ["시참", "패널티"], ["야생"],
        [
            { title: '탑을 건설해라', code: '-gTfedY0Glg' },
            { title: '서로를 죽이는 자', code: 'ZCpwesUfQnQ' },
            { title: '마니또들', code: '-fQ6pWIR6cU' },
            { title: '공산주의와 트롤과 살생', code: 'ZkwWXfDzIbA' },
            { title: '떠넘기기의 싸움터의 살생자들', code: 'LLqzozOG5KI' },
            { title: '뜻밖의 조별과제', code: 'MJl_geN9h2w' },
        ]
    ),
    new Ganime(
        "돈 몇 원까지 보낼 수 있어?", "ZiSL5-0mdKs", ["공각기동대", "패널티"], ["야생"],
        [
            { title: '돈 좀 안 보내줄 수 있어?', code: 'ppVDIBlB34g' },
            { title: '케이크를 만들고 싶으면 어떻게 해?', code: 'ppa-6tB9d-c' },
            { title: '케이크 만드는 거 방해하지 말아줄래?', code: '_SidjuAntpA' },
            { title: '케이크 제발 좀 만들게 해줄래?', code: 'KaHcwTMRpbI' },
            { title: '농장 만드는 거 도와줄래?', code: 'ZiSL5-0mdKs' },
        ]
    ),
    new Ganime(
        "전생했더니 악령이었던 건에 대하여", "3iEdDWivHus", ["시참"], ["야생"],
        [
            { title: '악령 멤버쉽들', code: '3iEdDWivHus' },
            { title: '악령의 습격', code: 'OlfKR3SWB4Y' },
        ]
    ),
    new Ganime(
        "공룡에게 하이퍼코어는 어려워", "BC-JpD4pmdM", ["공각기동대"], ["야생"],
        [
            { title: '스켈리톤', code: '4UV8gM5-KKM' },
            { title: '크리퍼', code: '8zfvDxB6yNc' },
            { title: '좀비', code: 'XQlzLndIJnw' },
            { title: '돼지', code: '1c-7f0-dEw8' },
            { title: '나무', code: 'yc9QEmQF57w' },
            { title: '노란딱지', code: 'CbAEa-b0uW8' },
            { title: '세배', code: 'tweUgXWMCfE' },
            { title: '블록', code: 'mTFcrJrTgj8' },
            { title: '월드보더', code: 'W3QmXh0Z_Jw' },
            { title: '공룡', code: 'BC-JpD4pmdM' },
            { title: '눈물', code: 'ZDgnu2kJ6b8' },
        ]
    ),
    new Ganime(
        "우리는 자유로운 대화를 못해", "H2KYHPSewBs", ["공각기동대", "패널티"], ["야생"],
        [
            { title: '각별과 공룡은 [ X ] 중이다', code: '5FHP15Q7LsM' },
            { title: '팀 샐러드는 지금 [ X ] 있다', code: 'Qn6ZT8ymJfc' },
            { title: '그는 [ X ]라고 생각한다', code: 'pkv-KmYBQ9c' },
            { title: '이상한 플레이어들은 [ X ]로 대화한다', code: 'H2KYHPSewBs' },
        ]
    ),
    new Ganime(
        "어쨌든 똑똑해", "k6VZespi7-M", [""], ["개발", "마크 외 게임", "교육"],
        [
            { title: '코드', code: 'k6VZespi7-M' },
            { title: '개발', code: '-3eLKt9RvaY' },
        ]
    ),
    new Ganime(
        "현실 세계 경험담", "PY8iz-85__8", [""], ["일상"],
        [
            { title: '「건강검진」', code: 'wtiw91OlS8Y' },
            { title: '「팬」', code: 'fSTAjQ9JJEQ' },
            { title: '「운전」', code: 'PY8iz-85__8' },
        ]
    ),
    new Ganime(
        "비효율적인 건 싫으니까 다중작업에 올인하려고 합니다", "VBeKycekkZI", [""], ["미니게임"],
        [
            { title: '다중작업 특화와 능력 검증', code: 'VBeKycekkZI' },
            { title: '다중작업 특화와 커플의 능력 검증', code: 'YcBGBF3vzOo' },
        ]
    ),
    new Ganime(
        "훈수라는 개념이 존재하지 않는 지루한 각별 방송", "fa3a-8PuIaQ", [""], ["교육"],
        [
            { title: '1.16', code: 'XmKV2Iw-7rM', no_prefix: true },
            { title: '1.17', code: 'fa3a-8PuIaQ', no_prefix: true },
            { title: '1.18', code: 'zxZ5IOF-l4Q', no_prefix: true },
        ]
    ),
    new Ganime(
        "몬스터 드롭아웃", "sh8UuXhxg2w", ["공각기동대"], ["미니게임"],
        [
            { title: '이 게임이 졸렬해질 걸 알게 된 어느 날', code: 'sh8UuXhxg2w' },
            { title: '공각의 비양심적인 날들', code: 'qX2UB3elTTg' },
            { title: '비양심적인 자와 치사한 자와 짭', code: '9KHZPxIDwqg' },
        ]
    ),
]