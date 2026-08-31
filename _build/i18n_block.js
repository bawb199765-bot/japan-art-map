/* ──────────────────────────────────────────────────────────────
   I18N — display strings only.
   Internal data keys (region names, travel tag keys, cat keys,
   status keys) stay Japanese because they are used as lookup keys
   in CASES and in data-* attributes. Only what the visitor reads
   is translated here.
   `LANG` is rewritten per generated language page.
   ────────────────────────────────────────────────────────────── */
const LANG = "__LANG__";

/* Site root on GitHub Pages. Language pages live in /en/, /ko/, /zh-cn/,
   so relative "images/..." would resolve to "/en/images/..." and 404.
   Every in-site asset therefore goes through assetUrl(). */
const ASSET_BASE = "/japan-art-map/";
function assetUrl(p) {
  if (!p) return "";
  if (/^(https?:)?\/\//.test(p) || p.startsWith("data:")) return p;
  return ASSET_BASE + String(p).replace(/^\/+/, "");
}

const I18N = {
  ja: {
    regions: { "北海道・東北":"北海道・東北","関東":"関東","中部":"中部","関西":"関西","中国・四国":"中国・四国","九州・沖縄":"九州・沖縄" },
    travelTags: { "島・海":"島・海","温泉":"温泉","建築":"建築","写真・映像":"写真・映像","工芸":"工芸","自然・里山":"自然・里山","街歩き":"街歩き","食":"食" },
    cats: {
      "都市で楽しむ芸術祭":"都市で楽しむ芸術祭","里山・島を巡る芸術祭":"里山・島を巡る芸術祭",
      "こぢんまり楽しむアート":"こぢんまり楽しむアート","アートな街歩き":"アートな街歩き",
      "アーティストの制作拠点":"アーティストの制作拠点","美術館・アート施設":"美術館・アート施設",
      "伝統工芸×現代アート":"伝統工芸×現代アート"
    },
    ym: (y,m) => `${y}年${m}月`,
    monthStart: (y,m) => `${y}年${m}月開始`,
    monthOnwards: (y,m) => `${y}年${m}月以降`,
    yearOnwards: (y) => `${y}年〜`,
    upcomingThisYear: (y) => `${y}年これから`,
    ongoing: "開催中",
    yearround: "通年",
    unannouncedOrEnded: "未発表・終了",
    ended: "終了",
    noDate: "日程未発表",
    yearRoundLong: "通年で楽しめる",
    plannedYear: (y) => `${y}年 開催予定`,
    plannedShort: (y) => `${y}予定`,
    annualProgram: "年間プログラム",
    fromMonth: (m) => `${m}月から`,
    inDays: (d) => `あと${d}日`,
    fromMD: (md) => `${md}から`,
    tripDay: "日帰り向き", tripNight: "1泊向き", tripLong: "遠征向き",
    inTokyo: (t) => `都内・${t}`,
    hoursFromTokyo: (h,t) => `約 ${h}h・${t}`,
    noImage: "No Image",
    tripGuide: "旅の目安",
    fromTokyo: "東京から",
    featuredArtists: "見られるアーティスト",
    officialSite: "公式サイト",
    detailTitle: "芸術祭の詳細", detailTitleEn: "Festival Detail",
    selectedTitle: "選択中の芸術祭", selectedTitleEn: "Selected",
    detailGuideTitle: "ここに、選んだ芸術祭の詳細が表示されます。",
    detailGuideCopy: "左の一覧、または右の地図から気になる芸術祭を選んでください。画像・会期・旅の目安・見どころを、この中央パネルで確認できます。",
    arrowList: "← 一覧から選ぶ", arrowMap: "地図から選ぶ →",
    recommendTitleMonth: (m) => `${m}月に行ける、おすすめの芸術祭`,
    recommendTitleYear: "今年行ける、おすすめの芸術祭",
    recommendLeadMonth: (m) => `${m}月に会期が重なる芸術祭から、今から行ける3件をピックアップ。`,
    recommendLeadYear: (y) => `開催中、${y}年にこれから始まるもの、通年で楽しめるものから3件をピックアップ。`,
    recommendEmpty: "現在、この条件でおすすめできる芸術祭がありません。",
    recommendEmptyMobile: "この条件でおすすめできる芸術祭はありません。",
    discoverFoot: (y) => `「開催中」「${y}年これから」「何月に行く？」「旅のテーマ」「旅のスタイル」を組み合わせて探せます。`,
    noResults: "該当する取り組みがありません", noResultsEn: "No results",
    countUnit: (n,t) => `${n} / ${t} 件`
  },

  en: {
    regions: { "北海道・東北":"Hokkaido & Tohoku","関東":"Kanto","中部":"Chubu","関西":"Kansai","中国・四国":"Chugoku & Shikoku","九州・沖縄":"Kyushu & Okinawa" },
    travelTags: { "島・海":"Islands & sea","温泉":"Onsen","建築":"Architecture","写真・映像":"Photo & film","工芸":"Craft","自然・里山":"Nature & rural","街歩き":"City walks","食":"Food" },
    cats: {
      "都市で楽しむ芸術祭":"City art festival","里山・島を巡る芸術祭":"Rural & island festival",
      "こぢんまり楽しむアート":"Small-scale art project","アートな街歩き":"Art neighbourhood",
      "アーティストの制作拠点":"Artist residency","美術館・アート施設":"Museum & art centre",
      "伝統工芸×現代アート":"Craft × contemporary art"
    },
    ym: (y,m) => `${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][m-1]} ${y}`,
    monthStart: (y,m) => `Starts ${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][m-1]} ${y}`,
    monthOnwards: (y,m) => `${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][m-1]} ${y} onwards`,
    yearOnwards: (y) => `${y} onwards`,
    upcomingThisYear: (y) => `Later in ${y}`,
    ongoing: "Happening now",
    yearround: "Year-round",
    unannouncedOrEnded: "Unannounced / ended",
    ended: "Ended",
    noDate: "Dates TBA",
    yearRoundLong: "Open year-round",
    plannedYear: (y) => `Planned for ${y}`,
    plannedShort: (y) => `${y} planned`,
    annualProgram: "Annual programme",
    fromMonth: (m) => `From ${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][m-1]}`,
    inDays: (d) => `In ${d} days`,
    fromMD: (md) => `From ${md}`,
    tripDay: "Day trip", tripNight: "1 night", tripLong: "2+ nights",
    inTokyo: (t) => `In Tokyo · ${t}`,
    hoursFromTokyo: (h,t) => `approx. ${h}h · ${t}`,
    noImage: "No Image",
    tripGuide: "Trip guide",
    fromTokyo: "From Tokyo",
    featuredArtists: "Featured artists",
    officialSite: "Official website",
    detailTitle: "Festival detail", detailTitleEn: "Detail",
    selectedTitle: "Selected festival", selectedTitleEn: "Selected",
    detailGuideTitle: "Details of the festival you select appear here.",
    detailGuideCopy: "Pick a festival from the list on the left or the map on the right. Its photo, dates, trip guide and highlights show up in this centre panel.",
    arrowList: "← Pick from the list", arrowMap: "Pick from the map →",
    recommendTitleMonth: (m) => `Recommended festivals in ${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][m-1]}`,
    recommendTitleYear: "Recommended art festivals this year",
    recommendLeadMonth: (m) => `Three picks you can visit among festivals running in ${["January","February","March","April","May","June","July","August","September","October","November","December"][m-1]}.`,
    recommendLeadYear: (y) => `Three picks from what is happening now, starting later in ${y}, or open year-round.`,
    recommendEmpty: "No festivals match these filters right now.",
    recommendEmptyMobile: "No festivals match these filters.",
    discoverFoot: (y) => `Combine “Happening now”, “Later in ${y}”, “By month”, “Travel theme” and “Trip style” to narrow your search.`,
    noResults: "No matching festivals", noResultsEn: "No results",
    countUnit: (n,t) => `${n} / ${t}`
  },

  ko: {
    regions: { "北海道・東北":"홋카이도·도호쿠","関東":"간토","中部":"주부","関西":"간사이","中国・四国":"주고쿠·시코쿠","九州・沖縄":"규슈·오키나와" },
    travelTags: { "島・海":"섬·바다","温泉":"온천","建築":"건축","写真・映像":"사진·영상","工芸":"공예","自然・里山":"자연·마을","街歩き":"동네 산책","食":"음식" },
    cats: {
      "都市で楽しむ芸術祭":"도시형 예술제","里山・島を巡る芸術祭":"마을·섬 예술제",
      "こぢんまり楽しむアート":"소규모 아트 프로젝트","アートな街歩き":"아트 동네 산책",
      "アーティストの制作拠点":"아티스트 창작 거점","美術館・アート施設":"미술관·아트 시설",
      "伝統工芸×現代アート":"전통공예×현대미술"
    },
    ym: (y,m) => `${y}년 ${m}월`,
    monthStart: (y,m) => `${y}년 ${m}월 시작`,
    monthOnwards: (y,m) => `${y}년 ${m}월 이후`,
    yearOnwards: (y) => `${y}년 이후`,
    upcomingThisYear: (y) => `${y}년 예정`,
    ongoing: "개최 중",
    yearround: "연중",
    unannouncedOrEnded: "미정·종료",
    ended: "종료",
    noDate: "일정 미정",
    yearRoundLong: "연중 관람 가능",
    plannedYear: (y) => `${y}년 개최 예정`,
    plannedShort: (y) => `${y} 예정`,
    annualProgram: "연간 프로그램",
    fromMonth: (m) => `${m}월부터`,
    inDays: (d) => `${d}일 남음`,
    fromMD: (md) => `${md}부터`,
    tripDay: "당일치기", tripNight: "1박", tripLong: "2박 이상",
    inTokyo: (t) => `도쿄 시내 · ${t}`,
    hoursFromTokyo: (h,t) => `약 ${h}시간 · ${t}`,
    noImage: "No Image",
    tripGuide: "여행 가이드",
    fromTokyo: "도쿄에서",
    featuredArtists: "참여 아티스트",
    officialSite: "공식 사이트",
    detailTitle: "예술제 상세", detailTitleEn: "Detail",
    selectedTitle: "선택한 예술제", selectedTitleEn: "Selected",
    detailGuideTitle: "선택한 예술제의 상세 정보가 여기에 표시됩니다.",
    detailGuideCopy: "왼쪽 목록이나 오른쪽 지도에서 관심 있는 예술제를 선택해 주세요. 사진, 회기, 여행 가이드, 볼거리를 이 가운데 패널에서 확인할 수 있습니다.",
    arrowList: "← 목록에서 선택", arrowMap: "지도에서 선택 →",
    recommendTitleMonth: (m) => `${m}월에 갈 수 있는 추천 예술제`,
    recommendTitleYear: "올해 갈 수 있는 추천 예술제",
    recommendLeadMonth: (m) => `${m}월에 회기가 겹치는 예술제 중에서 지금 갈 수 있는 3곳을 골랐습니다.`,
    recommendLeadYear: (y) => `개최 중, ${y}년에 곧 시작하는 것, 연중 즐길 수 있는 것 중에서 3곳을 골랐습니다.`,
    recommendEmpty: "현재 이 조건으로 추천할 수 있는 예술제가 없습니다.",
    recommendEmptyMobile: "이 조건으로 추천할 수 있는 예술제가 없습니다.",
    discoverFoot: (y) => `‘개최 중’, ‘${y}년 예정’, ‘월별로 찾기’, ‘여행 테마’, ‘여행 스타일’을 조합해 찾을 수 있습니다.`,
    noResults: "해당하는 예술제가 없습니다", noResultsEn: "No results",
    countUnit: (n,t) => `${n} / ${t}`
  },

  "zh-cn": {
    regions: { "北海道・東北":"北海道·东北","関東":"关东","中部":"中部","関西":"关西","中国・四国":"中国·四国","九州・沖縄":"九州·冲绳" },
    travelTags: { "島・海":"岛屿·海","温泉":"温泉","建築":"建筑","写真・映像":"摄影·影像","工芸":"工艺","自然・里山":"自然·乡野","街歩き":"城市漫步","食":"美食" },
    cats: {
      "都市で楽しむ芸術祭":"城市型艺术节","里山・島を巡る芸術祭":"乡野·岛屿艺术节",
      "こぢんまり楽しむアート":"小型艺术项目","アートな街歩き":"艺术街区漫步",
      "アーティストの制作拠点":"艺术家创作基地","美術館・アート施設":"美术馆·艺术设施",
      "伝統工芸×現代アート":"传统工艺×当代艺术"
    },
    ym: (y,m) => `${y}年${m}月`,
    monthStart: (y,m) => `${y}年${m}月开始`,
    monthOnwards: (y,m) => `${y}年${m}月以后`,
    yearOnwards: (y) => `${y}年以后`,
    upcomingThisYear: (y) => `${y}年即将举办`,
    ongoing: "正在举办",
    yearround: "全年",
    unannouncedOrEnded: "未公布·已结束",
    ended: "已结束",
    noDate: "日程未公布",
    yearRoundLong: "全年可参观",
    plannedYear: (y) => `预计${y}年举办`,
    plannedShort: (y) => `${y}预定`,
    annualProgram: "年度项目",
    fromMonth: (m) => `${m}月开始`,
    inDays: (d) => `还有${d}天`,
    fromMD: (md) => `${md}开始`,
    tripDay: "一日游", tripNight: "1晚", tripLong: "2晚以上",
    inTokyo: (t) => `东京市内 · ${t}`,
    hoursFromTokyo: (h,t) => `约 ${h}小时 · ${t}`,
    noImage: "No Image",
    tripGuide: "旅行参考",
    fromTokyo: "从东京出发",
    featuredArtists: "参展艺术家",
    officialSite: "官方网站",
    detailTitle: "艺术节详情", detailTitleEn: "Detail",
    selectedTitle: "已选择的艺术节", selectedTitleEn: "Selected",
    detailGuideTitle: "所选艺术节的详细信息将显示在这里。",
    detailGuideCopy: "请从左侧列表或右侧地图中选择感兴趣的艺术节。图片、会期、旅行参考和看点都会显示在中间这一栏。",
    arrowList: "← 从列表选择", arrowMap: "从地图选择 →",
    recommendTitleMonth: (m) => `${m}月可以去的推荐艺术节`,
    recommendTitleYear: "今年值得去的艺术节",
    recommendLeadMonth: (m) => `从会期涵盖${m}月的艺术节中，挑选了现在就能去的3个。`,
    recommendLeadYear: (y) => `从正在举办、${y}年即将开始以及全年开放的艺术节中挑选了3个。`,
    recommendEmpty: "目前没有符合该条件的推荐艺术节。",
    recommendEmptyMobile: "没有符合该条件的推荐艺术节。",
    discoverFoot: (y) => `可以组合“正在举办”“${y}年即将举办”“按月份”“旅行主题”“旅行方式”来查找。`,
    noResults: "没有符合条件的艺术节", noResultsEn: "No results",
    countUnit: (n,t) => `${n} / ${t}`
  }
};

const T = I18N[LANG] || I18N.ja;

/* ──────────────────────────────────────────────────────────────
   PHASE 2A — English case labels.
   IMPORTANT: CASES internal keys such as region/cat/nextYear and
   Japanese source text used by getTravelTags() stay untouched.
   We keep the original Japanese fields on *Ja properties and only
   overlay visitor-facing fields for LANG === "en".
   ────────────────────────────────────────────────────────────── */
const PREFECTURE_EN = {
  "北海道": "Hokkaido",
  "青森": "Aomori",
  "岩手": "Iwate",
  "宮城": "Miyagi",
  "秋田": "Akita",
  "山形": "Yamagata",
  "福島": "Fukushima",
  "茨城": "Ibaraki",
  "栃木": "Tochigi",
  "群馬": "Gunma",
  "埼玉": "Saitama",
  "千葉": "Chiba",
  "東京": "Tokyo",
  "神奈川": "Kanagawa",
  "新潟": "Niigata",
  "富山": "Toyama",
  "石川": "Ishikawa",
  "福井": "Fukui",
  "山梨": "Yamanashi",
  "長野": "Nagano",
  "岐阜": "Gifu",
  "静岡": "Shizuoka",
  "愛知": "Aichi",
  "三重": "Mie",
  "滋賀": "Shiga",
  "京都": "Kyoto",
  "大阪": "Osaka",
  "兵庫": "Hyogo",
  "奈良": "Nara",
  "和歌山": "Wakayama",
  "鳥取": "Tottori",
  "島根": "Shimane",
  "岡山": "Okayama",
  "広島": "Hiroshima",
  "山口": "Yamaguchi",
  "徳島": "Tokushima",
  "香川": "Kagawa",
  "愛媛": "Ehime",
  "高知": "Kochi",
  "福岡": "Fukuoka",
  "佐賀": "Saga",
  "長崎": "Nagasaki",
  "熊本": "Kumamoto",
  "大分": "Oita",
  "宮崎": "Miyazaki",
  "鹿児島": "Kagoshima",
  "沖縄": "Okinawa"
};

const PREFECTURE_KO = {
  "北海道": "홋카이도",
  "青森": "아오모리",
  "岩手": "이와테",
  "宮城": "미야기",
  "秋田": "아키타",
  "山形": "야마가타",
  "福島": "후쿠시마",
  "茨城": "이바라키",
  "栃木": "도치기",
  "群馬": "군마",
  "埼玉": "사이타마",
  "千葉": "지바",
  "東京": "도쿄",
  "神奈川": "가나가와",
  "新潟": "니가타",
  "富山": "도야마",
  "石川": "이시카와",
  "福井": "후쿠이",
  "山梨": "야마나시",
  "長野": "나가노",
  "岐阜": "기후",
  "静岡": "시즈오카",
  "愛知": "아이치",
  "三重": "미에",
  "滋賀": "시가",
  "京都": "교토",
  "大阪": "오사카",
  "兵庫": "효고",
  "奈良": "나라",
  "和歌山": "와카야마",
  "鳥取": "돗토리",
  "島根": "시마네",
  "岡山": "오카야마",
  "広島": "히로시마",
  "山口": "야마구치",
  "徳島": "도쿠시마",
  "香川": "가가와",
  "愛媛": "에히메",
  "高知": "고치",
  "福岡": "후쿠오카",
  "佐賀": "사가",
  "長崎": "나가사키",
  "熊本": "구마모토",
  "大分": "오이타",
  "宮崎": "미야자키",
  "鹿児島": "가고시마",
  "沖縄": "오키나와"
};

const PREFECTURE_ZH_CN = {
  "北海道": "北海道",
  "青森": "青森",
  "岩手": "岩手",
  "宮城": "宫城",
  "秋田": "秋田",
  "山形": "山形",
  "福島": "福岛",
  "茨城": "茨城",
  "栃木": "栃木",
  "群馬": "群马",
  "埼玉": "埼玉",
  "千葉": "千叶",
  "東京": "东京",
  "神奈川": "神奈川",
  "新潟": "新潟",
  "富山": "富山",
  "石川": "石川",
  "福井": "福井",
  "山梨": "山梨",
  "長野": "长野",
  "岐阜": "岐阜",
  "静岡": "静冈",
  "愛知": "爱知",
  "三重": "三重",
  "滋賀": "滋贺",
  "京都": "京都",
  "大阪": "大阪",
  "兵庫": "兵库",
  "奈良": "奈良",
  "和歌山": "和歌山",
  "鳥取": "鸟取",
  "島根": "岛根",
  "岡山": "冈山",
  "広島": "广岛",
  "山口": "山口",
  "徳島": "德岛",
  "香川": "香川",
  "愛媛": "爱媛",
  "高知": "高知",
  "福岡": "福冈",
  "佐賀": "佐贺",
  "長崎": "长崎",
  "熊本": "熊本",
  "大分": "大分",
  "宮崎": "宫崎",
  "鹿児島": "鹿儿岛",
  "沖縄": "冲绳"
};


const CASE_TRANSLATIONS = {
  en: {
  "札幌国際芸術祭（SIAF）": {
    "name": "Sapporo International Art Festival (SIAF)"
  },
  "AOMORI GOKAN": {
    "name": "AOMORI GOKAN"
  },
  "三陸国際芸術祭": {
    "name": "Sanriku International Arts Festival"
  },
  "リボーンアートフェス": {
    "name": "Reborn-Art Festival"
  },
  "かみこあにプロジェクト": {
    "name": "Kamikoani Project"
  },
  "山形ビエンナーレ": {
    "name": "YAMAGATA BIENNALE"
  },
  "ハマカルアートプロジェクト": {
    "name": "HAMACUL ART PROJECT"
  },
  "アーカスプロジェクト（ARCUS）": {
    "name": "ARCUS Project"
  },
  "取手アートプロジェクト": {
    "name": "Toride Art Project (TAP)"
  },
  "KEAT 小砂環境芸術祭": {
    "name": "KEAT / Koisago Environmental Art Triennale"
  },
  "中之条ビエンナーレ": {
    "name": "Nakanojo Biennale"
  },
  "千葉国際芸術祭": {
    "name": "Chiba International Art Festival"
  },
  "東京ビエンナーレ": {
    "name": "Tokyo Biennale"
  },
  "黄金町エリアマネジメント/バザール": {
    "name": "Koganecho Bazaar"
  },
  "大地の芸術祭": {
    "name": "Echigo-Tsumari Art Triennale"
  },
  "ガラスの街とやま": {
    "name": "Glass Art City, Toyama"
  },
  "Go FOR KOGEI": {
    "name": "GO FOR KOGEI"
  },
  "Zen AIR（禅×AIR）": {
    "name": "ZEN AIR"
  },
  "FUJI TEXTILE WEEK": {
    "name": "FUJI TEXTILE WEEK"
  },
  "北アルプス国際芸術祭": {
    "name": "Northern Alps Art Festival"
  },
  "美濃和紙あかりアート展": {
    "name": "Mino Washi Light Art Exhibition"
  },
  "アーツカウンシルしずおか": {
    "name": "Arts Council Shizuoka"
  },
  "国際芸術祭「あいち」": {
    "name": "Aichi Triennale"
  },
  "亀山トリエンナーレ": {
    "name": "Kameyama Triennale"
  },
  "BIWAKOビエンナーレ": {
    "name": "BIWAKO BIENNALE"
  },
  "KYOTOGRAPHIE": {
    "name": "KYOTOGRAPHIE International Photography Festival"
  },
  "はならぁと": {
    "name": "Nara Machiya Arts Festival HANARART"
  },
  "JAPAN WALLS（和歌山）": {
    "name": "JAPAN WALLS in SHIRAHAMA"
  },
  "鳥取県立美術館の取り組み": {
    "name": "Tottori Prefectural Museum of Art"
  },
  "石見アーツプロジェクト": {
    "name": "IWAMI ARTS PROJECT"
  },
  "岡山芸術交流": {
    "name": "OKAYAMA ART SUMMIT"
  },
  "広島国際建築祭": {
    "name": "Hiroshima Architecture Exhibition"
  },
  "YCAM（山口情報芸術センター）": {
    "name": "Yamaguchi Center for Arts and Media [YCAM]"
  },
  "神山AIR": {
    "name": "Kamiyama Artist in Residence (KAIR)"
  },
  "瀬戸内国際芸術祭": {
    "name": "Setouchi Triennale"
  },
  "道後オンセアート": {
    "name": "DOGO ART"
  },
  "高知県芸術祭/KOCHI ART PROJECTS": {
    "name": "Kochi Art Festival / KOCHI ART PROJECTS"
  },
  "Fukuoka Art Next": {
    "name": "Fukuoka Art Next"
  },
  "Creative Residency in Arita": {
    "name": "Creative Residency in Arita"
  },
  "くまもとアートポリス": {
    "name": "Kumamoto Artpolis"
  },
  "BEPPU PROJECT": {
    "name": "BEPPU PROJECT"
  },
  "新富芸術祭": {
    "name": "Shintomi Art Festival"
  },
  "霧島アートの森活用まちづくり": {
    "name": "Kirishima Open-Air Museum"
  },
  "やんばるアートフェスティバル": {
    "name": "YAMBARU ART FESTIVAL"
  },
  "恵比寿映像祭2026": {
    "name": "Yebisu International Festival for Art & Alternative Visions 2026"
  },
  "東京建築祭2026": {
    "name": "TOKYO ARCHITECTURE FESTIVAL 2026"
  },
  "すみだ五彩の芸術祭": {
    "name": "SUMIDA ART FESTIVAL 2026"
  },
  "TOKYO ATLAS（国際文化芸術祭）": {
    "name": "TOKYO ATLAS International Art Exhibition"
  },
  "前橋国際芸術祭2026「めぶく。」": {
    "name": "Maebashi Biennale 2026"
  },
  "下呂 Art Discovery 2026": {
    "name": "Gero Art Discovery 2026"
  },
  "富士山芸術祭2026": {
    "name": "Fuji Art Festival 2026"
  },
  "アラフドアートアゲイン": {
    "name": "ARAFUDO ART AGAIN 2026"
  },
  "神戸六甲ミーツ・アート2026 beyond": {
    "name": "KOBE Rokko Meets Art 2026 beyond"
  },
  "飛生芸術祭": {
    "name": "TOBIU ART FESTIVAL"
  },
  "AWANO 夢咲くART FESTIVAL 2026": {
    "name": "AWANO 夢咲く ART FESTIVAL 2026"
  },
  "房総国際芸術祭 アート×ミックス2027": {
    "name": "Boso Triennale 2027"
  },
  "横浜トリエンナーレ": {
    "name": "Yokohama Triennale"
  },
  "逗子アートフェスティバル": {
    "name": "Zushi Art Festival"
  },
  "ART/X/TOYAMA（アートエクストヤマ）": {
    "name": "ART/X/TOYAMA"
  },
  "浅間国際フォトフェスティバル（PHOTO MIYOTA）": {
    "name": "ASAMA INTERNATIONAL PHOTO FESTIVAL"
  },
  "原泉アートデイズ！": {
    "name": "HARAIZUMI ART DAYS!"
  },
  "大野芸術祭（OHNO ART BREW）": {
    "name": "OHNO ART BREW"
  },
  "長浜国際芸術祭": {
    "name": "Nagahama International Art Festival 2026"
  },
  "KYOTO EXPERIMENT 京都国際舞台芸術祭2026": {
    "name": "KYOTO EXPERIMENT 2026"
  },
  "生きた建築ミュージアムフェスティバル大阪（イケフェス大阪）": {
    "name": "OPEN HOUSE OSAKA"
  },
  "紀南アートウィーク": {
    "name": "KINAN ART WEEK"
  },
  "森の芸術祭 晴れの国・岡山2027": {
    "name": "Forest Festival of the Arts Okayama: Clear-skies Country 2027"
  },
  "MAFIN（Miyajima Art Festival in the Narrative）": {
    "name": "MAFIN (Miyajima Art Festival in the Narrative)"
  },
  "ART FAIR ASIA FUKUOKA（AFAF）": {
    "name": "ART FAIR ASIA FUKUOKA 2026"
  },
  "SAGA ARTIST FAIR 2027": {
    "name": "SAGA ARTIST FAIR 2027"
  },
  "三島満願芸術祭2026": {
    "name": "Mishima Mangan Art Festival 2026"
  }
}
};

const CASE_CONTENT_EN = {
  "札幌国際芸術祭（SIAF）": {
    "tagline": "Explore urban culture and media art in snowy Sapporo.",
    "desc": "An international art festival that builds on Sapporo's identity as a creative city, combining rich natural surroundings, urban infrastructure, universities, and a strong IT and media-arts community."
  },
  "AOMORI GOKAN": {
    "tagline": "Travel between five museums and art centers across Aomori.",
    "desc": "A collaborative initiative linking five museums and art centers in Aomori Prefecture. It promotes the region's art scene at home and abroad while encouraging visitors to travel across the prefecture and supporting cultural, economic, and educational development.",
    "dateText": "The five venues can be visited year-round."
  },
  "三陸国際芸術祭": {
    "tagline": "Journey through Sanriku and encounter performing traditions rooted in the land.",
    "desc": "A festival that brings Sanriku's traditional performing arts into dialogue with artists from Japan and abroad. It supports cultural recovery after the Great East Japan Earthquake, nurtures the next generation of performers, and shares the region's diverse cultural heritage with wider audiences."
  },
  "リボーンアートフェス": {
    "tagline": "Experience art, music, and food in Ishinomaki.",
    "desc": "A multidisciplinary festival of art, music, and food held in Ishinomaki, an area affected by the Great East Japan Earthquake. Under the idea of Reborn-Art—ways of living—it combines contemporary artworks, local food experiences, and live music."
  },
  "かみこあにプロジェクト": {
    "tagline": "Discover art and everyday life in a small Akita village.",
    "desc": "An annual project in Kamikoani, one of Akita Prefecture's most rapidly aging villages, centered on contemporary art, music, and traditional performing arts. A local resident-led committee sustains the project over the long term.",
    "dateText": "2026 dates have not yet been announced."
  },
  "山形ビエンナーレ": {
    "tagline": "Walk through Zao Onsen and Yamagata with art along the way.",
    "desc": "A biennial arts festival organized primarily by Tohoku University of Art and Design since 2014. It activates existing spaces around the city and contributes to downtown revitalization; in 2024, the festival expanded to Zao Onsen for the first time.",
    "dateText": "Next dates have not been announced (previous edition: 2024)."
  },
  "ハマカルアートプロジェクト": {
    "tagline": "Encounter artists, production sites, and local communities along Fukushima's Hamadori coast.",
    "desc": "A program supporting artists and organizations working with students and local communities across 12 municipalities in Fukushima's Hamadori area, including places where evacuation orders still remain in part. It supports both local art initiatives and artists creating work while staying in the region.",
    "dateText": "Projects are underway during fiscal 2026."
  },
  "アーカスプロジェクト（ARCUS）": {
    "tagline": "Visit Moriya, where artists from around the world live and work.",
    "desc": "One of Japan's longest-running artist-in-residence programs, launched by Ibaraki Prefecture in 1994. It combines residencies for internationally active artists with learning programs, workshops, and spaces where local residents can take an active role."
  },
  "取手アートプロジェクト": {
    "tagline": "See how art becomes part of housing estates and rural landscapes in Toride.",
    "desc": "An art project jointly run since 1999 by local residents, Toride City, and Tokyo University of the Arts. Since 2010 it has shifted from a festival model to long-term programs, including Art in the Housing Complex and Hanno-Hangei, which connects farming and art."
  },
  "KEAT 小砂環境芸術祭": {
    "tagline": "Walk between nature and art in Tochigi's satoyama landscape.",
    "desc": "An art festival in Koisago, Nakagawa, Tochigi, recognized as one of Japan's Most Beautiful Villages. Through artistic expression it rediscovers local qualities and explores a new culture that exists in gentle harmony with the environment."
  },
  "中之条ビエンナーレ": {
    "tagline": "Explore hot-spring towns and satoyama on an art journey through Gunma.",
    "desc": "An international contemporary art festival held every two years in Nakanojo, Gunma. Artists take part in residencies across distinctive mountain communities, creating work in response to local satoyama culture before presenting it during the biennale."
  },
  "さいたま国際芸術祭": {
    "tagline": "Explore contemporary art across the city of Saitama.",
    "desc": "A triennial arts festival held throughout Saitama City. Designed around public participation, it creates opportunities for residents, artists, and communities to meet and collaborate across a wide range of venues."
  },
  "千葉国際芸術祭": {
    "tagline": "See Chiba's everyday cityscape from a new perspective through art.",
    "desc": "A triennial arts festival launched in Chiba City in 2025. Rather than focusing only on short-term tourism, it aims to stimulate creativity among people living in and beyond the city and enrich everyday life over the medium and long term."
  },
  "東京ビエンナーレ": {
    "tagline": "Turn the city of Tokyo itself into an art venue.",
    "desc": "An international biennale launched in 2020/21 and staged across the urban fabric of Tokyo. Works appear not only in galleries but in streets, underpasses, historic buildings, and other everyday spaces across Chiyoda, Chuo, Bunkyo, and Taito."
  },
  "黄金町エリアマネジメント/バザール": {
    "tagline": "Walk through Koganecho and experience a neighborhood transformed through art.",
    "desc": "An art-led regeneration initiative in Yokohama's Koganecho district, where a former concentration of illicit establishments began to be transformed around 2005. The annual Koganecho Bazaar started in 2008, followed by the establishment of the Koganecho Area Management Center in 2009."
  },
  "大地の芸術祭": {
    "tagline": "Travel through the Echigo-Tsumari satoyama with art as your guide.",
    "desc": "One of the world's largest international art festivals and a pioneer of Japan's regional art-festival movement. Its model of traveling through satoyama landscapes with art as a guide has drawn global attention as an example of art-led regional revitalization. Seasonal programs continue between the main triennial editions."
  },
  "ガラスの街とやま": {
    "tagline": "Explore Toyama's glass culture and its landmark museum.",
    "desc": "Toyama City has made glass a central part of its urban policy and cultural identity. Anchored by the Toyama Glass Art Museum, opened in 2015, the city also supports a glass institute and studios as part of a broader citywide ecosystem."
  },
  "Go FOR KOGEI": {
    "tagline": "Travel through Hokuriku to encounter craft and contemporary art.",
    "desc": "A project launched in 2020 to offer new perspectives on craft from Hokuriku, a region with a long history of making. Exhibitions are staged in historic streetscapes, temples, and shrines, alongside symposia and other programs examining craft in contemporary life."
  },
  "Zen AIR（禅×AIR）": {
    "tagline": "Experience an artist residency shaped by Zen culture.",
    "desc": "A theme-based artist-in-residence program in Eiheiji, Fukui, an area known for Zen culture. Artists create and research while engaging with Zen practices and local residents, later sharing the results through artworks and research."
  },
  "FUJI TEXTILE WEEK": {
    "tagline": "Walk through Fujiyoshida, a city of weaving, textiles, and design.",
    "desc": "Japan's distinctive festival dedicated to textiles and art, launched in 2021 in Fujiyoshida, Yamanashi, a textile-producing area with more than a thousand years of history. It connects contemporary artistic practice with traditional industry and regional revitalization.",
    "dateText": "Next dates have not been announced (2025 edition completed)."
  },
  "北アルプス国際芸術祭": {
    "tagline": "Travel through the Northern Alps, the city, and its landscapes with art.",
    "desc": "An international art festival in Omachi, Nagano, created as part of a community-led effort to reveal the area's hidden qualities and shape a distinctive town. Editions were held in 2017, 2021, and 2024."
  },
  "美濃和紙あかりアート展": {
    "tagline": "See Mino's historic streets illuminated by the glow of washi paper.",
    "desc": "A long-running exhibition in which around 300 light artworks made with Mino washi softly illuminate the historic Udatsu-lined streetscape. Works are submitted from across Japan, with selected pieces exhibited and judged in a participatory competition."
  },
  "アーツカウンシルしずおか": {
    "tagline": "A gateway to discovering local cultural activity across Shizuoka.",
    "desc": "An intermediary organization supporting arts and culture across Shizuoka Prefecture through grants, consultation, and communications. Rather than only funding one-off projects, it provides long-term support for artists and NPOs and acts as a bridge between government and the private sector."
  },
  "国際芸術祭「あいち」": {
    "tagline": "Explore contemporary art from around the world across Aichi.",
    "desc": "A major international contemporary art festival organized by Aichi Prefecture every three years. It spans the Aichi Arts Center and urban sites elsewhere in the prefecture, bringing together contemporary art, performing arts, and learning programs. The 2028 edition will be led by artistic director Shabbir Hussain Mustafa."
  },
  "亀山トリエンナーレ": {
    "tagline": "Seek out small-scale expressions scattered across the city of Kameyama.",
    "desc": "An art-led community-development initiative promoted by Kameyama City, Mie. It defines art broadly as things that move people and are cultivated through everyday life across generations, and has held a triennial festival since 2014."
  },
  "BIWAKOビエンナーレ": {
    "tagline": "Explore historic townhouses in Omihachiman through contemporary art.",
    "desc": "An international biennale centered on historic houses, machiya townhouses, and storehouses in Omihachiman, Shiga. Artists from Japan and abroad create installations that respond to the memory and character of each building, turning the city itself into a museum."
  },
  "KYOTOGRAPHIE": {
    "tagline": "Walk through springtime Kyoto with photography and architecture.",
    "desc": "An international photography festival held every spring in temples, machiya townhouses, modern architecture, and public spaces across Kyoto. Founded in 2013, it has built a strong identity around photography, with the open-entry satellite program KG+ running alongside it. The 2026 edition is the 14th, themed “EDGE,” featuring 14 groups from eight countries."
  },
  "北加賀屋クリエイティブ・ビレッジ": {
    "tagline": "Explore creative spaces in Osaka's former shipyard district.",
    "desc": "A network of art and creative spaces in Kitakagaya, Suminoe Ward, Osaka, developed incrementally on former shipyard land by local real-estate company Chishima Real Estate. Affordable rents and flexible use of space have attracted a wide range of creators without relying primarily on public subsidies."
  },
  "神戸・新開地（アートひろば等）": {
    "tagline": "Experience performing arts and local culture in Kobe's old downtown.",
    "desc": "An art-led regeneration effort in Shin-Kaichi, Kobe, once one of western Japan's largest entertainment districts. Vacant buildings and shops have been reused as art spaces, rehearsal rooms, and small theaters, helping cultivate local cultural practitioners and new community hubs."
  },
  "はならぁと": {
    "tagline": "Discover art in old streets, vacant houses, and communities across Nara.",
    "desc": "A distributed art festival using villages, machiya houses, vacant buildings, temples, and shrines across Nara Prefecture. Areas such as Kashihara, Uda, and Yoshino host programs in turn, encouraging visitors to explore communities and spaces they might otherwise never encounter."
  },
  "JAPAN WALLS（和歌山）": {
    "tagline": "Encounter monumental murals on the streets of Wakayama.",
    "desc": "A project inviting street artists from Japan and abroad to create large-scale murals on building walls across Wakayama City. Its strong visual impact transforms the streetscape and helps attract new visitors through social media and word of mouth."
  },
  "鳥取県立美術館の取り組み": {
    "tagline": "Start at Tottori's new museum and explore the wider region.",
    "desc": "A cultural initiative centered on the Tottori Prefectural Museum of Art, which opened in Kurayoshi in 2025. Developed through extensive dialogue with local communities, the museum draws on Tottori's connections to the mingei folk-craft movement and serves as a hub for learning, exchange, and creative activity."
  },
  "石見アーツプロジェクト": {
    "tagline": "Visit art initiatives rooted in the culture of the Iwami region.",
    "desc": "A cultural-development initiative in western Shimane's Iwami region. It connects local cultural resources—including Iwami Kagura, the Iwami Ginzan Silver Mine, and Sekishu washi—with contemporary artistic practice while encouraging younger artists and cultural workers to live and work in the area."
  },
  "岡山芸術交流": {
    "tagline": "Explore international contemporary art in central Okayama.",
    "desc": "A triennial international contemporary art exhibition centered on Okayama's historic castle-town district. Major installations occupy historic buildings and public spaces such as the Hayashibara Museum of Art and the former Uchisange Elementary School, with venues compact enough to explore on foot."
  },
  "広島国際建築祭": {
    "tagline": "Walk through Onomichi and Fukuyama via architecture and urban stories.",
    "desc": "An international festival launched in 2025 from Hiroshima and dedicated specifically to architecture. Centered on Fukuyama and Onomichi, it uses tours, exhibitions, and symposia to reconsider urban memory, reconstruction, and regeneration through the lens of architecture."
  },
  "YCAM（山口情報芸術センター）": {
    "tagline": "Encounter experiments in media art in Yamaguchi.",
    "desc": "A public media-art center established by Yamaguchi City. With integrated R&D across art, technology, and research, YCAM produces exhibitions, performances, public workshops, and international collaborations through close partnerships between artists and engineers."
  },
  "神山AIR": {
    "tagline": "Visit artists at work in the mountain town of Kamiyama.",
    "desc": "An artist-in-residence program in Kamiyama, Tokushima, operating since the late 1990s. What began with residency-based art practice later contributed to satellite offices, migration, and vacant-house regeneration, becoming an important origin point of the widely discussed Kamiyama model of regional revitalization."
  },
  "瀬戸内国際芸術祭": {
    "tagline": "Travel the islands of the Seto Inland Sea with art as your destination.",
    "desc": "A large-scale international art festival held every three years across the islands and ports of the Seto Inland Sea. Permanent and temporary works appear across 12 islands and two ports, including Naoshima, Teshima, Megijima, and Shodoshima. The main festival was held in 2025; the next is in 2028, with ART SETOUCHI programs continuing in 2026."
  },
  "道後オンセアート": {
    "tagline": "Walk through Dogo Onsen with art along the way.",
    "desc": "An art festival set in Dogo Onsen, Matsuyama, one of Japan's oldest hot-spring towns. Ryokan inns, public baths, and shopping streets become gallery-like spaces for installations and participatory works by artists from Japan and abroad."
  },
  "高知県芸術祭/KOCHI ART PROJECTS": {
    "tagline": "Explore Kochi's cities and communities through many forms of expression.",
    "desc": "Built around Kochi Prefecture's annual autumn arts festival, the program also includes KOCHI ART PROJECTS, which supports art-led community initiatives. Theater, music, visual art, traditional culture, and locally rooted projects are brought together across the prefecture."
  },
  "Fukuoka Art Next": {
    "tagline": "Encounter contemporary art casually throughout the city of Fukuoka.",
    "desc": "A comprehensive cultural policy launched by Fukuoka City in fiscal 2022. Through partnerships among government, universities, and the private sector, it expands opportunities for residents to encounter art while supporting artist development and exchange through initiatives such as Artist Cafe Fukuoka, public wall art, and Art Fair Asia Fukuoka."
  },
  "Creative Residency in Arita": {
    "tagline": "Meet international artists creating in Japan's historic porcelain town.",
    "desc": "A three-month residency in Arita, the birthplace of Japanese porcelain, where artists and designers from Japan and abroad collaborate with local kilns and craftspeople. Founded in 2016 with support linked to the Embassy of the Kingdom of the Netherlands, it helps renew Arita ware through international exchange.",
    "dateText": "June–August 2026 (artist residency)."
  },
  "南島原市アートビレッジ・シラキノ": {
    "tagline": "Visit an artist residency inside a former school in Minamishimabara.",
    "desc": "A former school in Minamishimabara, Nagasaki, converted into a multidisciplinary arts facility supporting emerging artists and local cultural development. Artists stay and create on site while building relationships with residents through workshops and community exchange."
  },
  "くまもとアートポリス": {
    "tagline": "Read the city through architecture as you travel across Kumamoto.",
    "desc": "A long-running Kumamoto Prefecture initiative, begun in 1988, to improve the design quality of public architecture and spaces. With prominent architects serving as commissioners, the program applies design thinking to public facilities, bridges, roads, parks, and other infrastructure across the prefecture."
  },
  "BEPPU PROJECT": {
    "tagline": "Meet art and community initiatives across Beppu's hot-spring cityscape.",
    "desc": "An art organization and project platform based in Beppu. Beginning with an international art festival using vacant spaces in the hot-spring city, it has expanded into residencies, talent development, venue operation, and projects connecting food and culture, acting as an intermediary between public and private sectors."
  },
  "新富芸術祭": {
    "tagline": "Enjoy art woven into everyday life in Shintomi, Miyazaki.",
    "desc": "A small-scale festival in Shintomi, Miyazaki, set among agricultural landscapes, daily community life, and historic ritual spaces. Artists from Japan and abroad collaborate with local residents, with an emphasis on a sustainable format that places relatively little burden on the community."
  },
  "霧島アートの森活用まちづくり": {
    "tagline": "Explore outdoor art amid the natural landscape of Kirishima.",
    "desc": "A community-development effort centered on the Kirishima Open-Air Museum in Yusui. Sculptures and installations by artists from Japan and abroad are placed throughout the volcanic landscape of the Kirishima mountains, combining art appreciation, education, and nature-based experiences."
  },
  "やんばるアートフェスティバル": {
    "tagline": "Explore Yanbaru's forests and villages through art and craft.",
    "desc": "An art festival in Okinawa's northern Yanbaru region. Programs combine contemporary art, traditional performing arts, and craft across subtropical forests, villages, and coastlines within and around the World Natural Heritage area, with coexistence with nature as a central theme."
  },
  "恵比寿映像祭2026": {
    "tagline": "Experience what's happening now in moving image and photography in Ebisu.",
    "desc": "An international festival of moving-image expression organized by the Tokyo Photographic Art Museum. While continually asking what the moving image can be, it presents photography, film, sound, performance, and other forms. The 2026 theme is “Polyphonic Voices Bathed in Sunlight.”",
    "dateNote": "The main 2026 festival has ended."
  },
  "東京建築祭2026": {
    "tagline": "Spend a weekend entering some of Tokyo's most remarkable buildings.",
    "desc": "An architecture festival that opens notable Tokyo buildings that are normally inaccessible to the public, guided by the idea of understanding people and cities through architecture. First held in 2024, it drew 65,000 visitors; the 2026 edition expanded into Shibuya with more than 70 participating buildings.",
    "dateNote": "The 2026 edition has ended."
  },
  "すみだ五彩の芸術祭": {
    "tagline": "Walk through Sumida and encounter local memory through art.",
    "desc": "A multi-month arts festival organized by Sumida City, the first festival of its scale directly hosted by one of Tokyo's 23 wards. Taking inspiration from the phrase “ink contains five colors,” it brings local history, industry, and memory into focus across old houses, temples, shopping streets, and other everyday spaces."
  },
  "TOKYO ATLAS（国際文化芸術祭）": {
    "tagline": "Explore contemporary art from around the world along Tokyo's waterfront.",
    "desc": "An international art exhibition launched in 2026 as part of a new Tokyo cultural-arts festival, staged across waterfront areas including Odaiba, Aomi, and Tennoz. Building on earlier Odaiba Triennale initiatives, it presents internationally known artists alongside younger artists supported by the Tokyo Metropolitan Government."
  },
  "前橋国際芸術祭2026「めぶく。」": {
    "tagline": "Walk through central Maebashi via architecture and art.",
    "desc": "The first international art festival centered on downtown Maebashi. Marking ten years since the city's 2016 urban vision “Mebuku,” it connects art with ongoing redevelopment, including architecture by Sou Fujimoto, and creates a walkable experience across shopping streets, vacant buildings, and public spaces."
  },
  "下呂 Art Discovery 2026": {
    "tagline": "Travel through Gero Onsen, forests, and a former school with art.",
    "desc": "A new art festival in Gero, Gifu, home to one of Japan's three most celebrated hot springs. Site-specific works unfold across forests, historic streets, and a former wooden school, exploring relationships between people and nature. General director Fram Kitagawa leads the festival, with 59 participating groups from 14 countries and regions."
  },
  "富士山芸術祭2026": {
    "tagline": "Explore culture and art across Yamanashi with Mount Fuji in view.",
    "desc": "A wide-ranging festival centered on the World Heritage site of Mount Fuji, connecting historic buildings, temples, museums, sake breweries, and places associated with notable figures across Yamanashi. Held every four years, it links traditional craft with contemporary art to reveal overlooked regional values."
  },
  "三島満願芸術祭2026": {
    "tagline": "Encounter contemporary art on the streets of Mishima.",
    "desc": "A contemporary art festival based in Mishima, Shizuoka. First held in November 2023, it reaches its third edition in 2026 and continues to build a local model connecting contemporary art with venues and communities across the city."
  },
  "アラフドアートアゲイン": {
    "tagline": "Journey into art and reflection in the mountains of Tsuchiyu Onsen.",
    "desc": "An art project set in the mountains surrounding Tsuchiyu Onsen in Fukushima, within Bandai-Asahi National Park. Artists from Japan and abroad develop ideas and works in dialogue with the hot-spring area's natural environment."
  },
  "神戸六甲ミーツ・アート2026 beyond": {
    "tagline": "Walk across Mount Rokko in search of contemporary art.",
    "desc": "An annual contemporary art festival held each autumn on Mount Rokko in Kobe since 2010. Artworks are scattered throughout the mountain's rich natural environment, combining easy access from central Kobe with an outdoor art experience."
  },
  "武雄のあかりめぐり": {
    "tagline": "Explore Takeo Onsen at night through light and art.",
    "desc": "An annual light event illuminating attractions across Takeo, Saga. Eight sites become nighttime destinations, including Mifuneyama Rakuen with teamLab's “A Forest Where Gods Live,” Takeo Onsen Romon Gate, Takeo Shrine, and Takeo City Library. The event reaches its 11th edition in 2026."
  },
  "飛生芸術祭": {
    "tagline": "Enter a storybook-like festival in a Hokkaido forest and former school.",
    "desc": "An annual festival organized by TOBIU Art Community, founded in 1986 around the former Tobiu Elementary School in Shiraoi, Hokkaido. The wooden school and surrounding forest become exhibition and gathering spaces for diverse forms of expression, with the opening event TOBIU CAMP held alongside the festival.",
    "dateNote": "TOBIU CAMP takes place on September 12."
  },
  "福島ビエンナーレ2026": {
    "tagline": "Confront memory, place, and contemporary art in Futaba, Fukushima.",
    "desc": "A contemporary art project held every two years since 2004. The 2026 edition commemorates 15 years since the Great East Japan Earthquake and takes place across eight municipalities in Futaba District under the theme “Cinematic ∞ Art,” connecting Fukushima University and local communities through art and cultural memory."
  },
  "AWANO 夢咲くART FESTIVAL 2026": {
    "tagline": "Enjoy flowers, art, and food in the satoyama landscape of Kanuma.",
    "desc": "An arts festival held since 2016 in the Awano area of Kanuma, Tochigi. Centered on the current and former Awano Junior High School buildings, it combines exhibitions, stage programs, and a market with seasonal satoyama scenery including buckwheat and red spider lilies. The 2026 edition is the ninth."
  },
  "房総国際芸術祭 アート×ミックス2027": {
    "tagline": "Cross the Boso Peninsula in search of art, music, and food.",
    "desc": "A new international art festival spanning Ichihara, Kisarazu, and Otaki in Chiba Prefecture. Under general director Fram Kitagawa and general producer Takeshi Kobayashi, the project imagines the Boso Peninsula as a shared “art factory” to be explored by train, car, or bicycle through art, music, and food."
  },
  "横浜トリエンナーレ": {
    "tagline": "Encounter contemporary art from around the world in Yokohama.",
    "desc": "One of Japan's leading international exhibitions of contemporary art, founded in 2001 and held every three years across Yokohama's central waterfront, including Minato Mirai. The ninth edition will be artistically directed by Cosmin Costinas and Inti Guerrero."
  },
  "逗子アートフェスティバル": {
    "tagline": "Walk through seaside Zushi and discover community-based art.",
    "desc": "An annual art event held in Zushi, Kanagawa, since 2013. With a focus on community development through art, it brings residents and artists together in programs staged throughout the city and along the coast."
  },
  "ART/X/TOYAMA（アートエクストヤマ）": {
    "tagline": "Explore contemporary art from Japan and abroad in Uozu, Toyama.",
    "desc": "An international contemporary art exhibition held every four years at the Niikawa Culture Hall in Uozu, Toyama. Running since 1993, it has welcomed artists from Japan and countries including France, Turkey, Germany, South Korea, and China. The 2026 edition marks the 10th exhibition and brings together artists from nine countries."
  },
  "いしかわ舞台芸術祭2026": {
    "tagline": "Spend an autumn in Kanazawa moving between theater, dance, and music.",
    "desc": "A performing-arts festival in Ishikawa welcoming artists from Japan and abroad. It presents theater, dance, music, and cross-disciplinary stage works, offering audiences new performance experiences and opportunities for cultural exchange.",
    "dateText": "September–December 22, 2026."
  },
  "熊川宿若狭芸術祭": {
    "tagline": "Encounter artists in residence inside the historic houses of Kumagawa-juku.",
    "desc": "An arts festival held since fiscal 2023 with the aim of developing Kumagawa-juku in Wakasa, Fukui, as a hub for international cultural exchange. Artists of diverse ages, nationalities, genders, and abilities take part in short residencies, exhibitions, and concerts, including participants from overseas."
  },
  "浅間国際フォトフェスティバル（PHOTO MIYOTA）": {
    "tagline": "Experience photography with all five senses at the foot of Mount Asama.",
    "desc": "An international photography festival held since 2018 around MMoP, a cultural complex in Miyota, Nagano, formerly home to the Mercian Karuizawa Museum. Works by photographers from Japan and abroad are shown amid the nature of Mount Asama; in 2026, exhibition areas expand across the town."
  },
  "原泉アートデイズ！": {
    "tagline": "Explore works born from artist residencies in Kakegawa's rural landscape.",
    "desc": "An artist-in-residence program and exhibition in the Haraizumi district of northern Kakegawa, Shizuoka. Haraizumi Art Project has operated HARAIZUMI AIR since 2018, supporting artists from Japan and abroad and presenting work across former tea factories, traditional houses, and other sites throughout the district.",
    "dateText": "2026 Art Days dates have not yet been announced."
  },
  "大野芸術祭（OHNO ART BREW）": {
    "tagline": "Walk with art through the seaside town of Ono in Tokoname.",
    "desc": "An arts festival held since 2024 across Ono in Tokoname, Aichi. Artworks appear in everyday places including the beach, station plaza, and cafés, creating an accessible, admission-free event rooted closely in the local community."
  },
  "長浜国際芸術祭": {
    "tagline": "Encounter art from Japan and abroad in Nagahama's shopping streets.",
    "desc": "An international art project staged in the central shopping streets of Nagahama, Shiga. Against the backdrop of the city's history and culture, it creates opportunities for artists from Japan and abroad to meet local residents, with exchange with Poland as a distinctive feature. The 2026 edition is the second."
  },
  "KYOTO EXPERIMENT 京都国際舞台芸術祭2026": {
    "tagline": "Move between experimental performances across Kyoto in autumn.",
    "desc": "A performing-arts festival held across Kyoto since 2010. It presents adventurous artists from Japan and abroad working across theater, dance, music, and visual art, organized through three program strands: Kansai Studies, Shows, and SKF. The 2026 festival runs October 3–25."
  },
  "生きた建築ミュージアムフェスティバル大阪（イケフェス大阪）": {
    "tagline": "Spend two days exploring Osaka's remarkable architecture during a citywide open house.",
    "desc": "One of Japan's largest architecture events, opening attractive buildings across Osaka to the public for free over an autumn weekend. Around 200 examples of “living architecture,” from historic landmarks and modern buildings to neighborhood cafés, open their doors. The 2026 edition is October 24–25."
  },
  "紀南アートウィーク": {
    "tagline": "Explore the sea, mountains, and everyday culture of Kinan through art.",
    "desc": "An ongoing art project based in the Kinan region of Wakayama, including Tanabe. Exhibitions and talks examine local ways of life—such as citrus growing, fishing, regional history, and belief—through the perspective of contemporary art."
  },
  "森の芸術祭 晴れの国・岡山2027": {
    "tagline": "Travel through northern Okayama and encounter forests and art.",
    "desc": "An international art festival spanning 12 municipalities in northern Okayama, including Tsuyama, Takahashi, Niimi, Maniwa, and Mimasaka. Permanent works from the 2024 edition, including pieces by Michael Lin and Kazuyo Sejima, remain viewable. The next edition is planned for autumn 2027.",
    "dateText": "Planned for autumn 2027."
  },
  "瀬戸内産業芸術祭": {
    "tagline": "See the industrial landscape of Setouchi from a new perspective through art.",
    "desc": "A distributed museum concept that re-examines the industries that supported Japan's development around the Seto Inland Sea, including salt making, shipbuilding, and steel. Artists and creators work with participating companies to reinterpret factories and reveal new ways of understanding industrial culture."
  },
  "MAFIN（Miyajima Art Festival in the Narrative）": {
    "tagline": "See history and contemporary art meet inside a temple on Miyajima.",
    "desc": "An annual contemporary art exhibition held at Daishoin Temple on sacred Mount Misen, Miyajima, Hiroshima. Through art it reflects on peace and the cultural meaning of the island, with works inspired by Miyajima's natural landscape placed in dialogue with the historic temple setting."
  },
  "ART FAIR ASIA FUKUOKA（AFAF）": {
    "tagline": "See contemporary art from across Asia in one place in Fukuoka.",
    "desc": "An art fair at Fukuoka Kokusai Center that connects Japan with the wider Asian art scene. The 2026 edition is the 11th, bringing together leading galleries from Japan and abroad and linking with Fukuoka Art Next as part of the city's growing art ecosystem. It runs October 2–4, 2026.",
    "dateNote": "October 1 is VIP View."
  },
  "SAGA ARTIST FAIR 2027": {
    "tagline": "Discover emerging artists at a fair in Saga.",
    "desc": "An open-call art fair based in Saga City with a focus on discovering and introducing emerging artists. Artists are selected through an open application process for each edition. The 2027 fair is planned for mid-February, with applications opening from mid-August 2026.",
    "dateText": "Planned for mid-February 2027."
  },
  "種子島宇宙芸術祭": {
    "tagline": "Experience space and art together on Tanegashima.",
    "desc": "A one-of-a-kind art festival centered on the theme of space in Minamitane, Kagoshima, around the Tanegashima Space Center. Inspired by the ideas of astronomer Carl Sagan, it proposes “space art” as a new field, with a summer camp and a winter light festival."
  }
};

const CASE_CONTENT_KO = {
  "札幌国際芸術祭（SIAF）": {
    "name": "삿포로 국제예술제 (SIAF)",
    "tagline": "눈의 도시 삿포로에서 도시문화와 미디어아트를 만나다.",
    "desc": "삿포로의 풍부한 자연환경과 도시 인프라, 대학, IT·미디어아트 기반을 연결해 ‘창조도시 삿포로’를 보여주는 국제예술제입니다."
  },
  "AOMORI GOKAN": {
    "name": "아오모리 5관 (AOMORI GOKAN)",
    "tagline": "아오모리의 다섯 미술관과 아트센터를 여행하다.",
    "desc": "아오모리현의 5개 미술관·아트센터가 연계하는 프로젝트입니다. 현내 회유를 촉진하고, 지역 예술의 국내외 발신과 문화·경제·교육의 발전을 함께 도모합니다.",
    "dateText": "5개 시설은 연중 방문할 수 있습니다."
  },
  "三陸国際芸術祭": {
    "name": "산리쿠 국제예술제",
    "tagline": "산리쿠를 여행하며 지역에 뿌리내린 전통공연을 만나다.",
    "desc": "산리쿠의 전통예능과 일본·해외 아티스트를 연결하는 예술제입니다. 동일본대지진 이후의 문화 재생과 차세대 전승자 육성, 지역의 다양한 문화유산 발신을 목표로 합니다."
  },
  "リボーンアートフェス": {
    "name": "리본 아트 페스티벌 (Reborn-Art Festival)",
    "tagline": "이시노마키에서 아트·음악·음식을 함께 경험하다.",
    "desc": "동일본대지진 피해지역인 이시노마키를 무대로 열리는 아트·음악·음식의 복합 페스티벌입니다. 현대미술 작품, 지역 음식, 라이브 음악을 통해 새로운 삶의 방식을 제안합니다."
  },
  "かみこあにプロジェクト": {
    "name": "가미코아니 프로젝트",
    "tagline": "아키타의 작은 마을에서 예술과 일상을 발견하다.",
    "desc": "고령화가 빠르게 진행되는 아키타현 가미코아니촌에서 현대미술, 음악, 전통예능을 중심으로 매년 열리는 프로젝트입니다. 주민 주도의 실행위원회가 장기적으로 운영합니다.",
    "dateText": "2026년 일정은 아직 발표되지 않았습니다."
  },
  "山形ビエンナーレ": {
    "name": "야마가타 비엔날레 (YAMAGATA BIENNALE)",
    "tagline": "자오온천과 야마가타 시내를 예술과 함께 걷다.",
    "desc": "도호쿠예술공과대학을 중심으로 2014년부터 열리는 비엔날레입니다. 시내의 기존 공간을 활용해 중심시가지 활성화에 기여하며, 2024년에는 처음으로 자오온천까지 영역을 넓혔습니다.",
    "dateText": "다음 개최 일정은 미정입니다(직전 개최: 2024년)."
  },
  "ハマカルアートプロジェクト": {
    "name": "하마컬 아트 프로젝트 (HAMACUL ART PROJECT)",
    "tagline": "후쿠시마 하마도리에서 작가·제작현장·지역사회를 만나다.",
    "desc": "후쿠시마 하마도리 12개 시정촌에서 학생과 지역주민과 함께 활동하는 예술가·단체를 지원하는 프로그램입니다. 지역의 아트 활동과 체류 제작을 함께 뒷받침합니다.",
    "dateText": "2026년도에 걸쳐 각 프로젝트가 진행됩니다."
  },
  "アーカスプロジェクト（ARCUS）": {
    "name": "아르쿠스 프로젝트 (ARCUS Project)",
    "tagline": "세계의 아티스트가 머물며 작업하는 모리야를 방문하다.",
    "desc": "1994년 이바라키현이 시작한 일본의 대표적 장수 아티스트 인 레지던스입니다. 국제적으로 활동하는 작가의 체류 제작과 학습 프로그램, 워크숍, 주민 참여의 장을 운영합니다."
  },
  "取手アートプロジェクト": {
    "name": "도리데 아트 프로젝트 (TAP)",
    "tagline": "도리데의 주택단지와 농촌 풍경 속에서 예술이 일상이 되는 방식을 보다.",
    "desc": "1999년부터 주민, 도리데시, 도쿄예술대학이 공동 운영하는 아트 프로젝트입니다. 2010년 이후에는 축제형에서 장기 프로젝트형으로 전환해 단지와 농업을 무대로 한 활동을 이어갑니다."
  },
  "KEAT 小砂環境芸術祭": {
    "name": "KEAT 고이사고 환경예술제",
    "tagline": "도치기의 사토야마에서 자연과 예술 사이를 걷다.",
    "desc": "‘일본에서 가장 아름다운 마을’ 연합에 속한 도치기현 나카가와정 고이사고에서 열리는 예술제입니다. 예술을 통해 지역의 가치를 재발견하고 환경과 조화를 이루는 새로운 문화를 모색합니다."
  },
  "中之条ビエンナーレ": {
    "name": "나카노조 비엔날레",
    "tagline": "군마의 온천마을과 사토야마를 예술과 함께 여행하다.",
    "desc": "군마현 나카노조에서 2년마다 열리는 국제 현대미술제입니다. 작가들이 산촌에 머물며 지역의 사토야마 문화에 반응한 작품을 만들고 비엔날레 기간에 발표합니다."
  },
  "さいたま国際芸術祭": {
    "name": "사이타마 국제예술제",
    "tagline": "사이타마 시내 곳곳에서 현대미술을 탐험하다.",
    "desc": "사이타마시 전역에서 3년마다 열리는 예술제입니다. 시민 참여를 중심에 두고 다양한 장소에서 주민, 아티스트, 지역 커뮤니티가 만나 협업할 기회를 만듭니다."
  },
  "千葉国際芸術祭": {
    "name": "지바 국제예술제",
    "tagline": "예술을 통해 지바의 일상 풍경을 새롭게 바라보다.",
    "desc": "2025년 지바시에서 시작된 3년 주기의 예술제입니다. 단기 관광객 유치에 그치지 않고, 시민과 방문자의 창의성을 자극해 중장기적으로 일상을 풍요롭게 하는 것을 지향합니다."
  },
  "東京ビエンナーレ": {
    "name": "도쿄 비엔날레",
    "tagline": "도쿄라는 도시 자체를 하나의 전시장으로 바꾸다.",
    "desc": "2020/21년에 시작된 국제 비엔날레로 도쿄의 도시공간 전반을 무대로 합니다. 갤러리뿐 아니라 거리, 고가 아래, 역사적 건축 등 지요다·주오·분쿄·다이토의 일상 공간에 작품이 펼쳐집니다."
  },
  "黄金町エリアマネジメント/バザール": {
    "name": "고가네초 바자르",
    "tagline": "예술로 변화해온 고가네초의 동네를 걷다.",
    "desc": "과거 불법 영업이 밀집했던 요코하마 고가네초에서 2005년경부터 진행된 예술 기반 지역재생 프로젝트입니다. 2008년 고가네초 바자르가 시작됐고 2009년에는 지역매니지먼트센터가 설립됐습니다."
  },
  "大地の芸術祭": {
    "name": "에치고쓰마리 대지의 예술제",
    "tagline": "예술을 길잡이 삼아 에치고쓰마리의 사토야마를 여행하다.",
    "desc": "세계 최대 규모의 국제예술제 중 하나이자 일본 지역예술제 흐름의 선구자입니다. 예술을 매개로 사토야마를 여행하는 방식은 지역재생 모델로 국제적 주목을 받았으며 본 행사 사이에도 계절 프로그램이 이어집니다."
  },
  "ガラスの街とやま": {
    "name": "유리의 도시 도야마 (Glass Art City, Toyama)",
    "tagline": "도야마의 유리문화와 상징적인 미술관을 둘러보다.",
    "desc": "도야마시는 유리를 도시정책과 문화정체성의 핵심으로 삼아왔습니다. 2015년 개관한 도야마시 유리미술관을 중심으로 유리조형연구소와 공방 등이 도시 전체의 생태계를 이룹니다."
  },
  "Go FOR KOGEI": {
    "name": "고 포 코게이 (GO FOR KOGEI)",
    "tagline": "호쿠리쿠를 여행하며 공예와 현대미술을 만나다.",
    "desc": "오랜 제작문화가 이어진 호쿠리쿠에서 공예를 새롭게 바라보기 위해 2020년 시작된 프로젝트입니다. 역사적 거리, 사찰과 신사에서 전시를 열고 심포지엄 등을 통해 동시대의 공예를 탐구합니다."
  },
  "Zen AIR（禅×AIR）": {
    "name": "젠 AIR (ZEN AIR)",
    "tagline": "선 문화와 함께하는 아티스트 레지던스를 경험하다.",
    "desc": "선 문화로 알려진 후쿠이현 에이헤이지에서 진행되는 테마형 아티스트 인 레지던스입니다. 작가들이 선 수행과 주민 교류를 통해 조사·제작하고 결과를 작품과 연구로 공유합니다."
  },
  "FUJI TEXTILE WEEK": {
    "name": "후지 텍스타일 위크 (FUJI TEXTILE WEEK)",
    "tagline": "직물과 디자인의 도시 후지요시다를 걷다.",
    "desc": "천년 넘는 직물산지인 야마나시현 후지요시다에서 2021년 시작된 텍스타일·아트 페스티벌입니다. 현대적 표현과 전통산업, 지역재생을 연결합니다.",
    "dateText": "다음 개최 일정은 미정입니다(2025년 행사는 종료)."
  },
  "北アルプス国際芸術祭": {
    "name": "북알프스 국제예술제",
    "tagline": "북알프스의 도시와 풍경을 예술과 함께 여행하다.",
    "desc": "나가노현 오마치에서 지역의 숨은 매력을 발견하고 개성 있는 마을을 만들기 위해 시작된 국제예술제입니다. 2017년, 2021년, 2024년에 개최됐습니다."
  },
  "美濃和紙あかりアート展": {
    "name": "미노 와시 아카리 아트전",
    "tagline": "미노의 옛 거리를 화지 조명의 빛으로 만나다.",
    "desc": "미노와시로 만든 약 300점의 조명 작품이 우다쓰가 남은 역사적 거리를 은은하게 밝히는 장수 전시입니다. 전국 공모 작품 가운데 선정작을 전시·심사합니다."
  },
  "アーツカウンシルしずおか": {
    "name": "시즈오카 아츠 카운실 (Arts Council Shizuoka)",
    "tagline": "시즈오카 각지의 문화활동을 발견하는 관문.",
    "desc": "시즈오카현 전역의 예술문화 활동을 보조금, 상담, 정보발신으로 지원하는 중간지원조직입니다. 일회성 지원에 그치지 않고 예술가와 NPO를 장기 지원하며 행정과 민간을 연결합니다."
  },
  "国際芸術祭「あいち」": {
    "name": "아이치 트리엔날레",
    "tagline": "아이치 곳곳에서 세계의 현대미술을 탐험하다.",
    "desc": "아이치현이 3년마다 개최하는 대규모 국제 현대미술제입니다. 아이치예술문화센터와 현내 도시공간을 무대로 현대미술, 공연예술, 학습 프로그램을 함께 선보입니다."
  },
  "亀山トリエンナーレ": {
    "name": "가메야마 트리엔날레",
    "tagline": "가메야마 시내 곳곳의 작은 표현을 찾아 걷다.",
    "desc": "미에현 가메야마시에서 추진하는 예술 기반 지역만들기 프로젝트입니다. 세대를 넘어 일상에서 길러지는 ‘사람의 마음을 움직이는 것’을 넓은 의미의 예술로 보고 2014년부터 트리엔날레를 개최합니다."
  },
  "BIWAKOビエンナーレ": {
    "name": "비와코 비엔날레 (BIWAKO BIENNALE)",
    "tagline": "오미하치만의 오래된 마치야를 현대미술과 함께 둘러보다.",
    "desc": "시가현 오미하치만의 고택, 마치야, 창고를 중심으로 열리는 국제 비엔날레입니다. 국내외 작가들이 건물의 기억과 특성에 반응한 설치작품을 선보이며 도시 전체를 미술관처럼 만듭니다."
  },
  "KYOTOGRAPHIE": {
    "name": "KYOTOGRAPHIE 국제사진제",
    "tagline": "봄의 교토를 사진과 건축으로 걷다.",
    "desc": "매년 봄 교토의 사찰, 마치야, 근대건축, 공공공간에서 열리는 국제사진제입니다. 2013년 시작됐으며 공모형 위성 프로그램 KG+도 함께 진행됩니다. 2026년 제14회 주제는 ‘EDGE’입니다."
  },
  "北加賀屋クリエイティブ・ビレッジ": {
    "name": "기타카가야 크리에이티브 빌리지",
    "tagline": "오사카의 옛 조선소 지역에서 창작공간을 탐험하다.",
    "desc": "오사카 스미노에구 기타카가야의 옛 조선소 부지에 지역 부동산회사 치시마토지 등이 단계적으로 조성한 아트·크리에이티브 공간 네트워크입니다. 비교적 낮은 임대료와 유연한 공간 활용로 다양한 창작자가 모였습니다."
  },
  "神戸・新開地（アートひろば等）": {
    "name": "고베·신카이치 아트 프로젝트",
    "tagline": "고베의 오래된 번화가에서 공연예술과 지역문화를 경험하다.",
    "desc": "한때 서일본을 대표하던 오락가였던 고베 신카이치의 예술 기반 재생 프로젝트입니다. 빈 건물과 점포를 아트공간, 연습실, 소극장으로 활용해 지역의 문화인력과 새로운 커뮤니티 거점을 키웠습니다."
  },
  "はならぁと": {
    "name": "HANARART 나라 마치야 예술제",
    "tagline": "나라의 옛 거리와 빈집, 마을에서 예술을 발견하다.",
    "desc": "나라현의 마을, 마치야, 빈 건물, 사찰과 신사를 활용하는 분산형 예술제입니다. 가시하라·우다·요시노 등 여러 지역에서 순차적으로 프로그램이 열려 평소 찾기 어려운 장소로 방문객을 이끕니다."
  },
  "JAPAN WALLS（和歌山）": {
    "name": "재팬 월스 시라하마 (JAPAN WALLS in SHIRAHAMA)",
    "tagline": "와카야마의 거리에서 거대한 벽화를 만나다.",
    "desc": "일본과 해외의 스트리트 아티스트를 초청해 건물 외벽에 대형 벽화를 만드는 프로젝트입니다. 강렬한 비주얼로 거리 풍경을 바꾸고 SNS와 입소문을 통해 새로운 방문객을 끌어옵니다."
  },
  "鳥取県立美術館の取り組み": {
    "name": "돗토리현립미술관",
    "tagline": "돗토리의 새 미술관에서 시작해 지역을 둘러보다.",
    "desc": "2025년 구라요시에 문을 연 돗토리현립미술관을 중심으로 한 문화 프로젝트입니다. 주민과의 대화를 바탕으로 조성됐으며 민예와의 지역적 연결을 살려 학습·교류·창작의 거점 역할을 합니다."
  },
  "石見アーツプロジェクト": {
    "name": "이와미 아츠 프로젝트 (IWAMI ARTS PROJECT)",
    "tagline": "이와미 지역의 문화에 뿌리내린 예술 활동을 만나다.",
    "desc": "시마네현 서부 이와미 지역의 문화진흥 프로젝트입니다. 이와미 가구라, 이와미긴잔 은광, 세키슈와시 같은 지역자원과 현대적 표현을 연결하고 젊은 예술가와 문화인력의 정착을 돕습니다."
  },
  "岡山芸術交流": {
    "name": "오카야마 아트 서밋 (OKAYAMA ART SUMMIT)",
    "tagline": "오카야마 중심부에서 국제 현대미술을 탐험하다.",
    "desc": "오카야마의 역사적 성곽도시 지역을 중심으로 3년마다 열리는 국제 현대미술전입니다. 하야시바라미술관과 옛 우치산게초등학교 등 역사적 건축과 공공공간에 대형 작품이 설치되며 걸어서 둘러보기 좋습니다."
  },
  "広島国際建築祭": {
    "name": "히로시마 국제건축제",
    "tagline": "오노미치와 후쿠야마를 건축과 도시의 이야기로 걷다.",
    "desc": "2025년 히로시마에서 시작된 건축 전문 국제 페스티벌입니다. 후쿠야마와 오노미치를 중심으로 투어, 전시, 심포지엄을 통해 도시의 기억과 재건, 재생을 건축의 관점에서 다시 생각합니다."
  },
  "YCAM（山口情報芸術センター）": {
    "name": "YCAM (야마구치 정보예술센터)",
    "tagline": "야마구치에서 미디어아트의 실험을 만나다.",
    "desc": "야마구치시가 설립한 공공 미디어아트센터입니다. 예술·기술·연구를 통합한 R&D와 예술가·엔지니어의 협업을 통해 전시, 공연, 워크숍, 국제 공동프로젝트를 제작합니다."
  },
  "神山AIR": {
    "name": "가미야마 아티스트 인 레지던스 (KAIR)",
    "tagline": "산골마을 가미야마에서 작업하는 아티스트를 만나다.",
    "desc": "1990년대 후반부터 도쿠시마현 가미야마에서 이어진 아티스트 인 레지던스입니다. 체류 제작에서 시작해 위성오피스, 이주, 빈집 재생으로 확장되며 ‘가미야마 모델’ 지역재생의 중요한 출발점이 됐습니다."
  },
  "瀬戸内国際芸術祭": {
    "name": "세토우치 트리엔날레",
    "tagline": "예술을 목적지 삼아 세토나이카이의 섬들을 여행하다.",
    "desc": "세토나이카이의 섬과 항구를 무대로 3년마다 열리는 대규모 국제예술제입니다. 나오시마·데시마·메기지마·쇼도시마 등 12개 섬과 2개 항구에 작품이 펼쳐집니다. 본행사는 2025년에 열렸고 다음은 2028년이며 2026년에는 ART SETOUCHI 프로그램이 이어집니다."
  },
  "道後オンセアート": {
    "name": "도고 아트 (DOGO ART)",
    "tagline": "도고온천을 걸으며 곳곳의 예술을 만나다.",
    "desc": "일본에서 가장 오래된 온천마을 중 하나인 마쓰야마 도고온천을 무대로 한 아트 프로젝트입니다. 료칸, 공중목욕탕, 상점가가 국내외 작가의 설치와 참여형 작품을 만나는 전시장으로 변합니다."
  },
  "高知県芸術祭/KOCHI ART PROJECTS": {
    "name": "고치현 예술제 / KOCHI ART PROJECTS",
    "tagline": "다양한 표현을 따라 고치의 도시와 지역을 탐험하다.",
    "desc": "고치현의 가을 예술제를 중심으로 지역의 예술 기반 활동을 지원하는 KOCHI ART PROJECTS를 함께 전개합니다. 연극, 음악, 미술, 전통문화와 지역 밀착형 프로젝트가 현 전역에서 이어집니다."
  },
  "Fukuoka Art Next": {
    "name": "후쿠오카 아트 넥스트 (Fukuoka Art Next)",
    "tagline": "후쿠오카 시내 곳곳에서 현대미술을 가볍게 만나다.",
    "desc": "후쿠오카시가 2022년도에 시작한 종합 문화정책입니다. 행정·대학·민간이 협력해 시민의 예술 접점을 넓히고 Artist Cafe Fukuoka, 벽화, 아트페어 등을 통해 작가 육성과 교류를 지원합니다."
  },
  "Creative Residency in Arita": {
    "name": "아리타 크리에이티브 레지던시 (Creative Residency in Arita)",
    "tagline": "일본 도자의 고장 아리타에서 국제 아티스트의 제작을 만나다.",
    "desc": "일본 도자의 발상지 아리타에서 국내외 작가와 디자이너가 지역 가마·장인과 협업하는 3개월 레지던스입니다. 2016년 시작돼 국제교류를 통해 아리타야키의 새로운 가능성을 모색합니다.",
    "dateText": "2026년 6~8월(아티스트 레지던스)."
  },
  "南島原市アートビレッジ・シラキノ": {
    "name": "미나미시마바라 아트 빌리지 시라키노",
    "tagline": "미나미시마바라의 옛 학교에서 아티스트 레지던스를 만나다.",
    "desc": "나가사키현 미나미시마바라의 폐교를 활용한 복합예술시설입니다. 젊은 작가의 체류 제작을 지원하고 워크숍과 주민 교류를 통해 지역문화의 성장을 돕습니다."
  },
  "くまもとアートポリス": {
    "name": "구마모토 아트폴리스",
    "tagline": "건축을 따라 구마모토의 도시와 지역을 읽다.",
    "desc": "1988년 시작된 구마모토현의 장기 건축·도시디자인 프로젝트입니다. 저명한 건축가를 커미셔너로 두고 공공시설, 교량, 도로, 공원 등 현 전역의 공공공간 디자인 품질을 높여왔습니다."
  },
  "BEPPU PROJECT": {
    "name": "벳푸 프로젝트 (BEPPU PROJECT)",
    "tagline": "온천도시 벳푸 곳곳에서 예술과 지역 프로젝트를 만나다.",
    "desc": "벳푸를 거점으로 활동하는 예술단체이자 프로젝트 플랫폼입니다. 빈 공간을 활용한 국제예술제에서 출발해 레지던스, 인재육성, 거점운영, 음식과 문화를 잇는 사업으로 확장하며 공공과 민간을 연결합니다."
  },
  "新富芸術祭": {
    "name": "신토미 예술제",
    "tagline": "미야자키 신토미의 일상 속에 스며든 예술을 즐기다.",
    "desc": "미야자키현 신토미의 농촌 풍경과 생활공간, 역사적 제례 공간을 무대로 열리는 소규모 예술제입니다. 국내외 작가가 주민과 협업하며 지역 부담을 줄인 지속가능한 운영을 지향합니다."
  },
  "霧島アートの森活用まちづくり": {
    "name": "기리시마 야외미술관 지역만들기",
    "tagline": "기리시마의 자연 속에서 야외미술을 탐험하다.",
    "desc": "유스이의 기리시마 야외미술관을 중심으로 한 지역만들기 활동입니다. 국내외 작가의 조각과 설치가 화산지형 속에 배치돼 예술 감상, 교육, 자연 체험을 함께 제공합니다."
  },
  "やんばるアートフェスティバル": {
    "name": "얀바루 아트 페스티벌 (YAMBARU ART FESTIVAL)",
    "tagline": "얀바루의 숲과 마을을 예술과 공예로 탐험하다.",
    "desc": "오키나와 북부 얀바루에서 열리는 예술제입니다. 세계자연유산 지역의 아열대 숲, 마을, 해안을 무대로 현대미술·전통예능·공예를 결합하며 자연과의 공존을 핵심 주제로 삼습니다."
  },
  "恵比寿映像祭2026": {
    "name": "에비스 영상제 2026",
    "tagline": "에비스에서 영상과 사진의 ‘지금’을 경험하다.",
    "desc": "도쿄도사진미술관이 주최하는 국제 영상예술제입니다. 사진, 영화, 사운드, 퍼포먼스 등 다양한 형식을 통해 ‘영상이란 무엇인가’를 탐구합니다. 2026년 주제는 ‘Polyphonic Voices Bathed in Sunlight’입니다.",
    "dateNote": "2026년 본 행사는 종료되었습니다."
  },
  "東京建築祭2026": {
    "name": "도쿄 건축제 2026",
    "tagline": "도쿄의 주목할 만한 건축을 직접 들어가 보는 주말.",
    "desc": "평소 들어가기 어려운 도쿄의 건축을 공개하는 건축축제입니다. 2024년 첫 개최에 6만5천 명이 방문했으며 2026년에는 시부야까지 확대돼 70곳 이상의 건축이 참여했습니다.",
    "dateNote": "2026년 행사는 종료되었습니다."
  },
  "すみだ五彩の芸術祭": {
    "name": "스미다 오색 예술제",
    "tagline": "스미다를 걸으며 지역의 기억을 예술로 만나다.",
    "desc": "스미다구가 직접 주최하는 장기 예술제로 도쿄 23구 가운데 이 규모의 행사는 처음입니다. ‘먹에는 오색이 있다’는 말에서 착안해 오래된 집, 절, 상점가 등 일상공간에서 지역의 역사·산업·기억을 조명합니다."
  },
  "TOKYO ATLAS（国際文化芸術祭）": {
    "name": "TOKYO ATLAS 국제문화예술제",
    "tagline": "도쿄 워터프런트에서 세계의 현대미술을 탐험하다.",
    "desc": "2026년 새롭게 시작된 도쿄 문화예술제의 국제미술전입니다. 오다이바·아오미·텐노즈 등 수변지역을 무대로 국제적으로 알려진 작가와 도쿄도가 지원하는 젊은 작가를 함께 소개합니다."
  },
  "前橋国際芸術祭2026「めぶく。」": {
    "name": "마에바시 국제예술제 2026 ‘메부쿠.’",
    "tagline": "건축과 예술을 따라 마에바시 중심가를 걷다.",
    "desc": "마에바시 도심을 중심으로 처음 열리는 국제예술제입니다. 2016년 도시비전 ‘메부쿠.’ 10주년을 계기로 후지모토 소우의 건축 등 도시재생과 예술을 연결하고 상점가, 빈 건물, 공공공간을 걸어서 탐험하게 합니다."
  },
  "下呂 Art Discovery 2026": {
    "name": "게로 아트 디스커버리 2026 (Gero Art Discovery 2026)",
    "tagline": "게로온천과 숲, 옛 학교를 예술과 함께 여행하다.",
    "desc": "일본 3대 온천 중 하나인 기후현 게로를 무대로 한 새로운 예술제입니다. 숲, 역사적 거리, 옛 목조학교에 장소특정적 작품이 펼쳐지며 인간과 자연의 관계를 탐구합니다. 기타가와 후람이 총괄디렉터를 맡고 14개 국가·지역 59팀이 참여합니다."
  },
  "富士山芸術祭2026": {
    "name": "후지 아트 페스티벌 2026 (Fuji Art Festival 2026)",
    "tagline": "후지산을 바라보며 야마나시의 문화와 예술을 탐험하다.",
    "desc": "세계유산 후지산을 중심으로 야마나시의 역사건축, 사찰, 미술관, 양조장, 인물 관련 장소를 연결하는 광역 예술제입니다. 4년마다 열리며 전통공예와 현대미술을 통해 지역의 숨은 가치를 발견합니다."
  },
  "三島満願芸術祭2026": {
    "name": "미시마 만간 예술제 2026",
    "tagline": "미시마의 거리에서 현대미술을 만나다.",
    "desc": "시즈오카현 미시마를 거점으로 한 현대미술제입니다. 2023년 11월 첫 개최 후 2026년에 3회를 맞으며, 시내의 다양한 장소와 커뮤니티를 현대미술로 잇는 지역형 모델을 발전시키고 있습니다."
  },
  "アラフドアートアゲイン": {
    "name": "아라후도 아트 어게인 2026 (ARAFUDO ART AGAIN 2026)",
    "tagline": "쓰치유온천의 산속에서 예술과 사유의 여행을 하다.",
    "desc": "반다이아사히 국립공원 안 후쿠시마 쓰치유온천 주변 산악지역을 무대로 한 아트 프로젝트입니다. 국내외 작가들이 온천지의 자연환경과 대화하며 아이디어와 작품을 발전시킵니다."
  },
  "神戸六甲ミーツ・アート2026 beyond": {
    "name": "고베 롯코 미츠 아트 2026 beyond (KOBE Rokko Meets Art)",
    "tagline": "롯코산을 걸으며 현대미술을 찾아보다.",
    "desc": "2010년부터 매년 가을 고베 롯코산에서 열리는 현대미술제입니다. 풍부한 산의 자연 속에 작품이 흩어져 있어 고베 도심에서의 접근성과 야외 예술 체험을 함께 즐길 수 있습니다."
  },
  "武雄のあかりめぐり": {
    "name": "다케오 빛 산책",
    "tagline": "빛과 예술을 따라 밤의 다케오온천을 걷다.",
    "desc": "사가현 다케오의 명소를 빛으로 연결하는 연례 야간 이벤트입니다. teamLab의 ‘A Forest Where Gods Live’가 열리는 미후네야마라쿠엔, 다케오온천 로몬, 다케오신사, 시립도서관 등 8곳이 야간 명소로 변합니다."
  },
  "飛生芸術祭": {
    "name": "도비우 예술제 (TOBIU ART FESTIVAL)",
    "tagline": "홋카이도의 숲과 옛 학교에서 동화 같은 축제에 들어가다.",
    "desc": "홋카이도 시라오이의 옛 도비우초등학교를 중심으로 1986년 출범한 TOBIU Art Community가 여는 연례 예술제입니다. 목조교사와 숲이 전시와 교류의 공간이 되며 개막 행사 TOBIU CAMP도 함께 열립니다.",
    "dateNote": "TOBIU CAMP는 9월 12일에 열립니다."
  },
  "福島ビエンナーレ2026": {
    "name": "후쿠시마 비엔날레 2026",
    "tagline": "후쿠시마 후타바에서 기억·장소·현대미술을 마주하다.",
    "desc": "2004년부터 2년마다 열리는 현대미술 프로젝트입니다. 동일본대지진 15년을 맞는 2026년에는 ‘Cinematic ∞ Art’를 주제로 후타바군 8개 지자체에서 후쿠시마대학과 지역사회를 예술과 문화의 기억으로 연결합니다."
  },
  "AWANO 夢咲くART FESTIVAL 2026": {
    "name": "AWANO 꿈피는 ART FESTIVAL 2026",
    "tagline": "가누마의 사토야마에서 꽃·예술·음식을 즐기다.",
    "desc": "도치기현 가누마시 아와노 지역에서 2016년부터 열리는 예술제입니다. 현·구 아와노중학교를 중심으로 전시, 무대, 마켓을 열고 메밀꽃과 피안화 등 계절의 사토야마 풍경을 함께 즐깁니다."
  },
  "房総国際芸術祭 アート×ミックス2027": {
    "name": "보소 국제예술제 아트×믹스 2027 (Boso Triennale 2027)",
    "tagline": "예술·음악·음식을 찾아 보소반도를 횡단하다.",
    "desc": "지바현 이치하라·기사라즈·오타키를 잇는 새로운 국제예술제입니다. 기타가와 후람과 고바야시 다케시가 이끄는 가운데 보소반도 전체를 하나의 ‘아트 팩토리’로 보고 철도, 자동차, 자전거로 탐험하도록 구성합니다."
  },
  "横浜トリエンナーレ": {
    "name": "요코하마 트리엔날레",
    "tagline": "요코하마에서 세계의 현대미술을 만나다.",
    "desc": "2001년 시작돼 3년마다 열리는 일본 대표 국제 현대미술전입니다. 미나토미라이를 포함한 요코하마 중심 수변지역이 무대이며 제9회는 코스민 코스티나스와 인티 게레로가 예술감독을 맡습니다."
  },
  "逗子アートフェスティバル": {
    "name": "즈시 아트 페스티벌",
    "tagline": "바닷가 즈시를 걸으며 지역 기반의 예술을 발견하다.",
    "desc": "2013년부터 가나가와현 즈시에서 매년 열리는 아트 이벤트입니다. ‘예술을 통한 지역만들기’를 중심으로 주민과 예술가가 함께 시내와 해안 곳곳에서 프로그램을 만듭니다."
  },
  "ART/X/TOYAMA（アートエクストヤマ）": {
    "name": "아트 엑스 도야마 (ART/X/TOYAMA)",
    "tagline": "도야마 우오즈에서 국내외 현대미술을 탐험하다.",
    "desc": "도야마현 우오즈의 니이카와문화홀에서 4년마다 열리는 국제 현대미술전입니다. 1993년부터 일본과 프랑스·터키·독일·한국·중국 등 여러 나라의 작가를 소개해왔으며 2026년 제10회에는 9개국 작가가 참여합니다."
  },
  "いしかわ舞台芸術祭2026": {
    "name": "이시카와 공연예술제 2026",
    "tagline": "가나자와의 가을을 연극·무용·음악과 함께 보내다.",
    "desc": "이시카와에서 국내외 아티스트를 초청해 열리는 공연예술제입니다. 연극, 무용, 음악과 장르를 넘는 작품을 선보이며 관객에게 새로운 공연 경험과 문화교류의 기회를 제공합니다.",
    "dateText": "2026년 9월~12월 22일."
  },
  "熊川宿若狭芸術祭": {
    "name": "구마가와주쿠 와카사 예술제",
    "tagline": "역사적 구마가와주쿠의 옛집에서 체류 작가를 만나다.",
    "desc": "후쿠이현 와카사정 구마가와주쿠를 국제문화교류 거점으로 만들기 위해 2023년도부터 열리는 예술제입니다. 다양한 연령·국적·성별·특성을 지닌 작가가 단기 체류, 전시, 콘서트에 참여합니다."
  },
  "浅間国際フォトフェスティバル（PHOTO MIYOTA）": {
    "name": "아사마 국제 포토 페스티벌 (ASAMA INTERNATIONAL PHOTO FESTIVAL)",
    "tagline": "아사마산 기슭에서 오감으로 사진을 경험하다.",
    "desc": "나가노현 미요타의 복합문화시설 MMoP 주변에서 2018년부터 열리는 국제사진제입니다. 아사마산의 자연 속에 국내외 사진가의 작품을 전시하며 2026년에는 전시 구역이 마을 전역으로 확대됩니다."
  },
  "原泉アートデイズ！": {
    "name": "하라이즈미 아트 데이즈! (HARAIZUMI ART DAYS!)",
    "tagline": "가케가와의 농촌 풍경 속에서 레지던스가 낳은 작품을 탐험하다.",
    "desc": "시즈오카현 가케가와 북부 하라이즈미 지역의 아티스트 인 레지던스와 전시 프로그램입니다. 2018년부터 국내외 작가를 지원하며 옛 차 공장, 고택 등 지역 곳곳에서 작업을 발표합니다.",
    "dateText": "2026년 Art Days 일정은 아직 발표되지 않았습니다."
  },
  "大野芸術祭（OHNO ART BREW）": {
    "name": "오노 예술제 (OHNO ART BREW)",
    "tagline": "도코나메 오노의 해변 마을을 예술과 함께 걷다.",
    "desc": "아이치현 도코나메시 오노 지역에서 2024년부터 열리는 예술제입니다. 해변, 역 앞 광장, 카페 등 일상 공간에 작품이 놓이며 입장 무료의 지역밀착형 행사로 자리잡고 있습니다."
  },
  "長浜国際芸術祭": {
    "name": "나가하마 국제예술제 2026",
    "tagline": "나가하마 상점가에서 국내외 예술을 만나다.",
    "desc": "시가현 나가하마 중심 상점가를 무대로 한 국제 아트 프로젝트입니다. 도시의 역사와 문화를 배경으로 국내외 작가와 주민의 만남을 만들며 폴란드와의 국제교류도 특징입니다. 2026년은 제2회입니다."
  },
  "KYOTO EXPERIMENT 京都国際舞台芸術祭2026": {
    "name": "교토 익스페리먼트 국제공연예술제 2026 (KYOTO EXPERIMENT)",
    "tagline": "가을 교토 곳곳을 이동하며 실험적인 공연을 만나다.",
    "desc": "2010년부터 교토 전역에서 열리는 공연예술제입니다. 연극, 무용, 음악, 미술을 넘나드는 국내외의 도전적 작업을 Kansai Studies, Shows, SKF 세 프로그램 축으로 소개합니다. 2026년은 10월 3~25일 개최됩니다."
  },
  "生きた建築ミュージアムフェスティバル大阪（イケフェス大阪）": {
    "name": "오픈 하우스 오사카 (OPEN HOUSE OSAKA)",
    "tagline": "도시 전체가 열린 집이 되는 이틀 동안 오사카 건축을 탐험하다.",
    "desc": "가을 주말 동안 오사카의 매력적인 건축을 무료 공개하는 일본 최대급 건축 이벤트입니다. 역사적 명소와 근대건축, 동네 카페까지 약 200곳의 ‘살아있는 건축’이 문을 엽니다. 2026년은 10월 24~25일입니다."
  },
  "紀南アートウィーク": {
    "name": "기난 아트 위크 (KINAN ART WEEK)",
    "tagline": "예술을 통해 기난의 바다·산·생활문화를 탐험하다.",
    "desc": "다나베를 비롯한 와카야마현 기난 지역을 거점으로 이어지는 아트 프로젝트입니다. 감귤재배, 어업, 지역사와 신앙 등 지역의 삶을 현대미술의 시각으로 바라보는 전시와 토크를 진행합니다."
  },
  "森の芸術祭 晴れの国・岡山2027": {
    "name": "오카야마 숲의 예술제 2027",
    "tagline": "오카야마 북부를 여행하며 숲과 예술을 만나다.",
    "desc": "쓰야마, 다카하시, 니이미, 마니와, 미마사카 등 오카야마 북부 12개 시정촌을 잇는 국제예술제입니다. 2024년 작품 일부는 상설로 남아 있으며 다음 행사는 2027년 가을 예정입니다.",
    "dateText": "2027년 가을 개최 예정."
  },
  "瀬戸内産業芸術祭": {
    "name": "세토우치 산업예술제",
    "tagline": "예술로 세토우치의 산업풍경을 새롭게 바라보다.",
    "desc": "제염, 조선, 제철 등 세토나이카이 주변에서 일본의 발전을 지탱한 산업을 새 시각으로 바라보는 분산형 미술관 구상입니다. 예술가와 창작자가 기업의 공장과 협업해 산업문화의 본질을 재해석합니다."
  },
  "MAFIN（Miyajima Art Festival in the Narrative）": {
    "name": "MAFIN (미야지마 내러티브 아트 페스티벌)",
    "tagline": "미야지마의 사찰에서 역사와 현대미술의 만남을 보다.",
    "desc": "히로시마 미야지마 미센산의 다이쇼인에서 매년 열리는 현대미술전입니다. 평화와 섬의 문화적 의미를 예술로 성찰하고, 미야지마 자연에서 영감을 얻은 작품을 역사적 사찰 공간과 대화시키듯 배치합니다."
  },
  "ART FAIR ASIA FUKUOKA（AFAF）": {
    "name": "아트 페어 아시아 후쿠오카 2026 (AFAF)",
    "tagline": "후쿠오카에서 아시아의 현대미술을 한자리에서 만나다.",
    "desc": "후쿠오카 국제센터에서 열리는 일본과 아시아를 연결하는 아트페어입니다. 2026년 제11회에는 국내외 주요 갤러리가 모이며 Fukuoka Art Next와 연계해 도시의 아트 생태계를 확장합니다. 10월 2~4일 개최됩니다.",
    "dateNote": "10월 1일은 VIP View입니다."
  },
  "SAGA ARTIST FAIR 2027": {
    "name": "사가 아티스트 페어 2027",
    "tagline": "사가의 아트페어에서 새로운 작가를 발견하다.",
    "desc": "사가시를 거점으로 신진 작가의 발굴과 소개에 초점을 둔 공모형 아트페어입니다. 매회 공개모집으로 참여 작가를 선정하며 2027년 행사는 2월 중순 예정, 공모는 2026년 8월 중순부터 시작됩니다.",
    "dateText": "2027년 2월 중순 개최 예정."
  },
  "種子島宇宙芸術祭": {
    "name": "다네가시마 우주예술제",
    "tagline": "다네가시마에서 우주와 예술을 함께 경험하다.",
    "desc": "가고시마현 미나미타네, 다네가시마 우주센터 주변에서 ‘우주’를 주제로 열리는 독특한 예술제입니다. 천문학자 칼 세이건의 사상에서 영감을 받아 ‘우주예술’을 새로운 장르로 제안하며 여름 캠프와 겨울 빛 축제를 진행합니다."
  }
};

const CASE_CONTENT_ZH_CN = {
  "札幌国際芸術祭（SIAF）": {
    "name": "札幌国际艺术节（SIAF）",
    "tagline": "在雪之城札幌探索城市文化与媒体艺术。",
    "desc": "以“创意城市札幌”为背景，将丰富的自然环境、城市基础设施、大学以及IT与媒体艺术社群连接起来的国际艺术节。"
  },
  "AOMORI GOKAN": {
    "name": "AOMORI GOKAN 青森五馆",
    "tagline": "穿行于青森的五座美术馆与艺术中心之间。",
    "desc": "由青森县5座美术馆与艺术中心共同开展的联动项目，通过跨馆旅行推广当地艺术生态，并促进文化、经济与教育的发展。",
    "dateText": "5个场馆全年均可参观。"
  },
  "三陸国際芸術祭": {
    "name": "三陆国际艺术节",
    "tagline": "旅行三陆，感受扎根于土地的传统表演艺术。",
    "desc": "让三陆传统艺能与日本及海外艺术家展开对话的艺术节。项目致力于震后文化复兴、培养下一代传承者，并向更广泛的观众介绍当地多元文化遗产。"
  },
  "リボーンアートフェス": {
    "name": "重生艺术节（Reborn-Art Festival）",
    "tagline": "在石卷同时体验艺术、音乐与美食。",
    "desc": "在东日本大地震受灾地石卷举办的综合型艺术节，以“Reborn-Art—生活方式”为理念，将当代艺术、地方饮食与现场音乐结合起来。"
  },
  "かみこあにプロジェクト": {
    "name": "上小阿仁项目",
    "tagline": "在秋田的小村庄里发现艺术与日常生活。",
    "desc": "在老龄化程度较高的秋田县上小阿仁村持续举办的项目，以当代艺术、音乐和传统艺能为核心，由当地居民主导的执行委员会长期运营。",
    "dateText": "2026年举办日期尚未公布。"
  },
  "山形ビエンナーレ": {
    "name": "YAMAGATA BIENNALE 山形双年展",
    "tagline": "沿着藏王温泉与山形市区一路看艺术。",
    "desc": "由东北艺术工科大学等自2014年起主办的双年展，利用城市既有空间推动中心城区活化，2024年首次将项目扩展至藏王温泉。",
    "dateText": "下一届日期尚未公布（上一届：2024年）。"
  },
  "ハマカルアートプロジェクト": {
    "name": "HAMACUL艺术项目（HAMACUL ART PROJECT）",
    "tagline": "在福岛滨通遇见艺术家、创作现场与地方社区。",
    "desc": "面向福岛滨通12个市町村，支持艺术家和团体与学生、居民共同开展项目，也支持艺术家在当地驻留创作。",
    "dateText": "相关项目将在2026年度持续开展。"
  },
  "アーカスプロジェクト（ARCUS）": {
    "name": "ARCUS艺术项目（ARCUS Project）",
    "tagline": "前往守谷，看来自世界各地的艺术家驻留与创作。",
    "desc": "茨城县于1994年启动的日本代表性长期艺术家驻留项目之一，结合国际艺术家驻留、学习计划、工作坊与居民参与空间。"
  },
  "取手アートプロジェクト": {
    "name": "取手艺术项目（TAP）",
    "tagline": "看看艺术如何融入住区与取手的乡村景观。",
    "desc": "自1999年起由居民、取手市与东京艺术大学共同运营。2010年后从节庆型转向长期项目，包括以住宅区和农业为舞台的持续性实践。"
  },
  "KEAT 小砂環境芸術祭": {
    "name": "KEAT 小砂环境艺术节",
    "tagline": "在栃木的里山之间行走于自然与艺术之间。",
    "desc": "在栃木县那珂川町小砂举办的艺术节。通过艺术重新发现地方价值，并探索与自然环境温和共生的新文化。"
  },
  "中之条ビエンナーレ": {
    "name": "中之条双年展",
    "tagline": "以艺术为线索，旅行群马的温泉乡与里山。",
    "desc": "每两年在群马县中之条町举办的国际当代艺术节。艺术家驻留于山村，根据当地里山文化进行创作，并在双年展期间展出。"
  },
  "さいたま国際芸術祭": {
    "name": "埼玉国际艺术节",
    "tagline": "在埼玉市各处探索当代艺术。",
    "desc": "每三年在埼玉市举办的艺术节，以市民参与为核心，在多种场所创造居民、艺术家与社区相遇合作的机会。"
  },
  "千葉国際芸術祭": {
    "name": "千叶国际艺术节",
    "tagline": "通过艺术重新观看千叶的日常城市风景。",
    "desc": "2025年在千叶市启动的三年一届艺术节，不只追求短期观光，而是希望激发市民与访客的创造力，让日常生活在中长期中变得更丰富。"
  },
  "東京ビエンナーレ": {
    "name": "东京双年展",
    "tagline": "把东京这座城市本身变成艺术现场。",
    "desc": "始于2020/21年的国际双年展，以东京城市空间为舞台。作品不仅出现在画廊，也进入街道、高架桥下和历史建筑等千代田、中央、文京、台东的日常空间。"
  },
  "黄金町エリアマネジメント/バザール": {
    "name": "黄金町Bazaar",
    "tagline": "漫步黄金町，看一个街区如何因艺术而改变。",
    "desc": "横滨黄金町自约2005年起推进的艺术型街区再生项目。2008年黄金町Bazaar启动，2009年成立黄金町Area Management Center，持续推动地区转型。"
  },
  "大地の芸術祭": {
    "name": "越后妻有大地艺术祭",
    "tagline": "让艺术带路，旅行越后妻有的里山。",
    "desc": "世界规模最大的国际艺术节之一，也是日本地域型艺术节的重要先驱。以艺术为线索旅行里山的模式受到国际关注，主展之间也持续举办季节性项目。"
  },
  "ガラスの街とやま": {
    "name": "玻璃之城·富山（Glass Art City, Toyama）",
    "tagline": "探索富山的玻璃文化与标志性美术馆。",
    "desc": "富山市长期把玻璃作为城市政策与文化认同的重要部分。以2015年开馆的富山市玻璃美术馆为核心，玻璃造型研究所和工坊共同形成城市级生态。"
  },
  "Go FOR KOGEI": {
    "name": "GO FOR KOGEI（走进工艺）",
    "tagline": "旅行北陆，遇见工艺与当代艺术。",
    "desc": "2020年启动的项目，从新的角度重新理解拥有悠久制造传统的北陆工艺。展览分布于历史街区、寺院与神社，并通过论坛等讨论工艺在当代生活中的意义。"
  },
  "Zen AIR（禅×AIR）": {
    "name": "禅 AIR（ZEN AIR）",
    "tagline": "体验由禅文化塑造的艺术家驻留。",
    "desc": "在福井县永平寺地区开展的主题型艺术家驻留项目。艺术家通过禅修体验与居民交流进行研究和创作，并以作品与研究成果向公众分享。"
  },
  "FUJI TEXTILE WEEK": {
    "name": "富士纺织周（FUJI TEXTILE WEEK）",
    "tagline": "漫步富士吉田这座织物与设计之城。",
    "desc": "2021年在拥有千年以上纺织历史的山梨县富士吉田启动的纺织与艺术节，将当代艺术实践、传统产业与地方振兴连接起来。",
    "dateText": "下一届日期尚未公布（2025届已结束）。"
  },
  "北アルプス国際芸術祭": {
    "name": "北阿尔卑斯国际艺术祭",
    "tagline": "以艺术旅行北阿尔卑斯的城市与风景。",
    "desc": "在长野县大町举办的国际艺术节，旨在重新发现地区魅力并塑造具有独特个性的城市。曾于2017、2021和2024年举办。"
  },
  "美濃和紙あかりアート展": {
    "name": "美浓和纸灯光艺术展",
    "tagline": "看美浓古街被和纸灯光柔和照亮。",
    "desc": "以约300件美浓和纸灯光作品点亮卯建历史街区的长期展览。作品从日本全国征集，并通过展览与评审形成参与型竞赛。"
  },
  "アーツカウンシルしずおか": {
    "name": "静冈艺术委员会（Arts Council Shizuoka）",
    "tagline": "发现静冈各地文化活动的入口。",
    "desc": "面向静冈县全域的艺术文化中间支援机构，通过资助、咨询和传播支持艺术家与NPO，并在行政与民间之间发挥桥梁作用。"
  },
  "国際芸術祭「あいち」": {
    "name": "爱知三年展",
    "tagline": "在爱知各地探索来自世界的当代艺术。",
    "desc": "爱知县每三年举办的大型国际当代艺术节，以爱知艺术文化中心及县内城市空间为舞台，融合当代艺术、表演艺术与学习项目。"
  },
  "亀山トリエンナーレ": {
    "name": "龟山三年展",
    "tagline": "在龟山市内寻找散落各处的小而有力的表达。",
    "desc": "三重县龟山市推动的艺术型社区营造项目，把跨世代日常生活中“打动人的事物”广义理解为艺术，并自2014年起举办三年展。"
  },
  "BIWAKOビエンナーレ": {
    "name": "BIWAKO BIENNALE 琵琶湖双年展",
    "tagline": "在近江八幡的历史町屋中探索当代艺术。",
    "desc": "以滋贺县近江八幡的古民居、町屋和仓库为舞台的国际双年展。国内外艺术家根据建筑的记忆与特质创作装置，让整座城市像一座美术馆。"
  },
  "KYOTOGRAPHIE": {
    "name": "KYOTOGRAPHIE 京都国际摄影节",
    "tagline": "在春日京都，以摄影与建筑为线索漫步。",
    "desc": "每年春天在京都的寺院、町屋、近代建筑和公共空间举办的国际摄影节。2013年创办，并同步举办公开征集的卫星项目KG+。2026年第14届主题为“EDGE”。"
  },
  "北加賀屋クリエイティブ・ビレッジ": {
    "name": "北加贺屋创意村",
    "tagline": "探索大阪旧造船区里的创意空间。",
    "desc": "在大阪住之江区北加贺屋旧造船用地逐步形成的艺术与创意空间网络。较低租金与灵活空间使用吸引了大量创作者，并不主要依赖公共补贴。"
  },
  "神戸・新開地（アートひろば等）": {
    "name": "神户·新开地艺术项目",
    "tagline": "在神户老城区体验表演艺术与地方文化。",
    "desc": "以艺术推动神户新开地再生的长期实践。空置建筑与店铺被改造为艺术空间、排练室和小剧场，培养地方文化工作者并形成新的社区据点。"
  },
  "はならぁと": {
    "name": "HANARART 奈良町屋艺术节",
    "tagline": "在奈良的老街、空屋与村落中发现艺术。",
    "desc": "利用奈良县各地村落、町屋、空置建筑、寺院与神社举办的分散型艺术节。橿原、宇陀、吉野等区域轮流展开项目，带领访客进入平时较少到访的地方。"
  },
  "JAPAN WALLS（和歌山）": {
    "name": "JAPAN WALLS 白滨壁画项目",
    "tagline": "在和歌山街头遇见巨型壁画。",
    "desc": "邀请日本及海外街头艺术家在建筑外墙创作大型壁画的项目。强烈的视觉效果改变城市景观，也通过社交媒体与口碑吸引新的访客。"
  },
  "鳥取県立美術館の取り組み": {
    "name": "鸟取县立美术馆",
    "tagline": "从鸟取的新美术馆出发，探索更广阔的地区。",
    "desc": "以2025年在仓吉开馆的鸟取县立美术馆为中心的文化项目。美术馆在与居民充分对话中诞生，并结合鸟取与民艺运动的联系，成为学习、交流与创作的据点。"
  },
  "石見アーツプロジェクト": {
    "name": "石见艺术项目（IWAMI ARTS PROJECT）",
    "tagline": "走进扎根于石见文化的艺术实践。",
    "desc": "以岛根县西部石见地区为舞台的文化发展项目，将石见神乐、石见银山、石州和纸等地方资源与当代艺术实践连接，并支持年轻艺术家和文化工作者在当地生活与工作。"
  },
  "岡山芸術交流": {
    "name": "OKAYAMA ART SUMMIT 冈山艺术交流",
    "tagline": "在冈山市中心探索国际当代艺术。",
    "desc": "每三年在冈山历史城下町区域举办的国际当代艺术展。林原美术馆、旧内山下小学等历史建筑与公共空间中设置大型作品，场馆紧凑，适合步行巡游。"
  },
  "広島国際建築祭": {
    "name": "广岛国际建筑节",
    "tagline": "通过建筑与城市故事行走尾道和福山。",
    "desc": "2025年从广岛启动、专注建筑的国际节庆。以福山和尾道为中心，通过导览、展览和研讨会，从建筑角度重新思考城市记忆、重建与再生。"
  },
  "YCAM（山口情報芸術センター）": {
    "name": "YCAM 山口信息艺术中心",
    "tagline": "在山口遇见媒体艺术的实验。",
    "desc": "由山口市设立的公共媒体艺术中心。通过艺术、技术与研究一体化的研发，以及艺术家和工程师的紧密协作，制作展览、演出、工作坊与国际合作项目。"
  },
  "神山AIR": {
    "name": "神山艺术家驻留（KAIR）",
    "tagline": "在山间小镇神山探访正在创作的艺术家。",
    "desc": "自1990年代末在德岛县神山持续开展的艺术家驻留项目。它从驻留创作扩展到卫星办公室、移居与空屋再生，成为广受讨论的“神山模式”地区振兴的重要起点。"
  },
  "瀬戸内国際芸術祭": {
    "name": "濑户内国际艺术祭",
    "tagline": "把艺术当作目的地，旅行濑户内海诸岛。",
    "desc": "每三年在濑户内海岛屿与港口举办的大型国际艺术节。直岛、丰岛、女木岛、小豆岛等12座岛与2个港口分布着常设和临时作品。主展于2025年举办，下一届为2028年，2026年继续ART SETOUCHI项目。"
  },
  "道後オンセアート": {
    "name": "DOGO ART 道后温泉艺术",
    "tagline": "漫步道后温泉，一路与艺术相遇。",
    "desc": "以日本最古老温泉地之一松山道后温泉为舞台的艺术项目。旅馆、公共浴场与商店街化身为展览空间，呈现国内外艺术家的装置与参与式作品。"
  },
  "高知県芸術祭/KOCHI ART PROJECTS": {
    "name": "高知县艺术节 / KOCHI ART PROJECTS",
    "tagline": "通过多种表达方式探索高知的城市与社区。",
    "desc": "以高知县秋季艺术节为基础，同时开展支持地方艺术项目的KOCHI ART PROJECTS。戏剧、音乐、美术、传统文化与地域实践在县内各地展开。"
  },
  "Fukuoka Art Next": {
    "name": "福冈艺术Next（Fukuoka Art Next）",
    "tagline": "在福冈市内各处轻松遇见当代艺术。",
    "desc": "福冈市自2022年度启动的综合文化政策，通过行政、大学与民间合作扩大市民接触艺术的机会，并借助Artist Cafe Fukuoka、公共壁画和艺博会等项目支持艺术家成长与交流。"
  },
  "Creative Residency in Arita": {
    "name": "有田创意驻留计划（Creative Residency in Arita）",
    "tagline": "在日本陶瓷之乡有田，遇见国际艺术家的创作。",
    "desc": "在日本瓷器发源地有田开展的三个月驻留项目，国内外艺术家和设计师与当地窑元、工匠合作。项目自2016年启动，通过国际交流探索有田烧的新可能。",
    "dateText": "2026年6月至8月（艺术家驻留）。"
  },
  "南島原市アートビレッジ・シラキノ": {
    "name": "南岛原市Art Village Shirakino",
    "tagline": "在南岛原的一所旧学校里探访艺术家驻留。",
    "desc": "把长崎县南岛原市废弃学校改造而成的复合艺术设施，支持年轻艺术家驻留创作，并通过工作坊和居民交流推动地方文化发展。"
  },
  "くまもとアートポリス": {
    "name": "熊本Artpolis",
    "tagline": "沿着建筑线索，阅读熊本的城市与地区。",
    "desc": "熊本县自1988年开始的长期建筑与城市设计项目，由知名建筑师担任委员，将设计思维运用于公共设施、桥梁、道路、公园等全县基础设施。"
  },
  "BEPPU PROJECT": {
    "name": "别府项目（BEPPU PROJECT）",
    "tagline": "在温泉城市别府遇见艺术与社区实践。",
    "desc": "以别府为基地的艺术机构和项目平台。从利用温泉城市空置空间的国际艺术节起步，逐渐扩展到驻留、人才培养、空间运营以及连接饮食与文化的项目，并在公共与民间之间发挥中介作用。"
  },
  "新富芸術祭": {
    "name": "新富艺术祭",
    "tagline": "在宫崎新富的日常生活中感受艺术。",
    "desc": "在宫崎县新富町的农业景观、日常社区和历史祭祀空间中举办的小型艺术节。国内外艺术家与居民合作，重视低负担、可持续的运营方式。"
  },
  "霧島アートの森活用まちづくり": {
    "name": "雾岛户外美术馆地域营造",
    "tagline": "在雾岛的自然景观中探索户外艺术。",
    "desc": "以汤水町的雾岛户外美术馆为核心的地域营造项目。国内外艺术家的雕塑与装置散布在雾岛火山景观之中，把艺术欣赏、教育与自然体验结合起来。"
  },
  "やんばるアートフェスティバル": {
    "name": "山原艺术节（YAMBARU ART FESTIVAL）",
    "tagline": "通过艺术与工艺探索山原的森林与村落。",
    "desc": "在冲绳北部山原地区举办的艺术节，以世界自然遗产周边的亚热带森林、村落和海岸为舞台，融合当代艺术、传统表演和工艺，并以人与自然共生为核心主题。"
  },
  "恵比寿映像祭2026": {
    "name": "惠比寿映像祭2026",
    "tagline": "在惠比寿感受影像与摄影的当下。",
    "desc": "由东京都写真美术馆主办的国际影像艺术节，通过摄影、电影、声音、表演等形式持续追问“影像是什么”。2026年主题为“Polyphonic Voices Bathed in Sunlight”。",
    "dateNote": "2026年主会期已结束。"
  },
  "東京建築祭2026": {
    "name": "东京建筑祭2026",
    "tagline": "用一个周末走进东京最值得看的建筑。",
    "desc": "开放平时难以进入的东京建筑的城市建筑节。2024年首次举办时吸引6.5万人，2026年扩展至涩谷，参与建筑超过70处。",
    "dateNote": "2026年活动已结束。"
  },
  "すみだ五彩の芸術祭": {
    "name": "墨田五彩艺术祭",
    "tagline": "漫步墨田，通过艺术遇见地方记忆。",
    "desc": "由墨田区直接主办的多月艺术节，是东京23区中首次出现这种规模的区级艺术节。以“墨分五彩”为灵感，在老宅、寺院、商店街等日常空间重新观看地方历史、产业与记忆。"
  },
  "TOKYO ATLAS（国際文化芸術祭）": {
    "name": "TOKYO ATLAS 国际文化艺术节",
    "tagline": "在东京滨水地区探索来自世界的当代艺术。",
    "desc": "2026年启动的新东京文化艺术节中的国际艺术展，以台场、青海、天王洲等滨水区域为舞台，同时呈现国际知名艺术家与东京都支持的年轻艺术家。"
  },
  "前橋国際芸術祭2026「めぶく。」": {
    "name": "前桥国际艺术祭2026「萌芽。」",
    "tagline": "沿着建筑与艺术漫步前桥中心城区。",
    "desc": "以前桥市中心为舞台的首届国际艺术节。以2016年城市愿景“萌芽。”十周年为契机，将艺术与城市更新连接起来，并让观众步行穿梭于商店街、空置建筑和公共空间。"
  },
  "下呂 Art Discovery 2026": {
    "name": "下吕艺术探索 2026（Gero Art Discovery 2026）",
    "tagline": "带着艺术旅行下吕温泉、森林与旧校舍。",
    "desc": "在日本三大名泉之一的岐阜下吕举办的新艺术节。森林、历史街区和旧木造学校中分布场域特定作品，探讨人与自然的关系。北川富朗任总导演，共有来自14个国家和地区的59组参加。"
  },
  "富士山芸術祭2026": {
    "name": "富士山艺术节 2026（Fuji Art Festival 2026）",
    "tagline": "眺望富士山，探索山梨的文化与艺术。",
    "desc": "以世界遗产富士山为中心，连接山梨的历史建筑、寺院、美术馆、酒藏与名人相关场所的广域艺术节。每四年举办一次，通过传统工艺与当代艺术重新发现地方价值。"
  },
  "三島満願芸術祭2026": {
    "name": "三岛满愿艺术祭2026",
    "tagline": "在三岛街头遇见当代艺术。",
    "desc": "以静冈县三岛为基地的当代艺术节。2023年11月首次举办，2026年迎来第三届，持续发展把城市空间、社区与当代艺术连接起来的地方模式。"
  },
  "アラフドアートアゲイン": {
    "name": "ARAFUDO 艺术再启 2026",
    "tagline": "在土汤温泉的山间，进入艺术与思考的旅程。",
    "desc": "以磐梯朝日国立公园内福岛土汤温泉周边山地为舞台的艺术项目。国内外艺术家与温泉地区的自然环境展开对话，并据此发展创作与研究。"
  },
  "神戸六甲ミーツ・アート2026 beyond": {
    "name": "神户六甲遇见艺术 2026 beyond（KOBE Rokko Meets Art）",
    "tagline": "漫步六甲山，寻找散落其中的当代艺术。",
    "desc": "自2010年起每年秋天在神户六甲山举办的当代艺术节。作品散布于丰富的山地自然中，兼具从神户市中心出发的便利性与户外艺术体验。"
  },
  "武雄のあかりめぐり": {
    "name": "武雄灯光巡游",
    "tagline": "沿着光与艺术夜游武雄温泉。",
    "desc": "每年用灯光串联佐贺县武雄各处景点的夜间活动。御船山乐园的teamLab《A Forest Where Gods Live》、武雄温泉楼门、武雄神社、市立图书馆等8处成为夜游目的地。"
  },
  "飛生芸術祭": {
    "name": "飞生艺术节（TOBIU ART FESTIVAL）",
    "tagline": "走进北海道森林与旧校舍中的童话般节庆。",
    "desc": "由1986年围绕北海道白老旧飞生小学成立的TOBIU Art Community举办的年度艺术节。木造校舍与森林变成展览和交流空间，开幕活动TOBIU CAMP也同期举行。",
    "dateNote": "TOBIU CAMP于9月12日举行。"
  },
  "福島ビエンナーレ2026": {
    "name": "福岛双年展2026",
    "tagline": "在福岛双叶面对记忆、地方与当代艺术。",
    "desc": "自2004年起每两年举办的当代艺术项目。2026年适逢东日本大地震15周年，以“Cinematic ∞ Art”为主题，在双叶郡8个自治体展开，把福岛大学与地方社区通过艺术和文化记忆连接起来。"
  },
  "AWANO 夢咲くART FESTIVAL 2026": {
    "name": "AWANO 梦开ART FESTIVAL 2026",
    "tagline": "在鹿沼里山中享受花、艺术与美食。",
    "desc": "自2016年起在栃木县鹿沼市粟野地区举办的艺术节。以现、旧粟野中学为中心，结合展览、舞台、集市，以及荞麦花和彼岸花等季节性里山风景。"
  },
  "房総国際芸術祭 アート×ミックス2027": {
    "name": "房总国际艺术祭 Boso Triennale 2027",
    "tagline": "为了艺术、音乐与美食横穿房总半岛。",
    "desc": "跨越千叶县市原、木更津与大多喜的新国际艺术节。由北川富朗与小林武史领衔，把房总半岛想象为一座共享“艺术工厂”，鼓励乘火车、驾车或骑行探索。"
  },
  "横浜トリエンナーレ": {
    "name": "横滨三年展",
    "tagline": "在横滨遇见来自世界的当代艺术。",
    "desc": "日本代表性的国际当代艺术展之一，2001年创办，每三年在横滨中心滨水区域举办。第9届将由Cosmin Costinas与Inti Guerrero担任艺术总监。"
  },
  "逗子アートフェスティバル": {
    "name": "逗子艺术节",
    "tagline": "漫步海边逗子，发现社区型艺术。",
    "desc": "自2013年起每年在神奈川县逗子举办的艺术活动，以“通过艺术营造社区”为核心，由居民和艺术家共同在城市与海岸各处开展项目。"
  },
  "ART/X/TOYAMA（アートエクストヤマ）": {
    "name": "艺术×富山（ART/X/TOYAMA）",
    "tagline": "在富山鱼津探索日本与海外的当代艺术。",
    "desc": "每四年在富山县鱼津市新川文化厅举办的国际当代艺术展。自1993年以来持续邀请日本及法国、土耳其、德国、韩国、中国等国艺术家，2026年第10届汇集9国艺术家。"
  },
  "いしかわ舞台芸術祭2026": {
    "name": "石川表演艺术祭2026",
    "tagline": "在金泽的秋天穿梭于戏剧、舞蹈与音乐之间。",
    "desc": "在石川县举办、邀请日本及海外艺术家的表演艺术节，呈现戏剧、舞蹈、音乐与跨领域作品，为观众提供新的舞台体验和文化交流机会。",
    "dateText": "2026年9月至12月22日。"
  },
  "熊川宿若狭芸術祭": {
    "name": "熊川宿若狭艺术祭",
    "tagline": "在历史街宿熊川宿的老屋里遇见驻留艺术家。",
    "desc": "自2023年度起在福井县若狭町熊川宿举办，目标是把当地发展为国际文化交流据点。不同年龄、国籍、性别与能力背景的艺术家参与短期驻留、展览和音乐会。"
  },
  "浅間国際フォトフェスティバル（PHOTO MIYOTA）": {
    "name": "浅间国际摄影节（ASAMA INTERNATIONAL PHOTO FESTIVAL）",
    "tagline": "在浅间山麓用五感体验摄影。",
    "desc": "自2018年起在长野县御代田町文化复合设施MMoP周边举办的国际摄影节。国内外摄影师作品与浅间山自然相互呼应，2026年展区进一步扩展到町内各处。"
  },
  "原泉アートデイズ！": {
    "name": "原泉艺术日！（HARAIZUMI ART DAYS!）",
    "tagline": "在挂川乡野中探索驻留创作诞生的作品。",
    "desc": "静冈县挂川市北部原泉地区的艺术家驻留与展览项目。自2018年起支持国内外艺术家，并在旧茶厂、古民居等地区空间中发表作品。",
    "dateText": "2026年Art Days日期尚未公布。"
  },
  "大野芸術祭（OHNO ART BREW）": {
    "name": "大野艺术节（OHNO ART BREW）",
    "tagline": "带着艺术漫步常滑大野的海边小镇。",
    "desc": "自2024年起在爱知县常滑市大野町举办的艺术节。作品进入海岸、车站广场、咖啡馆等日常场所，以免费、贴近社区的形式逐渐扎根。"
  },
  "長浜国際芸術祭": {
    "name": "长滨国际艺术祭2026",
    "tagline": "在长滨商店街遇见日本与海外的艺术。",
    "desc": "以滋贺县长滨中心商店街为舞台的国际艺术项目。以城市历史与文化为背景，创造国内外艺术家与居民交流的机会，并以与波兰的国际交流为特色。2026年为第二届。"
  },
  "KYOTO EXPERIMENT 京都国際舞台芸術祭2026": {
    "name": "京都实验国际舞台艺术节 2026（KYOTO EXPERIMENT）",
    "tagline": "在秋日京都穿梭于实验性表演之间。",
    "desc": "自2010年起在京都各地举办的表演艺术节，介绍跨越戏剧、舞蹈、音乐与视觉艺术的国内外先锋作品，由Kansai Studies、Shows、SKF三条项目线构成。2026年10月3日至25日举办。"
  },
  "生きた建築ミュージアムフェスティバル大阪（イケフェス大阪）": {
    "name": "大阪开放建筑节（OPEN HOUSE OSAKA）",
    "tagline": "用两天时间走进大阪这座城市的精彩建筑。",
    "desc": "日本规模最大的建筑开放活动之一，在秋季周末免费开放大阪各类建筑。约200处“活着的建筑”从历史地标、现代建筑到街区咖啡馆向公众敞开。2026年为10月24日至25日。"
  },
  "紀南アートウィーク": {
    "name": "纪南艺术周（KINAN ART WEEK）",
    "tagline": "通过艺术探索纪南的海、山与日常文化。",
    "desc": "以和歌山县纪南地区、包括田边为基地持续开展的艺术项目。通过展览与讲座，从当代艺术视角观察柑橘种植、渔业、地方历史与信仰等当地生活方式。"
  },
  "森の芸術祭 晴れの国・岡山2027": {
    "name": "冈山森林艺术祭2027",
    "tagline": "旅行冈山北部，遇见森林与艺术。",
    "desc": "连接津山、高梁、新见、真庭、美作等冈山北部12个市町村的国际艺术节。2024届部分作品已成为常设作品，下一届计划于2027年秋季举办。",
    "dateText": "计划于2027年秋季举办。"
  },
  "瀬戸内産業芸術祭": {
    "name": "濑户内产业艺术祭",
    "tagline": "通过艺术重新观看濑户内的产业景观。",
    "desc": "以盐业、造船、钢铁等支撑日本发展的濑户内产业为对象的分散型美术馆构想。艺术家和创作者与企业工厂合作，从新的角度重新理解产业文化。"
  },
  "MAFIN（Miyajima Art Festival in the Narrative）": {
    "name": "MAFIN（宫岛叙事艺术节）",
    "tagline": "在宫岛寺院中观看历史与当代艺术相遇。",
    "desc": "每年在广岛宫岛弥山的大圣院举办的当代艺术展。项目通过艺术思考和平与岛屿文化意义，并让受宫岛自然启发的作品与历史寺院空间展开对话。"
  },
  "ART FAIR ASIA FUKUOKA（AFAF）": {
    "name": "亚洲福冈艺术博览会 2026（AFAF）",
    "tagline": "在福冈一次看见来自亚洲各地的当代艺术。",
    "desc": "在福冈国际中心举办、连接日本与亚洲艺术生态的艺博会。2026年第11届汇聚国内外主要画廊，并与Fukuoka Art Next联动，推动城市艺术生态发展。举办日期为10月2日至4日。",
    "dateNote": "10月1日为VIP View。"
  },
  "SAGA ARTIST FAIR 2027": {
    "name": "佐贺艺术家博览会 2027",
    "tagline": "在佐贺艺博会发现新锐艺术家。",
    "desc": "以佐贺市为基地、聚焦发现与介绍新锐艺术家的公开征集型艺博会。每届通过公开报名选出参展艺术家，2027年计划于2月中旬举办，报名自2026年8月中旬开始。",
    "dateText": "计划于2027年2月中旬举办。"
  },
  "種子島宇宙芸術祭": {
    "name": "种子岛宇宙艺术祭",
    "tagline": "在种子岛同时体验宇宙与艺术。",
    "desc": "以鹿儿岛县南种子、种子岛宇宙中心周边为舞台的独特艺术节。受天文学家Carl Sagan思想启发，以“宇宙艺术”为新领域，并举办夏季营地和冬季灯光节。"
  }
};


const ARTIST_EN = {
  "坂本龍一（2017年ゲストディレクター）": "Ryuichi Sakamoto (Guest Director, 2017)",
  "大友良英": "Yoshihide Otomo",
  "クリスチャン・マークレー": "Christian Marclay",
  "毛利悠子": "Yuko Mohri",
  "草間彌生": "Yayoi Kusama",
  "奈良美智": "Yoshitomo Nara",
  "ロン・ミュエク": "Ron Mueck",
  "エルヴィン・ヴルム": "Erwin Wurm",
  "鹿踊り・虎舞・神楽などの郷土芸能団体": "Local performing-arts groups including shishi-odori, toramai, and kagura",
  "アジア各地の芸能・ダンスグループ": "Performing-arts and dance groups from across Asia",
  "小林武史": "Takeshi Kobayashi",
  "川俣正": "Tadashi Kawamata",
  "伊勢谷友介": "Yusuke Iseya",
  "加藤泉": "Izumi Kato",
  "尾花賢一": "Kenichi Obana",
  "迎英里子": "Eriko Mukai",
  "永沢碧衣": "Aoi Nagasawa",
  "秋田公立美術大学の学生作家": "Student artists from Akita University of Art",
  "稲葉俊郎（芸術監督）": "Toshiro Inaba (Artistic Director)",
  "大和由佳": "Yuka Yamato",
  "山本桂輔": "Keisuke Yamamoto",
  "タル・ベーラ（映画監督）": "Béla Tarr (Film Director)",
  "古川日出男": "Hideo Furukawa",
  "大森克己": "Katsumi Omori",
  "藤浩志": "Hiroshi Fuji",
  "アヴニー・タンドゥン・ヴィエラ": "Avani Tandon Vieira",
  "イブラヒム・クルト": "İbrahim Kurt",
  "佐藤浩一": "Koichi Sato",
  "日野皓正": "Terumasa Hino",
  "山下洋輔（取手ジャズフェスティバル出演）": "Yosuke Yamashita (Toride Jazz Festival performer)",
  "田原唯之": "Tadayuki Tahara",
  "髙山瑞": "Midori Takayama",
  "船山哲郎": "Tetsuro Funayama",
  "木村剛士": "Tsuyoshi Kimura",
  "浅野暢晴": "Nobuharu Asano",
  "アニタ・ガラツツァ": "Anita Gratzer",
  "山形敦子": "Atsuko Yamagata",
  "中村政人（総合ディレクター）": "Masato Nakamura (General Director)",
  "加藤翼": "Tsubasa Kato",
  "高嶺格": "Tadasu Takamine",
  "鈴木昭男": "Akio Suzuki",
  "栗原良彰": "Yoshiaki Kurihara",
  "黒川岳": "Gaku Kurokawa",
  "森靖": "Yasushi Mori",
  "志村茉那美": "Manami Shimura",
  "照沼敦朗": "Atsuro Terunuma",
  "トモトシ": "Tomotoshi",
  "増山士郎": "Shiro Masuyama",
  "イリヤ＆エミリア・カバコフ": "Ilya & Emilia Kabakov",
  "塩田千春": "Chiharu Shiota",
  "田中泯": "Min Tanaka",
  "クリスチャン・ボルタンスキー": "Christian Boltanski",
  "アントニー・ゴームリー": "Antony Gormley",
  "デイル・チフーリ（美術館シンボル作品）": "Dale Chihuly (museum signature installation)",
  "小島有香子": "Yukako Kojima",
  "秋元雄史（アーティスティックディレクター）": "Yuji Akimoto (Artistic Director)",
  "国内外の工芸・現代アート作家約30組": "Around 30 craft and contemporary-art artists/groups from Japan and abroad",
  "カミラ・スヴェンソン（ブラジル）": "Camila Svenson (Brazil)",
  "公募で選出される国内外のアーティスト": "Artists from Japan and abroad selected through an open call",
  "南條史生（アート展ディレクター）": "Fumio Nanjo (Art Exhibition Director)",
  "大巻伸嗣": "Shinji Ohmaki",
  "落合陽一": "Yoichi Ochiai",
  "清川あさみ": "Asami Kiyokawa",
  "A-POC ABLE ISSEY MIYAKE": "A-POC ABLE ISSEY MIYAKE",
  "北川フラム（総合ディレクター）": "Fram Kitagawa (General Director)",
  "鈴木理策": "Risaku Suzuki",
  "淺井裕介": "Yusuke Asai",
  "皆川明（ビジュアルディレクター）": "Akira Minagawa (Visual Director)",
  "石井幹子（照明デザイナー・特別顧問）": "Motoko Ishii (Lighting Designer / Special Advisor)",
  "堀木エリ子（和紙アートディレクター）": "Eriko Horiki (Washi Art Director)",
  "宮城聰（SPAC芸術総監督）": "Satoshi Miyagi (SPAC General Artistic Director)",
  "鈴木忠志（初代芸術総監督）": "Tadashi Suzuki (Founding General Artistic Director)",
  "ヤノベケンジ": "Kenji Yanobe",
  "ウーゴ・ロンディノーネ": "Ugo Rondinone",
  "ムルヤナ": "Mulyana",
  "浅野言朗": "Kotaro Asano",
  "ティモ・ライト（フィンランド）": "Timo Wright (Finland)",
  "中田洋子（総合ディレクター）": "Yoko Nakata (General Director)",
  "ガブリエラ・モラウェッツ": "Gabriela Morawetz",
  "青木美歌": "Mika Aoki",
  "森山大道": "Daido Moriyama",
  "アントン・コービン": "Anton Corbijn",
  "イヴ・マルシャン＆ロマン・メフル": "Yves Marchand & Romain Meffre",
  "アーネスト・コール": "Ernest Cole",
  "コンタクト・ゴンゾ（塚原悠也・垣尾優）": "contact Gonzo (Yuya Tsukahara / Masaru Kakio)",
  "名村造船所跡拠点のアーティスト群": "Artists based at the former Namura Shipbuilding site",
  "林勇気（映像作家）": "Yuki Hayashi (Video Artist)",
  "to R mansion": "to R mansion",
  "神戸・新開地ゆかりの若手アーティスト": "Emerging artists connected to Kobe and Shinkaichi",
  "坂野真子": "Mako Sakano",
  "藤田千代": "Chiyo Fujita",
  "六車紀子": "Noriko Muguruma",
  "おとたまり（岩田茉莉江）": "Ototamari (Marie Iwata)",
  "Dragon76": "Dragon76",
  "YOSHI47": "YOSHI47",
  "Jack Soren": "Jack Soren",
  "石塚大介": "Daisuke Ishizuka",
  "森村泰昌": "Yasumasa Morimura",
  "やなぎみわ": "Miwa Yanagi",
  "伊藤若冲・アンディ・ウォーホル・ゲルハルト・リヒター（開館記念展）": "Jakuchu Ito / Andy Warhol / Gerhard Richter (opening exhibition)",
  "竹内大樹（発起人・舞台俳優）": "Daiki Takeuchi (Founder / Stage Actor)",
  "加藤泉（石見美術館ゆかりの国際的作家）": "Izumi Kato (international artist associated with Iwami Art Museum)",
  "リクリット・ティラヴァーニャ（2022年アーティスティックディレクター）": "Rirkrit Tiravanija (Artistic Director, 2022)",
  "片山真理": "Mari Katayama",
  "ダン・グラハム": "Dan Graham",
  "ピエール・ユイグ": "Pierre Huyghe",
  "安藤忠雄": "Tadao Ando",
  "伊東豊雄": "Toyo Ito",
  "妹島和世・西沢立衛（SANAA）": "Kazuyo Sejima & Ryue Nishizawa (SANAA)",
  "丹下健三": "Kenzo Tange",
  "坂本龍一": "Ryuichi Sakamoto",
  "高谷史郎": "Shiro Takatani",
  "池田亮司": "Ryoji Ikeda",
  "金子未弥": "Miya Kaneko",
  "Iede Reckman": "Iede Reckman",
  "Shirley Cho": "Shirley Cho",
  "横尾忠則": "Tadanori Yokoo",
  "内藤礼": "Rei Naito",
  "西沢立衛": "Ryue Nishizawa",
  "ジュリアン・オピー": "Julian Opie",
  "大竹伸朗": "Shinro Ohtake",
  "蜷川実花": "Mika Ninagawa",
  "エマニュエル・ムホー": "Emmanuelle Moureaux",
  "石川直樹": "Naoki Ishikawa",
  "石元泰博（高知県立美術館収蔵作家）": "Yasuhiro Ishimoto (artist represented in the museum collection)",
  "マルク・シャガール（同館収蔵作品）": "Marc Chagall (works in the museum collection)",
  "KYNE": "KYNE",
  "村上信理": "Shinri Murakami",
  "生島国宜": "Kuniyoshi Ikushima",
  "ミレナ・アンナ・バウマ": "Milena Anna Bauma",
  "マルー・ブリュー": "Malou Brieux",
  "ベネデッタ・ポムピリ": "Benedetta Pompili",
  "今泉奏": "Kanade Imaizumi",
  "公募で選出される国内外の版画作家": "Printmakers from Japan and abroad selected through an open call",
  "磯崎新（初代コミッショナー）": "Arata Isozaki (Founding Commissioner)",
  "伊東豊雄（3代目コミッショナー）": "Toyo Ito (3rd Commissioner)",
  "篠原一男": "Kazuo Shinohara",
  "マイケル・リン": "Michael Lin",
  "アデル・アブデスメッド": "Adel Abdessemed",
  "中山晃子": "Akiko Nakayama",
  "リム・ソクチャンリナ": "Lim Sokchanlina",
  "武田双雲": "Souun Takeda",
  "緒方智奈美": "Chinami Ogata",
  "安積一仁": "Kazuhito Azumi",
  "ダニ・カラバン": "Dani Karavan",
  "ジョナサン・ボロフスキー": "Jonathan Borofsky",
  "Chim↑Pom from Smappa!Group": "Chim↑Pom from Smappa!Group",
  "椿昇": "Noboru Tsubaki",
  "淀川テクニック": "Yodogawa Technique",
  "小森はるか": "Haruka Komori",
  "大木裕之": "Hiroyuki Oki",
  "侯怡亭（台湾）": "Hou I-Ting (Taiwan)",
  "旧岩崎邸庭園（ジョサイア・コンドル）": "Kyu-Iwasaki-tei Gardens (Josiah Conder)",
  "三菱一号館": "Mitsubishi Ichigokan Museum",
  "GINZA SIX": "GINZA SIX",
  "慶應義塾大学図書館旧館": "Keio University Old Library",
  "山口藍": "Ai Yamaguchi",
  "蔵真墨": "Masumi Kura",
  "岡田裕子": "Hiroko Okada",
  "山崎広太": "Kota Yamazaki",
  "イケムラレイコ": "Leiko Ikemura",
  "潘逸舟": "Han Ishu",
  "渋谷慶一郎": "Keiichiro Shibuya",
  "アレクサ・クミコ・ハタナカ": "Alexa Kumiko Hatanaka",
  "マルタン・マルジェラ": "Martin Margiela",
  "遠藤利克": "Toshikatsu Endo",
  "バルトロメイ・トグオ": "Barthélémy Toguo",
  "スタシス・エイドリゲヴィチウス": "Stasys Eidrigevičius",
  "マッシモ・バルトリーニ": "Massimo Bartolini",
  "EAT & ART TARO": "EAT & ART TARO",
  "橘葉月": "Hazuki Tachibana",
  "牛島光太郎": "Koutarou Ushijima",
  "ユミソン（総合ディレクター）": "Yumi Song (General Director)",
  "SIDE CORE": "SIDE CORE",
  "飯山由貴": "Yuki Iiyama",
  "KIGI（植原亮輔・渡邉良重）": "KIGI (Ryosuke Uehara / Yoshie Watanabe)",
  "宮永愛子": "Aiko Miyanaga",
  "髙橋匡太": "Kyota Takahashi",
  "チームラボ": "teamLab",
  "小松美羽": "Miwa Komatsu",
  "小林武史（総合プロデューサー）": "Takeshi Kobayashi (General Producer)",
  "豊福亮（アートディレクター）": "Ryo Toyofuku (Art Director)",
  "サンドラ・ムジンガ": "Sandra Mujinga",
  "ピッパ・ガーナー": "Pippa Garner",
  "ニック・ケイヴ": "Nick Cave",
  "アイ・ウェイウェイ": "Ai Weiwei",
  "ヨアル・ナンゴ": "Joar Nango",
  "フランシス真悟": "Shingo Francis",
  "Ahmet ÖZEL（トルコ）": "Ahmet Özel (Turkey)",
  "Anka KRASNA（スロベニア）": "Anka Krasna (Slovenia)",
  "加賀谷武": "Takeshi Kagaya",
  "佐久間宣行（アンバサダー）": "Nobuyuki Sakuma (Ambassador)",
  "ダウ90000": "Daw 90000",
  "河口龍夫（筑波大学名誉教授）": "Tatsuo Kawaguchi (Professor Emeritus, University of Tsukuba)",
  "テオ・ムザール（フランス）": "Théo Muzar (France)",
  "ヘンリエッテ・サブロー・エベセン（デンマーク）": "Henriette Sabroe Ebbesen (Denmark)",
  "スティーブン・ギル": "Stephen Gill",
  "小原一真": "Kazuma Obara",
  "野々上聡人（岡本太郎現代芸術賞大賞受賞）": "Akito Nonoue (Taro Okamoto Award for Contemporary Art Grand Prize winner)",
  "松島誠": "Makoto Matsushima",
  "エリオット・ヘイグ＋澤田奈々（デュオ）": "Elliot Haigh + Nana Sawada (duo)",
  "カシア・クヤブスカ・マーフィー（ポーランド）": "Kasia Kujawska-Murphy (Poland)",
  "大崎緑": "Midori Osaki",
  "ティアゴ・ロドリゲス（アビニョン演劇祭ディレクター）": "Tiago Rodrigues (Director, Festival d'Avignon)",
  "アリス・リポル": "Alice Ripoll",
  "梅田哲也": "Tetsuya Umeda",
  "ポール・アンドリュー（フランス）": "Paul Andreu (France)",
  "アピチャッポン・ウィーラセタクン": "Apichatpong Weerasethakul",
  "一柳慧": "Toshi Ichiyanagi",
  "ヘアート・ムル（オランダ）": "Geert Mul (Netherlands)",
  "妹島和世": "Kazuyo Sejima",
  "坂本龍一＋高谷史郎": "Ryuichi Sakamoto + Shiro Takatani",
  "蜷川実花 with EiM": "Mika Ninagawa with EiM",
  "山本基（塩のインスタレーション）": "Motoi Yamamoto (salt installations)",
  "康夏奈": "Kana Ko",
  "久保寛子": "Hiroko Kubo",
  "田中千智": "Chisato Tanaka",
  "牧野永美子": "Emiko Makino",
  "野村仁衣那": "Niina Nomura",
  "森正彦（自転車廃材の立体造形）": "Masahiko Mori (sculpture made from discarded bicycle parts)",
  "towa-towa": "towa-towa",
  "千田泰広": "Yasuhiro Chida",
  "開発好明": "Yoshiaki Kaihatsu",
  "篠田守男": "Morio Shinoda"
};

function localizeCases(cases) {
  cases.forEach(c => {
    c.nameJa = c.name;
    c.prefJa = c.pref;
    c.taglineJa = c.tagline;
    c.descJa = c.desc;
    c.dateTextJa = c.dateText;
    c.dateNoteJa = c.dateNote;
    c.artistsJa = Array.isArray(c.artists) ? [...c.artists] : c.artists;
    c.nameEn = (((CASE_TRANSLATIONS.en || {})[c.nameJa] || {}).name) || c.nameJa;

    let tr = {};
    if (LANG === "en") {
      c.pref = PREFECTURE_EN[c.prefJa] || c.pref;
      tr = {
        ...((CASE_TRANSLATIONS.en || {})[c.nameJa] || {}),
        ...(CASE_CONTENT_EN[c.nameJa] || {})
      };
    } else if (LANG === "ko") {
      c.pref = PREFECTURE_KO[c.prefJa] || c.pref;
      tr = CASE_CONTENT_KO[c.nameJa] || {};
    } else if (LANG === "zh-cn") {
      c.pref = PREFECTURE_ZH_CN[c.prefJa] || c.pref;
      tr = CASE_CONTENT_ZH_CN[c.nameJa] || {};
    } else {
      return;
    }

    if (tr.name) c.name = tr.name;
    if (tr.tagline) c.tagline = tr.tagline;
    if (tr.desc) c.desc = tr.desc;
    if (tr.dateText) c.dateText = tr.dateText;
    if (tr.dateNote) c.dateNote = tr.dateNote;
    if (tr.artists) c.artists = tr.artists;
    else if (Array.isArray(c.artistsJa)) c.artists = c.artistsJa.map(a => ARTIST_EN[a] || a);
  });
}

function regionLabel(r) { return (T.regions && T.regions[r]) || r; }
function travelTagLabel(t) { return (T.travelTags && T.travelTags[t]) || t; }
