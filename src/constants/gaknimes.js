let universalId = 0;

class Gaknime {
    constructor(name, thumbnail, tags = ['없음'], genres = ['없음'], episodes = [{
        title: '', code: '', no_prefix: false, hqdefault: false,
    }], description = '') {
        this.name = name;
        this.thumbnail = thumbnail;
        this.tags = tags;
        this.genres = genres;
        this.description = description;
        this.id = ++universalId;

        this.episodes = episodes;
    }
}

// 태그: 공각기동대, 시참, 패널티, 그 시절
// 장르: 야생, 일상, 개발, 실험, 미니게임, 마크 외 게임, 교육, 소개

export const gaknimes = [
    new Gaknime(
        '좀비생활!', 'Amyg8VJl7Gg', ['공각기동대', '시참'], ['야생'],
        [
            { title: '모든 일의 시작', code: 'Amyg8VJl7Gg' },
            { title: '적은 내부에', code: '_H8XZubT7rw' },
            { title: '결함', code: 'MrwZ1Zh-U4s' },
            { title: '좀비 생활', code: 'Vx4VKIH3sLQ' },
            { title: '대규모 확산', code: 'bYxfMmWC8us' },
            { title: '좀비 지능의 발달', code: 'P7wjk80cKXI' },
            { title: '시뮬레이션', code: 'I5pjJhYZ2Ps' },
            { title: '인간 말살 프로젝트: Alpha', code: 'HA4hXheEMFI' },
            { title: '멸종', code: 'pEKxnwI_DI4' },
            { title: 'OVA 비하인드', code: 'Uhhb8uSYf80', no_prefix: true },
        ], '평화롭던 어느 날 갑자기 등장한 좀비. 시뮬레이션을 돌려서 좀비에게서 대비하고 좀비를 퇴치해야만해!'
    ),
    new Gaknime(
        '마인크래프트 무인도 대탈출 리얼 서바이벌 생존기', 'qnGmq2jATes', ['공각기동대', '시참'], ['야생'],
        [
            { title: '사고', code: 'qnGmq2jATes' },
            { title: '배신', code: 'wjyh896ne3I' },
            { title: '살생', code: '1h1zP34SWz4' },
            { title: '건설', code: 'g9J4xdcp5jQ' },
            { title: '해적', code: '48qftVDS4L8' },
            { title: '탈출', code: 'KpqYlP4V_wM' },
        ], '기나긴 컨텐츠를 촬영한 후에 휴식이 필요했던 각별과 공룡! 즐거운 여행이 될 줄 알았는데... 두 유튜버의 처절한 무인도 탈출기!'
    ),
    new Gaknime(
        '내 부동산이 이렇게 비쌀리가 없어', 'gcDuBGnFwtQ', [''], ['미니게임', '개발'],
        [
            { title: '지역 계획', code: 'gcDuBGnFwtQ' },
            { title: '건물 설계', code: 'iGl8lRxCyl8' },
            { title: '지원', code: '5s5y3b5fm7E' },
            { title: '민주주의의 심판', code: 'w3qHlcewO90' },
            { title: '진행 (1편)', code: 'Qd2VPRzN0-0' },
            { title: '진행 (2편)', code: '412hu4hsf-w' },
            { title: '진행 (3편)', code: 'HTcbF6XOQYg' },
        ], '개발자 각별, 갑자기 보드게임을 만들겠다는 생각이 솟구친다! 드디어 공개되는 각별의 개발일지!'
    ),
    new Gaknime(
        '각별 님은 인벤토리를 확장하고 싶어 ~천재들의 인벤토리 해방전~', 'bO6ZVEeTa5k', ['공각기동대', '패널티'], ['야생'],
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
        ], '한칸의 인벤토리 칸을 가진 각별과 공룡. 아이템을 찾지 못하면 인벤토리를 못 쓰다니! 이렇게 된 이상, 아이템을 찾아야한다!'
    ),
    new Gaknime(
        '새해에 뭐 하세요? 바쁘세요? 해돋이 볼 수 있나요?', '8Hi1Kprk5m8', ['시참'], ['야생'],
        [
            { title: '2020년', code: 'ObciwqTSnNk', no_prefix: true },
            { title: '2021년', code: '8Hi1Kprk5m8', no_prefix: true },
            { title: '2022년', code: 'DGZbQnZGi-w', no_prefix: true },
        ], '새해가 되면 해의 첫 해돋이를 보라고 많은 사람들은 노력하지. 근데, 게임에서도 보지 말라는 법은 없잖아? 게임에서 실제로 해가 뜨는 마법같은 해돋이!'
    ),
    new Gaknime(
        '배신의 형태', 'umrhcUDEoeQ', ['패널티'], ['야생'],
        [
            { title: '모든 것의 시작', code: 'umrhcUDEoeQ' },
            { title: '부주의', code: 'zq8NLUnYqcY' },
            { title: '고속도로가 일으킨 전쟁', code: 'RQnjxdWe4Cg' },
            { title: '전쟁 준비', code: '-IFBvG0avRE' },
            { title: '완벽 범죄', code: 'q4IpHXo2wcc' },
            { title: '테러 그리고 살생', code: 'z5-epr7ucaM' },
            { title: 'OVA 비하인드', code: 'yoQuwKlsdLY', no_prefix: true },
        ], '소통이 없다. 분명 여러명이서 하지만 혼자 같은 이 기분. 하지만, 한 가지 확실한것은... 그들의 사이는 심각하게 나쁘다.'
    ),
    new Gaknime(
        '노 부품 노 방송', '3X_XMJ2whOU', [''], ['일상', '소개'],
        [
            { title: '그래픽 카드 Graphic Card', code: '4XQ0fWI1UrA' },
            { title: '램 RAM', code: 'YETAjYLODos' },
            { title: '조립 Assembly', code: '73ON0H0TTP0' },
            { title: '소개 Introduction', code: '3X_XMJ2whOU' },
        ], '이 부품이 아니라면, 대체 방송을 어떻게 하라고요? 방송을 키고 싶은 컴퓨터 부품 애호가 청년의 이야기.'
    ),
    new Gaknime(
        '각별의 기묘한 능력', 'kMJWVBGLrA4', [''], ['개발'],
        [
            { title: '기획자 공룡과 트수들', code: '5dV1zqGub5E' },
            { title: '나선수리검을 사용하는 자', code: 'jeJ80Ia-W6g' },
            { title: '새로운 능력자의 탄생!!', code: 'hOgkDxQatIk' },
            { title: '최신 능력자로 개발하라', code: 'kMJWVBGLrA4' },
            { title: '진정한 테러리스트', code: 'zPTzSYdG1wM' },
            { title: '바람으로 돌아간 광전사', code: 'EGSk5OrgAzU' },
            { title: '마크의 골렘', code: 'xXI8ebP2y8k' },
        ], '여러 이들에게 개발자의 꿈을 심어준 한 작품! 태초에 능력을 만들 수 있는 개발자 각별이 있었다...!'
    ),
    new Gaknime(
        '서버를 잘 만드는 각별씨', 'Wte0_as9h3E', ['공각기동대'], ['개발', '실험', '소개'],
        [
            { title: '기획 시간', code: 'Wte0_as9h3E' },
            { title: '땅', code: 'MjPrylBmNaw' },
            { title: '재산 보호', code: 'V_E4jicEtks' },
            { title: '테러', code: 'UacQdT_h16Q' },
            { title: '농사 시간', code: 'CXSVfswk6E0' },
            { title: '농사 통제', code: '3Kfp2CRV5pY' },
            { title: '탐방', code: 'sLgMuH-7Ohs' },
            { title: '숙제', code: 'G9OOOacxt0o' },
        ], '\'인기\'를 갖고 싶은 한 청년─ 그는 서버를 만들어 과거의 영광을 되찾고 싶다. 땅 주인만 활동 할 수 있는, 아주 자본주의적인 서버를 제작을 할 것이다.'
    ),
    new Gaknime(
        '주문은 돌입니까?', 'Q30OeBJ9NEs', ['시참'], ['미니게임'],
        [
            { title: '옛날에 있던 전통을 요즘 시대로 재해석해봤어', code: 'FqAD6Z2Ivoo', hq_default: true },
            { title: '옛날 멤버들와 비교적 최신 멤버들', code: 'uZOSLgIVjDo' },
            { title: '추석에 하는 돌 던지기 게임 통칭 추석전', code: 'CqScnfhF54I' },
            { title: '각별은 멤버쉽들을 초대하고 버그를 고치며 석전을 테스트한다', code: '4sd1ZXAQnxI' },
            { title: '저번 석전 기억해? 팀원 조차도 모두가 각별을 죽이려 했잖아', code: 'Q30OeBJ9NEs' },
        ], '적 코어를 파괴해야해! 수없이 날라다니는 돌, 그 사이에서 과연 코어를 지키고 우승할 수 있을까?'
    ),
    new Gaknime(
        '휴먼 슬레이어', 'ZCpwesUfQnQ', ['시참', '패널티'], ['야생'],
        [
            { title: '탑을 건설해라', code: '-gTfedY0Glg' },
            { title: '서로를 죽이는 자', code: 'ZCpwesUfQnQ' },
            { title: '마니또들', code: '-fQ6pWIR6cU' },
            { title: '공산주의와 트롤과 살생', code: 'ZkwWXfDzIbA' },
            { title: '떠넘기기의 싸움터의 살생자들', code: 'LLqzozOG5KI' },
            { title: '뜻밖의 조별과제', code: 'MJl_geN9h2w' },
        ], '각별이 야심차게 기획한 배틀로얄 서바이벌! 그중에서 살아남고 우승하는 유일한 사람은 과연 누구일까?'
    ),
    new Gaknime(
        '돈 몇 원까지 보낼 수 있어?', 'ZiSL5-0mdKs', ['공각기동대', '패널티'], ['야생'],
        [
            { title: '돈 좀 안 보내줄 수 있어?', code: 'ppVDIBlB34g' },
            { title: '케이크를 만들고 싶으면 어떻게 해?', code: 'ppa-6tB9d-c' },
            { title: '케이크 만드는 거 방해하지 말아줄래?', code: '_SidjuAntpA' },
            { title: '케이크 제발 좀 만들게 해줄래?', code: 'KaHcwTMRpbI' },
            { title: '농장 만드는 거 도와줄래?', code: 'ZiSL5-0mdKs' },
            { title: '경제적인 여유를 가진 사람들에게 돈 더 받을 수 있어?', code: 'LSzwtXM6WFo' },
            { title: '돈으로 한 번 맞아볼래?', code: 'nm8Bdvons8I' },
            { title: '이번에 드래곤을 잡을 수가 있었어?', code: 'oRH_qPuwjo8' },
        ], '돈이 고픈 각별과 공룡. 그래서 후원을 받기로 하는데... 뭔가가 이상하다? 각별과 공룡의 익스트림 야생 챌린지!'
    ),
    new Gaknime(
        '전생했더니 악령이었던 건에 대하여', '3iEdDWivHus', ['시참'], ['야생'],
        [
            { title: '악령 멤버쉽들', code: '3iEdDWivHus' },
            { title: '악령의 습격', code: 'OlfKR3SWB4Y' },
        ], '몬스터들의 AI가 멍청하다고? 그럼 AI 대신에 유령을 사용하는 건 어떨까? 유령이 조종하는 생명체들 속에서 살아남아라!'
    ),
    new Gaknime(
        '공룡에게 하이퍼코어는 어려워', 'BC-JpD4pmdM', ['공각기동대', '그 시절'], ['야생'],
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
        ], '마크 세계는 참으로 단순하지, 안 그래? 하지만, 이 단순함이 공포로 바뀌는 순간, 너는 죽게 될 거야.'
    ),
    new Gaknime(
        '우리는 자유로운 대화를 못해', 'H2KYHPSewBs', ['공각기동대', '패널티', '그 시절'], ['야생'],
        [
            { title: '각별과 공룡은 [ X ] 중이다', code: '5FHP15Q7LsM' },
            { title: '팀 샐러드는 지금 [ X ] 있다', code: 'Qn6ZT8ymJfc' },
            { title: '그는 [ X ]라고 생각한다', code: 'pkv-KmYBQ9c' },
            { title: '이상한 플레이어들은 [ X ]로 대화한다', code: 'H2KYHPSewBs' },
        ], '소통이 되지만 되지 않는다. 같은 말을 자꾸만 반복하는 이런 이상한 팀원들이랑 어떻게든 살아남아야한다.'
    ),
    new Gaknime(
        '어쨌든 똑똑해', 'k6VZespi7-M', [''], ['개발', '마크 외 게임', '교육'],
        [
            { title: '코드', code: 'k6VZespi7-M' },
            { title: '개발', code: '-3eLKt9RvaY' },
        ], '각별 씨, 개발하는 방법을 가르쳐주세요! 개발자 각별이 그 동안 개발을 잘 할 수 있던 이유가 있었다... 바로 "게임"을 통해서지.'
    ),
    new Gaknime(
        '현실 세계 경험담', 'PY8iz-85__8', [''], ['일상'],
        [
            { title: '「건강검진」', code: 'wtiw91OlS8Y' },
            { title: '「팬」', code: 'fSTAjQ9JJEQ' },
            { title: '「운전」', code: 'PY8iz-85__8' },
        ], '옛날 옛날에 각별이라는 뱀파이어가 있었다. 그는 밖에 나가는 걸 별로 좋아하지 않았지만, 가끔식 나가기는 했다. 그렇기에 그의 현실 세계 경험은 흔하지 않지.'
    ),
    new Gaknime(
        '비효율적인 건 싫으니까 다중작업에 올인하려고 합니다', 'VBeKycekkZI', [''], ['미니게임'],
        [
            { title: '다중작업 특화와 능력 검증', code: 'VBeKycekkZI' },
            { title: '다중작업 특화와 커플의 능력 검증', code: 'YcBGBF3vzOo' },
        ], '요즘 시대는 멀티 태스킹이 중요해진 시대다. 그렇다면, 과연 사람들은 어느 정도로 다중작업을 수행할 수 있을까?'
    ),
    new Gaknime(
        '훈수라는 개념이 존재하지 않는 지루한 각별 방송', 'fa3a-8PuIaQ', [''], ['교육', '소개'],
        [
            { title: '1.16', code: 'XmKV2Iw-7rM', no_prefix: true },
            { title: '1.17', code: 'fa3a-8PuIaQ', no_prefix: true },
            { title: '1.18', code: 'zxZ5IOF-l4Q', no_prefix: true },
        ], '전부터 광물 분포 훈수를 받던 스트리머 각별이 있었다. 많은 훈수를 받던 그는 화가 났다. 그냥 직접 광물 분포를 계산할래!'
    ),
    new Gaknime(
        '몬스터 드롭아웃', 'sh8UuXhxg2w', ['공각기동대', '그 시절'], ['미니게임'],
        [
            { title: '이 게임이 졸렬해질 걸 알게 된 어느 날', code: 'sh8UuXhxg2w' },
            { title: '공각의 비양심적인 날들', code: 'qX2UB3elTTg' },
            { title: '비양심적인 자와 치사한 자와 짭', code: '9KHZPxIDwqg' },
        ], '몬스터를 배치하고 맞추라고? 근데 이건 양심이 있는 건가? 어떻게 이거를 보고 맞출 수 있는 거지?'
    ),
    new Gaknime(
        '청년 각별은 유크타의 초대장을 받지 못한다', 'Hw1t67NqLyY', [''], ['미니게임'],
        [
            { title: '각별은 해커', code: 'PXnza5Qchl4' },
            { title: '두번째 유크타엔 버그가 따르는 법', code: 'Hw1t67NqLyY' },
            { title: '정상이 없는 세상', code: 'dN5roXbykTY' },
        ], '나도 유크타에 초대 받고 싶어! 유튜버들과 친해지고픈 각별...이지만 어째서인지 시스템이 너무나도 허술하다.'
    ),
    new Gaknime(
        '각별 씨는 직진 중입니다', 'BMnbHgJodCA', ['공각기동대', '그 시절'], ['실험'],
        [
            { title: '직진으로만 가는 중입니다', code: 'MF4ExrCHkek' },
            { title: '막을 수 있는 건 보트입니다', code: 'BMnbHgJodCA' },
        ], '직진! 직진! 각별은 지금 직진 중이고 아무도 그의 앞길을 막을 순 없다! 과연 사람들은 그의 앞길을 막을 수 있을까?'
    ),
    new Gaknime(
        '각별교실', '7ecVgs6B62A', ['공각기동대', '그 시절'], ['교육', '소개'],
        [
            { title: '백터의 시간', code: 'NGQWDgG2iNs' },
            { title: '진법의 시간', code: 'Zj0tbZhdjL0' },
            { title: '중력의 시간', code: 'MGdIGKuahK0' },
            { title: '계산의 시간', code: '7ecVgs6B62A' },
        ], '누가 게임 유튜버가 교육적인 영상을 못 올린다고 하지? 마인크래프트로 수학을 재밌게 가르쳐주는 #1 강사, 각별!'
    ),
    new Gaknime(
        '복수를 위해서라면, 나는 크리퍼도 악랄하게 숨길 수 있을지 몰라', 'iwgwUmVFUFU', ['공각기동대', '그 시절'], ['미니게임'],
        [
            { title: '청년, 크리퍼를 숨긴다', code: 'iwgwUmVFUFU' },
            { title: '악마 사과, 크리퍼 찾기를 시작하다', code: '7-MHSmOaXQI' },
            { title: '청년, 상추를 속이다', code: 'hXsiloqC6Mk' },
        ], '크리퍼 숨기기 전문가에게 당해버린 개발자 각별... 그럼 내가 더 악랄하게 숨겨버리면 되는 거 아닌가? 각별의 크리퍼 숨기기 복수극!'
    ),
    new Gaknime(
        '고인물 망겜의 캐리 플래그밖에 없는 고인물이랑 팀이 되어버렸다...', 'fDZwpmLrWxY', [''], ['미니게임'],
        [
            { title: '고인물의 교육을 받아버리고 말았다...', code: 'fDZwpmLrWxY' },
            { title: '고인물과 저격만이 있는 게임을 플레이하고 말았다...', code: 'HWRSTnVTdmU' },
        ], '나도 컨트롤을 더 잘하고 싶어! 고인물들이 활개 치는 세상에 왔는데... 왜 오히려 팀원 고인물이 다 해주고 있는 거지?'
    ),
    new Gaknime(
        '그날 본 꽃의 이름을 안 우리는 지금 죽었다', 'H1MMp8NEeUI', ['공각기동대'], ['미니게임'],
        [
            { title: '움직이고 움직이지 말아줘', code: '7Ht-1rtzllU' },
            { title: '타인을 골로 보내는 모임', code: 'H1MMp8NEeUI' },
        ], '그날 본 꽃의 이름은 아는 사람은 없다... 그들은 다 죽었기에. 절대로 꽃이 피는 거를 봐서는 안 된다!'
    ),
    new Gaknime(
        '너에게 판결이 내려왔다!', 'g_8svQAq-fw', [''], ['일상'],
        [
            { title: '때리고싶은 기분', code: 'g_8svQAq-fw' },
        ], '이런 신성한 트위치 방송에서 더러운 채팅을 쓰다니! 판사 각별은 트위치 방송의 악성 유저들을 심판하고 판결을 내린다.'
    ),
    new Gaknime(
        '마크에서 돈을 추구하면 안 되는 걸까', 'JPaKFwSlE8w', ['공각기동대'], ['야생'],
        [
            { title: '운영자', code: 'JPaKFwSlE8w' },
            { title: '행운 전쟁', code: 'HPGA5N7D-qs' },
        ], '아무리 생각해도 분하다. EULA 때문에 여태까지 서버를 만들면서 얻은 수익은 0원. 그럼 잠깐만, 유저가 아니라 지인에게 돈을 받는 건 괜찮으라나?'
    ),
    new Gaknime(
        '모드를 만드면서 3년, 모르는 사이에 쓸곳이 없어졌습니다', '2_RK7i6tthM', ['공각기동대'], ['소개'],
        [
            { title: '앵무새 크루가 없어져 버렸다', code: 'GYcKb7Icn-k' },
            { title: '카메라 조절이 됐다', code: '2_RK7i6tthM' },
        ], '그 시절에 영상 촬영을 위해서 모드를 개발했는데... 거기서 나오면서 쓸 곳이 없어진 게 말이 되냐고. 그러면 소개를 해서라도 쓸곳을 만들어야지!'
    ),
    new Gaknime(
        '방송을 본다면 마크가 없더라도 시참을 할 수 있나요?', 'UHNAv3rHl5A', ['시참'], ['미니게임'],
        [
            { title: '트수들은 싸움을 할 거야☆ 대작전', code: 'UHNAv3rHl5A' },
            { title: '민주주의가 있는 윷놀이!?', code: 'gX175lzRsFA' },
        ], '시청자 참여를 하고 싶은데 마인크래프트가 없는 방송 시청자들이 있다. 그럼 그런 분들을 위해서 마인크래프트 없이도 참여할 수 있도록 만들면 되지!'
    ),
    new Gaknime(
        '서버종료여행', 'CIcB-DbntWQ', ['공각기동대', '그 시절'], ['소개'],
        [
            { title: '육성', code: 'J-ERl5Dbp4o' },
            { title: '인생', code: 'CIcB-DbntWQ' },
        ], '서비스 종료가 됐던 추억의 서버들... 과거를 그리워하는 자가 서비스 종료된 서버들을 찾으려 여행을 시작했다.'
    ),
    new Gaknime(
        '이 멋진 야생에 제약을!', '1kNDTiizTSc', ['공각기동대', '패널티', '그 시절'], ['야생'],
        [
            { title: '이 야생에 기차놀이를!', code: '7de-9NoGaWE' },
            { title: '이 야생에 과몰입을!', code: '1kNDTiizTSc' },
            { title: '이 야생에 죽음의 눈빛을!', code: 'sRHAXESuiTQ' },
            { title: '이 야생에 빼빼로를!', code: 'oad-GBpiI4g' },
            { title: '이 야생에 최적화를!', code: 'Z7x9e7c2fLo' },
            { title: '이 야생에 환경법을!', code: 'fmB2YnCz6xE' },
            { title: '이 야생에 용암을!', code: 'QE_FD2oRhWc' },
            { title: '이 야생에 돼지 탑승자를!', code: 'mJ_JAMeNMng' },
            { title: '이 야생에 혼란을!', code: 'PDcyGYJ346Y' },
            { title: '이 야생에 화살 이동을!', code: 'TcCNoUehy-o' },
            { title: '이 야생에 순서를!', code: 'NOhjYY9GWTs' },
        ], '마인크래프트를 사랑하는 플러그인 개발자 청년, 각별에게는 야생이 너무나도 쉬웠다. 그런 그에게 제약을 걸어, 야생을 하라는 신의 말의 따라 제약을 하게되는데...'
    ),
    new Gaknime(
        '역시 내 아이템 조합 확률은 잘못됐다.', 'ZEBqc0plf9M', ['패널티'], ['야생'],
        [
            { title: '이렇게 그들의 가챠 게임은 시작된다', code: 'ZEBqc0plf9M' },
        ], '야생에는 레시피라는 개념이 존재한다. 하지만, 이러한 레시피에도 확률이 존재하게 되는데... 이렇게 그들의 가챠 게임은 시작됐다.'
    ),
];
