#!/usr/bin/env python3
"""
Step 2: fill template.html per language and emit the deployable files.
"""
import io, os, re, sys, json

BASE = "https://artslogix.github.io/japan-art-map/"
OGP = BASE + "images/ogp-japan-art-map-v2.png"
OUTDIR = "dist"

tpl = io.open("template.html", encoding="utf-8").read()

LANGS = ["ja", "en", "ko", "zh-cn", "zh-tw"]
HTML_LANG = {"ja": "ja", "en": "en", "ko": "ko", "zh-cn": "zh-CN", "zh-tw": "zh-TW"}
URLS = {"ja": BASE, "en": BASE + "en/", "ko": BASE + "ko/", "zh-cn": BASE + "zh-cn/", "zh-tw": BASE + "zh-tw/"}
SUBDIR = {"ja": "", "en": "en", "ko": "ko", "zh-cn": "zh-cn", "zh-tw": "zh-tw"}

# Label shown in the switcher: (desktop, mobile-short)
SWITCH_LABEL = {
    "ja": ("JP", "JP"),
    "en": ("EN", "EN"),
    "ko": ("한국어", "KO"),
    "zh-cn": ("简中", "简"),
    "zh-tw": ("繁中", "繁"),
}

SEO = {
    "ja": {
        "title": "JAPAN ART MAP｜2026年 全国の芸術祭・アートイベントを地図から探す",
        "desc": "2026年に全国で開催される芸術祭・アートイベントを、開催時期・地域・旅のテーマから探せるマップ。開催中の芸術祭や、9月・10月に行けるアート旅を一覧で紹介します。",
        "alt": "日本の芸術祭を旅する",
    },
    "en": {
        "title": "JAPAN ART MAP | Discover Art Festivals Across Japan in 2026",
        "desc": "Discover art festivals and cultural events across Japan in 2026 by date, region, and travel theme. Find what is happening now and plan your next art trip.",
        "alt": "Travel Japan through art festivals",
    },
    "ko": {
        "title": "JAPAN ART MAP | 2026 일본 전국 예술제·아트 이벤트 지도",
        "desc": "2026년 일본 전국에서 열리는 예술제와 아트 이벤트를 개최 시기, 지역, 여행 테마로 찾아보는 지도입니다. 지금 열리는 행사부터 다음 아트 여행까지 한눈에 확인하세요.",
        "alt": "일본의 예술제를 여행하다",
    },
    "zh-cn": {
        "title": "JAPAN ART MAP｜2026日本全国艺术节与艺术活动地图",
        "desc": "通过举办时间、地区和旅行主题，探索2026年日本全国的艺术节与艺术活动。查看正在举办的活动，发现下一次艺术旅行。",
        "alt": "通过艺术节旅行日本",
    },
    "zh-tw": {
        "title": "JAPAN ART MAP｜2026 日本全國藝術祭與藝術活動地圖",
        "desc": "依舉辦時間、地區與旅行主題，探索2026年日本全國的藝術祭與藝術活動。查看正在舉辦的活動，發現下一趟日本藝術旅行。",
        "alt": "透過藝術祭旅行日本",
    },
}

UI = {
    "ja": {
        "HDR_TITLE": "日本の芸術祭を旅する",
        "HDR_SUB": "今年、どの芸術祭に行く？",
        "A11Y_PICKS": "おすすめの芸術祭",
        "PICKS_TITLE": "今年行ける、おすすめの芸術祭",
        "ONGOING": "開催中",
        "MORE_FILTERS": "詳細条件で絞り込み",
        "F_WHEN": "いつ行く？", "F_WHEN_EN": "When to go",
        "F_MONTH": "何月に行く？", "F_MONTH_EN": "Month",
        "F_THEME": "旅のテーマ", "F_THEME_EN": "Travel Theme",
        "F_VISITOR": "海外旅行者向け", "F_VISITOR_EN": "Visitor Guide",
        "V_TOKYO": "東京から行きやすい", "V_KANSAI": "大阪・京都から行きやすい",
        "V_WEEKEND": "週末旅向き", "V_ONSEN": "温泉と組み合わせ",
        "V_NOTE": "アクセスの目安です。実際の交通手段・所要時間は最新情報をご確認ください。",
        "F_STYLE": "東京からの旅の日数目安", "F_STYLE_EN": "Trip length from Tokyo",
        "UPCOMING": "2026年これから", "YEARROUND": "通年", "FUTURE": "2027〜",
        "TT_ISLAND": "島・海", "TT_ONSEN": "温泉", "TT_ARCH": "建築",
        "TT_PHOTO": "写真・映像", "TT_CRAFT": "工芸", "TT_NATURE": "自然・里山",
        "TT_CITY": "街歩き", "TT_FOOD": "食",
        "A_DAY": "日帰り", "A_NIGHT": "1泊", "A_LONG": "2泊〜",
        "SEARCH_PH": "検索  ·  Search cases",
        "DP_TITLE": "旅先を探す", "DP_TITLE_EN": "Discover",
        "INTRO_STRONG": "2026年の全国の芸術祭・アートイベントを地図から探す。",
        "INTRO_BODY": "開催中の芸術祭やこれから始まるアートイベントに加え、旅先で見たい美術館の展覧会から、次のアート旅を見つけるためのマップです。",
        "SHOWING": "表示中",
        "LEGEND_HEAD": "WHEN ／ 開催時期",
        "CLOSE": "閉じる",
        "INFO_TITLE": "このサイトについて",
        "INFO_LEAD": "JAPAN ART MAP は、全国の芸術祭やアートプロジェクト、旅先で見たい展覧会を、次の旅のきっかけとして見つけるための個人運営のマップです。",
        "INFO_OPERATOR": "運営・編集",
        "INFO_CONTACT": "掲載内容の修正、画像利用に関するご連絡、その他のお問い合わせは、下記のリンクからご連絡ください。",
        "INFO_NOTE_LABEL": "掲載情報について",
        "INFO_AI_NOTE": "掲載情報はAIによる調査を活用して作成しています。正確性には配慮していますが、最新情報は必ず各公式サイトでご確認ください。",
    },
    "en": {
        "HDR_TITLE": "Travel Japan through art festivals",
        "HDR_SUB": "Which art festival will you visit this year?",
        "A11Y_PICKS": "Recommended art festivals",
        "PICKS_TITLE": "Recommended art festivals this year",
        "ONGOING": "Happening now",
        "MORE_FILTERS": "More filters",
        "F_WHEN": "When to go", "F_WHEN_EN": "",
        "F_MONTH": "By month", "F_MONTH_EN": "",
        "F_THEME": "Travel theme", "F_THEME_EN": "",
        "F_VISITOR": "For international visitors", "F_VISITOR_EN": "",
        "V_TOKYO": "Easy from Tokyo", "V_KANSAI": "Easy from Osaka / Kyoto",
        "V_WEEKEND": "Weekend trip", "V_ONSEN": "Pair with onsen",
        "V_NOTE": "Travel-access hints are approximate. Please check current transport details before you go.",
        "F_STYLE": "Trip length from Tokyo", "F_STYLE_EN": "",
        "UPCOMING": "Later in 2026", "YEARROUND": "Year-round", "FUTURE": "2027+",
        "TT_ISLAND": "Islands &amp; sea", "TT_ONSEN": "Onsen", "TT_ARCH": "Architecture",
        "TT_PHOTO": "Photo &amp; film", "TT_CRAFT": "Craft", "TT_NATURE": "Nature &amp; rural",
        "TT_CITY": "City walks", "TT_FOOD": "Food",
        "A_DAY": "Day trip", "A_NIGHT": "1 night", "A_LONG": "2+ nights",
        "SEARCH_PH": "Search festivals",
        "DP_TITLE": "Discover", "DP_TITLE_EN": "",
        "INTRO_STRONG": "Discover art festivals and cultural events across Japan in 2026.",
        "INTRO_BODY": "Explore festivals and selected museum exhibitions, and find your next art trip by region, timing, and travel theme.",
        "SHOWING": "Showing",
        "LEGEND_HEAD": "WHEN",
        "CLOSE": "Close",
        "INFO_TITLE": "About this site",
        "INFO_LEAD": "JAPAN ART MAP is an independently operated map for discovering art festivals, art projects, and museum exhibitions across Japan as inspiration for travel.",
        "INFO_OPERATOR": "Operated &amp; edited by",
        "INFO_CONTACT": "For corrections, image usage enquiries or anything else, please get in touch through the links below.",
        "INFO_NOTE_LABEL": "About the listings",
        "INFO_AI_NOTE": "Listings are created with the help of AI-assisted research. We aim for accuracy, but please confirm the latest information on each official website.",
    },
    "ko": {
        "HDR_TITLE": "일본의 예술제를 여행하다",
        "HDR_SUB": "올해 어떤 예술제에 갈까요?",
        "A11Y_PICKS": "추천 예술제",
        "PICKS_TITLE": "올해 갈 수 있는 추천 예술제",
        "ONGOING": "개최 중",
        "MORE_FILTERS": "상세 조건으로 찾기",
        "F_WHEN": "언제 갈까요?", "F_WHEN_EN": "",
        "F_MONTH": "월별로 찾기", "F_MONTH_EN": "",
        "F_THEME": "여행 테마", "F_THEME_EN": "",
        "F_VISITOR": "해외 여행자 가이드", "F_VISITOR_EN": "",
        "V_TOKYO": "도쿄에서 가기 쉬움", "V_KANSAI": "오사카·교토에서 가기 쉬움",
        "V_WEEKEND": "주말 여행", "V_ONSEN": "온천과 함께",
        "V_NOTE": "교통 접근성은 대략적인 참고입니다. 실제 이동 방법과 소요 시간은 최신 정보를 확인해 주세요.",
        "F_STYLE": "도쿄 출발 여행 일수(예상)", "F_STYLE_EN": "",
        "UPCOMING": "2026년 예정", "YEARROUND": "연중", "FUTURE": "2027년 이후",
        "TT_ISLAND": "섬·바다", "TT_ONSEN": "온천", "TT_ARCH": "건축",
        "TT_PHOTO": "사진·영상", "TT_CRAFT": "공예", "TT_NATURE": "자연·마을",
        "TT_CITY": "동네 산책", "TT_FOOD": "음식",
        "A_DAY": "당일치기", "A_NIGHT": "1박", "A_LONG": "2박 이상",
        "SEARCH_PH": "검색",
        "DP_TITLE": "여행지 찾기", "DP_TITLE_EN": "",
        "INTRO_STRONG": "2026년 일본 전국의 예술제·아트 이벤트를 지도에서 찾아보세요.",
        "INTRO_BODY": "현재 개최 중인 예술제와 엄선한 미술관 전시를 지역, 시기, 여행 테마로 탐색하며 다음 아트 여행을 발견할 수 있습니다.",
        "SHOWING": "표시 중",
        "LEGEND_HEAD": "WHEN",
        "CLOSE": "닫기",
        "INFO_TITLE": "이 사이트에 대하여",
        "INFO_LEAD": "JAPAN ART MAP은 일본 각지의 예술제, 아트 프로젝트, 여행지에서 보고 싶은 미술관 전시를 발견하기 위한 개인 운영 지도입니다.",
        "INFO_OPERATOR": "운영·편집",
        "INFO_CONTACT": "게재 내용의 수정, 이미지 이용에 관한 문의 등은 아래 링크를 통해 연락해 주세요.",
        "INFO_NOTE_LABEL": "게재 정보에 대하여",
        "INFO_AI_NOTE": "게재 정보는 AI를 활용한 조사를 바탕으로 작성했습니다. 정확성을 위해 노력하지만 최신 정보는 반드시 각 공식 사이트에서 확인해 주세요.",
    },
    "zh-cn": {
        "HDR_TITLE": "通过艺术节旅行日本",
        "HDR_SUB": "今年，你想去哪个艺术节？",
        "A11Y_PICKS": "推荐艺术节",
        "PICKS_TITLE": "今年值得去的艺术节",
        "ONGOING": "正在举办",
        "MORE_FILTERS": "更多筛选条件",
        "F_WHEN": "什么时候去？", "F_WHEN_EN": "",
        "F_MONTH": "按月份", "F_MONTH_EN": "",
        "F_THEME": "旅行主题", "F_THEME_EN": "",
        "F_VISITOR": "海外旅行者参考", "F_VISITOR_EN": "",
        "V_TOKYO": "从东京出发方便", "V_KANSAI": "从大阪·京都出发方便",
        "V_WEEKEND": "适合周末旅行", "V_ONSEN": "可搭配温泉",
        "V_NOTE": "交通便利度仅供参考，实际交通方式和所需时间请确认最新信息。",
        "F_STYLE": "从东京出发的旅行天数（参考）", "F_STYLE_EN": "",
        "UPCOMING": "2026年即将举办", "YEARROUND": "全年", "FUTURE": "2027年以后",
        "TT_ISLAND": "岛屿·海", "TT_ONSEN": "温泉", "TT_ARCH": "建筑",
        "TT_PHOTO": "摄影·影像", "TT_CRAFT": "工艺", "TT_NATURE": "自然·乡野",
        "TT_CITY": "城市漫步", "TT_FOOD": "美食",
        "A_DAY": "一日游", "A_NIGHT": "1晚", "A_LONG": "2晚以上",
        "SEARCH_PH": "搜索",
        "DP_TITLE": "寻找旅行目的地", "DP_TITLE_EN": "",
        "INTRO_STRONG": "在地图上探索2026年日本全国的艺术节与艺术活动。",
        "INTRO_BODY": "从正在举办的艺术节到精选的美术馆展览，可按地区、时间和旅行主题寻找下一次艺术之旅。",
        "SHOWING": "显示中",
        "LEGEND_HEAD": "WHEN",
        "CLOSE": "关闭",
        "INFO_TITLE": "关于本网站",
        "INFO_LEAD": "JAPAN ART MAP是一个个人运营的地图，希望把日本各地的艺术节、艺术项目和旅行途中值得看的美术馆展览变成旅行的灵感入口。",
        "INFO_OPERATOR": "运营·编辑",
        "INFO_CONTACT": "关于内容修正、图片使用以及其他咨询，请通过以下链接与我们联系。",
        "INFO_NOTE_LABEL": "关于刊载信息",
        "INFO_AI_NOTE": "本站信息在AI辅助调研的基础上整理。我们尽力保证准确性，但最新信息请务必以各活动官方网站为准。",
    },

    "zh-tw": {
        "HDR_TITLE": "透過藝術祭旅行日本",
        "HDR_SUB": "今年，你想去哪個藝術祭？",
        "A11Y_PICKS": "推薦藝術祭",
        "PICKS_TITLE": "今年值得去的藝術祭",
        "ONGOING": "正在舉辦",
        "MORE_FILTERS": "更多篩選條件",
        "F_WHEN": "什麼時候去？", "F_WHEN_EN": "",
        "F_MONTH": "按月份", "F_MONTH_EN": "",
        "F_THEME": "旅行主題", "F_THEME_EN": "",
        "F_VISITOR": "海外旅行者參考", "F_VISITOR_EN": "",
        "V_TOKYO": "東京出發方便", "V_KANSAI": "大阪・京都出發方便",
        "V_WEEKEND": "適合週末旅行", "V_ONSEN": "可搭配溫泉",
        "V_NOTE": "交通便利度僅供參考，實際交通方式與所需時間請確認最新資訊。",
        "F_STYLE": "從東京出發的旅行天數（參考）", "F_STYLE_EN": "",
        "UPCOMING": "2026年即將舉辦", "YEARROUND": "全年", "FUTURE": "2027年以後",
        "TT_ISLAND": "島嶼・海", "TT_ONSEN": "溫泉", "TT_ARCH": "建築",
        "TT_PHOTO": "攝影・影像", "TT_CRAFT": "工藝", "TT_NATURE": "自然・鄉野",
        "TT_CITY": "城市散步", "TT_FOOD": "美食",
        "A_DAY": "一日遊", "A_NIGHT": "1晚", "A_LONG": "2晚以上",
        "SEARCH_PH": "搜尋",
        "DP_TITLE": "尋找旅行目的地", "DP_TITLE_EN": "",
        "INTRO_STRONG": "在地圖上探索2026年日本全國的藝術祭與藝術活動。",
        "INTRO_BODY": "從正在舉辦的藝術祭到精選的美術館展覽，可以依地區、時間與旅行主題尋找下一趟藝術旅行。",
        "SHOWING": "顯示中",
        "LEGEND_HEAD": "WHEN",
        "CLOSE": "關閉",
        "INFO_TITLE": "關於本網站",
        "INFO_LEAD": "JAPAN ART MAP 是一個由個人持續整理與經營的地圖，希望讓日本各地的藝術祭、藝術計畫與旅途中值得看的美術館展覽成為旅行靈感的入口。",
        "INFO_OPERATOR": "營運・編輯",
        "INFO_CONTACT": "若有內容修正、圖片使用或其他問題，請透過下方連結與我們聯絡。",
        "INFO_NOTE_LABEL": "關於刊載資訊",
        "INFO_AI_NOTE": "本站資訊使用 AI 輔助調查整理。我們會盡力維持正確性，但最新資訊仍請務必以各活動官方網站為準。",
    },

}

HREFLANG = "\n".join(
    f'  <link rel="alternate" hreflang="{HTML_LANG[l]}" href="{URLS[l]}" />' for l in LANGS
) + f'\n  <link rel="alternate" hreflang="x-default" href="{BASE}" />'


def head_seo(lang):
    s = SEO[lang]
    ld = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "JAPAN ART MAP",
        "alternateName": s["alt"],
        "url": URLS[lang],
        "description": s["desc"],
        "inLanguage": HTML_LANG[lang],
        "publisher": {
            "@type": "Organization",
            "name": "ArtsLogix",
            "url": "https://linktr.ee/artslogix",
        },
    }
    return f"""  <title>{s['title']}</title>

  <meta name="description" content="{s['desc']}" />
  <meta name="author" content="ArtsLogix" />
  <meta name="theme-color" content="#1b1713" />
  <meta name="robots" content="index,follow,max-image-preview:large" />
  <link rel="canonical" href="{URLS[lang]}" />

{HREFLANG}

  <meta property="og:site_name" content="JAPAN ART MAP" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="{ {'ja':'ja_JP','en':'en_US','ko':'ko_KR','zh-cn':'zh_CN','zh-tw':'zh_TW'}[lang] }" />
  <meta property="og:url" content="{URLS[lang]}" />
  <meta property="og:title" content="{s['title']}" />
  <meta property="og:description" content="{s['desc']}" />
  <meta property="og:image" content="{OGP}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="JAPAN ART MAP｜{s['alt']}" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{s['title']}" />
  <meta name="twitter:description" content="{s['desc']}" />
  <meta name="twitter:image" content="{OGP}" />

  <script type="application/ld+json">
{json.dumps(ld, ensure_ascii=False, indent=2)}
  </script>
"""


def lang_links(current):
    out = []
    for l in LANGS:
        full, short = SWITCH_LABEL[l]
        cur = ' aria-current="true"' if l == current else ""
        out.append(
            f'      <a href="{URLS[l]}" hreflang="{HTML_LANG[l]}" lang="{HTML_LANG[l]}"{cur}>'
            f'<span class="lang-full">{full}</span><span class="lang-short">{short}</span></a>'
        )
    return "\n".join(out)


os.makedirs(OUTDIR, exist_ok=True)
written = []

for lang in LANGS:
    out = tpl
    out = out.replace("__HEAD_SEO__", head_seo(lang))
    out = out.replace("__HTML_LANG__", HTML_LANG[lang])
    out = out.replace("__LANG__", lang)
    out = out.replace("__LANG_LINKS__", lang_links(lang))
    for k, v in UI[lang].items():
        out = out.replace(f"__{k}__", v)

    leftover = sorted(set(re.findall(r"__[A-Z0-9_]+__", out)))
    if leftover:
        print(f"ERROR [{lang}] unfilled placeholders: {leftover}")
        sys.exit(1)

    sub = SUBDIR[lang]
    d = os.path.join(OUTDIR, sub) if sub else OUTDIR
    os.makedirs(d, exist_ok=True)
    path = os.path.join(d, "index.html")
    io.open(path, "w", encoding="utf-8").write(out)
    written.append(path)
    print(f"wrote {path}  ({len(out):,} bytes)")

# ── sitemap.xml with xhtml:link alternates ──
entries = []
for l in LANGS:
    alts = "\n".join(
        f'      <xhtml:link rel="alternate" hreflang="{HTML_LANG[a]}" href="{URLS[a]}" />'
        for a in LANGS
    )
    entries.append(f"""  <url>
    <loc>{URLS[l]}</loc>
{alts}
      <xhtml:link rel="alternate" hreflang="x-default" href="{BASE}" />
    <changefreq>weekly</changefreq>
    <priority>{'1.0' if l == 'ja' else '0.8'}</priority>
  </url>""")

sitemap = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
{chr(10).join(entries)}
</urlset>
"""
io.open(os.path.join(OUTDIR, "sitemap.xml"), "w", encoding="utf-8").write(sitemap)
written.append(os.path.join(OUTDIR, "sitemap.xml"))
print("wrote dist/sitemap.xml")
