import styled from "styled-components";

const data = [
  {
    year: "2010",
    content: {
      "08": "드라마 <해머 세션!>주제가 'LIAR'로 메이저 데뷔(8/11) / SUMMER SONIC'10 출연",
      "12": "애니메이션 「BLEACH」ED 테마 2nd Single 「Last Moment」발매 (12/1) 도쿄 최초 원맨 개최(시부야 BOXX)",
    },
  },
  {
    year: "2011",
    content: {
      "03": "인디시대의 대표곡 [재패니케이션]을 재록, 3rd Single로 발매(3/16)",
      "06": "애니메이션 『은혼』ED 테마 4th SIingle 「사무라이 하트 (Some Like It Hot!!)」발매 (6/8)",
      "07": "국내 최대 야외 록 페스티벌 JISAN VALLEY ROCK FESTIVAL 2011 출연",
      "08": "드라마 『돈키호테』주제가 5th SIingle 「BEAUTFUL DAYS」발매(8/24)",
      "09": "1st Album 'Rockin' the World' 한일 동시 발매(9/21).오리콘 위클리 8위, 한국 J-POP차트 1위",
      "10": "첫 히비야 야외 대음악당 원맨 라이브 개최 (10/30) 《SOLD OUT》",
      "12": "도메이한 원맨 『SPYAIR TOUR 2011 「Rockin' the World」, 추가 공연으로서 한국에서 행해진 첫 원맨 라이브가 전개소 SOLD OUT\n-한국의 인기 노래 프로그램 Mnet 'Mcountdown'에 출연하여 한국 검색어 순위 1위 획득.",
    },
  },
  {
    year: "2012",
    content: {
      "01": "첫 전달 한정 싱글 [MOVIN'ON] 전달 (1/1)",
      "03": "애니메이션 『기동전사 건담 AGE』ED 테마 6th Single 「My World」\n-Live DVD 'SPYAIR LIVE at 노네 'Just Like This 2011' 같은 날 발매 (3/14)\n-첫 대규모 전국투어 개최. (3/16~5/6 전국 14개소 15공연)",
      "06": "영화 『어메이징 스파이더맨』일본판 테마송 7th Single 「0 GAME」 발매 (6/27)\n-여름에는 서머소닉과 국내 최대 야외 록 페스티벌 'JISAN VALLEY ROCK FESTIVAL 2012' 등 수많은 페스티벌에 출연",
      "09": "8th 싱글 「Naked」(9/5), 2nd Album 「Just Do It」한일 동시 발매(9/19).한국 서양음악 차트 1위 등극",
      "11": "NHK의 ☆드라마 '사랑하는 파리녀' 주제가 9th Single 'WENDY ~It's You~' 발매",
      "12": "첫 일본 무도관 원라이브(12/18)를 개최.이 날짜로 DJ ENZEL☆가 탈퇴",
    },
  },
  {
    year: "2013",
    content: {
      "03": "애니메이션 「은혼」ED테마 10th Single 「사쿠라미쯔츠키」발매(3/13).오리콘 위클리 10위\n-같은 날 Live DVD 'SPYAIR LIVE at 일본무도관' 발매",
      "05": "TBS계열 목요드라마 9 잠입탐정 도마뱀 주제가 11th Single '무지개' 발매 (5/29)",
      "07": "『극장판 은혼 완결편』 만사꾼아 영원하라 주제가 12th Single <현상 디스트럭션> 발매(7/3).오리콘 위클리 6위\n-한국 록페스 'CITY BREAK'@ 올림픽스타디움 출연",
      "08": "3rd Album 'MILLION' 발매(8/7).오리콘 위클리 2위, 한국 양악 차트 1위.유럽 50개국 출시",
      "09": "파리에서 개최된 「Tokyo Crazy Kawaii Paris」에 출연.\n-한국 원맨 라이브 2 DAYS 개최 'SOLD OUT'",
      "11": "'노이타미나' 애니메이션 '사무라이 플라멩코' OP 테마 13th Single 'JUST ONE LIFE' 발매 (11/13)\n-첫 전국 홀 투어 개최.모든 곳 당일 SOLD OUT (11/8~12/27 전국 9개 도시 11개 공연)",
    },
  },
  {
    year: "2014",
    content: {
      "03": "Live DVD 'SPYAIR TOUR 2013 'MILLION'' 릴리즈 (3/26)",
      "04": "MBS/TBS계열 TV애니메이션 「하이큐!!」OP 테마 14th Single 「이매지네이션」발매(4/30).오리콘 위클리 9위",
      "05": "전국 7개 도시에서 개최 예정인 Zepp투어를 IKE의 목 트러블로 인해 중단",
      "11": "첫 베스트 앨범 BEST 발매(11/26).오리콘 위클리 3위",
      "12": "봄 전국투어 중단 이후 약 7개월 만의 단독공연 'SPYAIR LIVE 2014~부활~'을 Zepp DiverCity (TOKYO)에서 개최 'SOLD OUT'",
    },
  },
  {
    year: "2015",
    content: {
      "03": "15th 싱글 [ROCIKN' OUT] 발매 (3/25)",
      "04": "한국 MuV Hall에서 원맨 라이브 『SPYAIR LIVE in Seoul 2015』 개최\n-전국투어 'SPYAIR LIVE 2015 'ROCKIN' OUT'' 개최. (4/14~5/20 전국 7개 도시 8개 공연)",
      "07": "닛폰TV×Hulu 공동제작 드라마 『THE LAST COP/라스트컵』주제가 16th 싱글 「파이어 스타터」릴리스 (7/22)\n-후지큐 하이랜드·코니퍼 포레스트에서 1만명 단독 야외 라이브 'JUST LIKE THIS 2015'개최",
      "09": "대만·타이중시가 주최하는 야외 이벤트 「Rock In Taichung」에 출연.새 역할을 맡아 약 7,000명의 록 팬을 열광시키다",
      "10": "TV 애니메이션 『하이큐 !! 세컨드 시즌』OP 테마 「아임 어 빌리버 」발매 (10/21)",
      "11": "4집 앨범 [4] 발매(11/18).오리콘 위클리 6위",
      "12": "한국 MuV Hall에서 원맨 라이브 'SPYAIR LIVE in SEOUL ~ I'MA BELIEVER 2015 AGAIN!' 개최\n-첫 2 대 아레나 투어 'DYNAMITE~싱글 전부 야리마스~'를 개최. (12/13 일본 가이시 홀, 12/22 사이타마 슈퍼 아레나)",
    },
  },
  {
    year: "2016",
    content: {
      "01": "01월 첫 대만 원맨 라이브 'SPYAIR LIVE in Taipei~I'MA BELIEVER 2016'를 타이베이 ATT SHOW BOX에서 개최 'SOLD OUT'\n-Live DVD 'JUST LIKE THIS 2015' 발매 (1/13)\n-전국 홀투어 'SPYAIR TOUR 2016'4-for-'' 개최. (1/16~3/10 전국 10개 도시 14개 공연)",
      "03": "03월 프랑스에서의 첫 원맨을 파리 La Machine du Moulin Rouge에서 개최(3/16). 1,000명이 열광!",
      "05": "05월 2015년 말의 2대 아레나 투어 'DYNAMITE~싱글 전부 야리마스~'에서 사이타마 슈퍼 아레나를 완전 수록한 Live DVD 릴리스 (5/11)",
      "07": "07월 『JUST LIKE THIS 2016』공식 테마송 18th Single 「THIS IS HOW WE ROCK」발매 (7/13)\n-후지큐 하이랜드·코니퍼 포레스트에서 단독 야외 라이브 'JUST LIKE THIS 2016'을 개최, 13,000명 동원",
      "10": "10월 TV애니메이션 기동전사 건담 철혈의 올펜즈' 제2기 OP 테마 19th Single 'RAGE OF DUST' 발매 (11/9)",
      "12": "12월 7월에 후지큐 하이랜드에서 개최된 단독 야외 라이브 'JUST LIKE THIS 2016'을 수록한 Live DVD 릴리스 (12/28)\n-도메이한 아레나 투어 《한겨울의 대서커스》 개최 (12/29~2017/1/21 전국 3개 도시 5개 공연)",
    },
  },
  {
    year: "2017",
    content: {
      "03": "20th Single <Be with> 발매 (3/29)",
      "05": "1월에 국립 요요기 경기장 제1체육관에서 개최된 아레나 투어 《한겨울의 대서커스》를 수록한 Live DVD 릴리스 (5/31)",
      "07": "후지큐 하이랜드, 코니퍼 포레스트에서 단독 야외 라이브 'JUST LIKE THIS 2017' 개최. 15,000명 동원\n-같은 날 공식 테마송 싱글 「THE WORLD IS MINE」회장 한정 판매(7/29)",
      "08": "동해 텔레비전·후지텔레비전계 전국 네트 오토나의 흙드라마 주제가 21th 싱글 [MIDNIGHT] 발매 (8/30)",
      "10": "5th Album 'KINGDOM' 발매(10/11).오리콘 위클리 5위",
    },
  },
  {
    year: "2018",
    content: {
      "01": "앨범 [KINGDOM]을 들고 전국 홀 투어 'SPYAIR TOUR 2018 - KINGDOM -' 개최 (1/23~4/18 전국 21개 도시 23개 공연)",
      "03": "2017년 7월 후지큐 하이랜드에서 개최된 단독 야외 라이브 'JUST LIKE THIS 2017'을 완전 수록한 Live DVD 릴리스 (3/14)",
      "07": "TV 도쿄계 애니메이션 은혼 은혼편 오프닝 테마 22th 싱글 [I Wanna Be…] 발매 (7/25)",
      "07_extra":
        "후지큐 하이랜드·코니퍼 포레스트에서 단독 야외 라이브 'JUST LIKE THIS 2018' 개최\n-같은 날 공식 테마송 싱글 「We'll Never Die」회장 한정 판매 (7/28)",
      "10": "첫 월드투어 'SPYAIR WORLD TOUR 2018' 개최.(~12월 미국·남미·유럽·아시아 세계 23개 도시)",
    },
  },
  {
    year: "2019",
    content: {
      "01": "B.LEAGUE 2018-19 SEASON 테마송 「B-THE ONE」디지털 릴리스 (1/18)",
      "03": "『SPYAIR 도호쿠 라이브 하우스 대작전 2019』개최(3/14~3/17)",
      "03_extra":
        "2018년 7월 후지큐 하이랜드에서 개최된 단독 야외 라이브 'JUST LIKE THIS 2018'을 완전 수록했다 Blu-ray & DVD 릴리스 (3/27)",
      "04": "일본체육대학 응원송 「PRIDEOF LIONS」디지털 릴리스 (4/3)",
      "07": "후지큐 하이랜드·코니퍼 포레스트에서 단독 야외 라이브 'JUST LIKE THIS 2019' 개최\n-같은 날 회장 한정 싱글 「B-THE ONE / PRIDEOF LIONS」발매 (7/27)",
    },
  },
  {
    year: "2020",
    content: {
      "03": "2019년 7월 후지큐 하이랜드에서 개최된 단독 야외 라이브 'JUST LIKE THIS 2019'를 완전 수록했다 Blu-ray & DVD 릴리스 (3/4)",
      "07": "코로나의 영향을 받아 「JUST LIKE THIS 2020」의 개최를 단념.\n-개최 예정일이었던 7/18에 유료 생방송 라이브 「SPYAIR digital LIVE 2020.7.18」을 개최.\n-같은 날 'INSIDE OF ME' 디지털 릴리즈",
      "10": "TV애니메이션 「하이큐!! TO THE TOP」제2 쿨 ED 테마송 「One Day」디지털 선행 릴리스 (10/3)",
      "11": "TV애니메이션 「하이큐!! TO THE TOP」제2 쿨 ED 테마송 「One Day」기간 생산 한정 CD 발매 (11/11)",
    },
  },
  {
    year: "2021",
    content: {
      "01": "영화 「은혼 THE FINAL」주제가 수록 EP 「철~Wadachi~」릴리스 (1/6).\n-생방송 라이브 'SPYAIR digital LIVE RE: 10th Anniversary~KICK OFF~' 개최(1/31)",
      "03": "6th Album 'UNITE' 발매 (3/31)",
      "04": "앨범 [UNITE]를 가지고 전국투어 'SPYAIR ALBUM TOUR 2021 -UNITE-'개최 (4/4~5/4 전국 6개 도시 7개 공연)",
      "07": "후지큐 하이랜드·코니퍼 포레스트에서 단독 야외 라이브 「JUST LIKE THIS 2021」개최.\n-같은 날 회장 한정 싱글 「All I Need」발매 (7/17)",
      "08": "Best Album 『BEST OF THE BEST』출시 (8/11)\n-같은 날 베스트 MV집『BEST OF THE BEST CLIPS』발매.",
      "09": "『BEST OF THE BEST』를 가지고 전국 홀 투어 'SPYAIR RE: 10th Anniversary HALL TOUR - BEST OF THE BEST-'개최\n-(9/23~12/26 전국 13개 도시 14개 공연)",
    },
  },
  {
    year: "2022",
    content: {
      "03": "2021년 7월 후지큐 하이랜드에서 개최된 단독 야외 라이브 'JUST LIKE THIS 2021'을 완전 수록했다 Blu-ray & DVD 릴리스 (3/9)\n-보컬 IKE 탈퇴(3/31)",
      "08": "보컬 찾기를 테마로 한 YouTube 채널 「스파이 에어, 보컬 찾습니다.」를 개설.\n-12월 ",
      "12": "12월 보컬 오디션 [니가 SPYAIR다!~]Hey Hey 응해 누구 없나요~'를 개최.",
    },
  },
  {
    year: "2023",
    content: {
      "04": "1000명이 넘는 응모자 중에서 후쿠오카현 출신, 24세의 요스키가 SPYAIR 신보컬로 결정",
      "06": 'Digital Singale "사무라이 하트 (Some Like It Hot!!) -New Version -" 발매 (6/2)\n-Digital Singale「My World -New Version -」リリース(6/23)',
      "08": '후지큐 하이랜드, 코니퍼 포레스트에서 단독 야외 라이브 "JUST LIKE THIS 2023" 개최\n-같은 날 공식 테마송 싱글 「RE-BIRTH」회장 한정 판매 (8/11)',
      "09": 'Digital Singale "이매지네이션 -New Version-" 발매(9/24)',
    },
  },
];

const Profile = () => {
  return (
    <Container>
      <Title>PROFILE</Title>

      <Img
        src="http://www.sonymusic.co.jp/adm_image/common/artist_image/70005000/70005313/artist_photo/63360.jpg"
        alt="Profile Img"
      />
      <Section>
        <SubTitle>Member</SubTitle>
        KENTA (Drums)→ MOMIKEN(Bass)→ YOSUKE (Vocal)→UZ (Guitar & Programming)
      </Section>
      <Section>
        <SubTitle>Information</SubTitle>
        2005년에 리저널 멤버로 결성.2010년 메이저 데뷔 이후 적극적인 출시와
        압도적인 라이브 퍼포먼스로 인기를 누린다. 2023년 4월 신보컬에 요스케가
        가입해 현 체제가 된다. YOSUKE 가입으로부터 불과 4개월 후에는 후지큐
        하이랜드· 코니퍼 포레스트에서 약 2년만에 7회째가 되는 단독 야외 라이브
        「JUST LIKE THIS」를 개최. 압권 퍼포먼스로 관객을 사로잡았다.
      </Section>
      <Section>
        <SubTitle>Time Line</SubTitle>
        {data.map((item) => (
          <YearSection key={item.year}>
            <YearContent>
              <YearText>-{item.year}-</YearText>
              {Object.entries(item.content)
                .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
                .map(([month, content]) => (
                  <Content key={month}>
                    <Month>{month}月</Month>-{content.split("\n").join("\n")}
                  </Content>
                ))}
            </YearContent>
          </YearSection>
        ))}
      </Section>
    </Container>
  );
};

export default Profile;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-image: url("https://www.spyair.net/assets/img/common/bg_spyair_2.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
`;

const SubTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Section = styled.div`
  width: 60%;
  margin-bottom: 2rem;
`;

const Img = styled.img`
  width: 60%;
  margin-bottom: 1.5rem;
`;

const YearSection = styled.div`
  margin-bottom: 1.5rem;
`;

const YearContent = styled.div``;

const YearText = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 0.2rem;
`;

const Content = styled.p`
  white-space: pre-line;
  margin-bottom: 0.2rem;
`;

const Month = styled.p`
  white-space: pre-line;
  font-weight: bold;
`;
