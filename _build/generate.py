#!/usr/bin/env python3
"""
Step 2: fill template.html per language and emit the deployable files.
"""
import io, os, re, sys, json

BASE = "https://artslogix.github.io/japan-art-map/"
OGP = BASE + "images/ogp-japan-art-map-v2.png"
OUTDIR = "dist"

tpl = io.open("template.html", encoding="utf-8").read()

LANGS = ["ja", "en", "ko", "zh-cn"]
HTML_LANG = {"ja": "ja", "en": "en", "ko": "ko", "zh-cn": "zh-CN"}
URLS = {"ja": BASE, "en": BASE + "en/", "ko": BASE + "ko/", "zh-cn": BASE + "zh-cn/"}
SUBDIR = {"ja": "", "en": "en", "ko": "ko", "zh-cn": "zh-cn"}

# Label shown in the switcher: (desktop, mobile-short)
SWITCH_LABEL = {
    "ja": ("JP", "JP"),
    "en": ("EN", "EN"),
    "ko": ("한국어", "KO"),
    "zh-cn": ("中文", "中文"),
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
        "F_STYLE": "東京からの旅の日数目安", "F_STYLE_EN": "Trip length from Tokyo",
        "UPCOMING": "2026年これから", "YEARROUND": "通年", "FUTURE": "2027〜",
        "TT_ISLAND": "島・海", "TT_ONSEN": "温泉", "TT_ARCH": "建築",
        "TT_PHOTO": "写真・映像", "TT_CRAFT": "工芸", "TT_NATURE": "自然・里山",
        "TT_CITY": "街歩き", "TT_FOOD": "食",
        "A_DAY": "日帰り", "A_NIGHT": "1泊", "A_LONG": "2泊〜",
        "SEARCH_PH": "検索  ·  Search cases",
        "DP_TITLE": "旅先を探す", "DP_TITLE_EN": "Discover",
        "INTRO_STRONG": "2026年の全国の芸術祭・アートイベントを地図から探す。",
        "INTRO_BODY": "開催中の芸術祭、これから始まるアートイベント、地域や旅のテーマから、次のアート旅を見つけるためのマップです。",
        "SHOWING": "表示中",
        "LEGEND_HEAD": "WHEN ／ 開催時期",
        "CLOSE": "閉じる",
        "INFO_TITLE": "このサイトについて",
        "INFO_LEAD": "JAPAN ART MAP は、全国の芸術祭やアートプロジェクトを、次の旅のきっかけとして見つけるための個人運営のマップです。",
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
        "F_STYLE": "Trip length from Tokyo", "F_STYLE_EN": "",
        "UPCOMING": "Later in 2026", "YEARROUND": "Year-round", "FUTURE": "2027+",
        "TT_ISLAND": "Islands &amp; sea", "TT_ONSEN": "Onsen", "TT_ARCH": "Architecture",
        "TT_PHOTO": "Photo &amp; film", "TT_CRAFT": "Craft", "TT_NATURE": "Nature &amp; rural",
        "TT_CITY": "City walks", "TT_FOOD": "Food",
        "A_DAY": "Day trip", "A_NIGHT": "1 night", "A_LONG": "2+ nights",
        "SEARCH_PH": "Search festivals",
        "DP_TITLE": "Discover", "DP_TITLE_EN": "",
        "INTRO_STRONG": "Discover art festivals and cultural events across Japan in 2026.",
        "INTRO_BODY": "Explore festivals happening now or starting in the coming months, and find your next art trip by region, timing, and travel theme.",
        "SHOWING": "Showing",
        "LEGEND_HEAD": "WHEN",
        "CLOSE": "Close",
        "INFO_TITLE": "About this site",
        "INFO_LEAD": "JAPAN ART MAP is an independently operated map for discovering art festivals and art projects across Japan as inspiration for travel.",
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
        "F_STYLE": "도쿄 출발 여행 일수(예상)", "F_STYLE_EN": "",
        "UPCOMING": "2026년 예정", "YEARROUND": "연중", "FUTURE": "2027년 이후",
        "TT_ISLAND": "섬·바다", "TT_ONSEN": "온천", "TT_ARCH": "건축",
        "TT_PHOTO": "사진·영상", "TT_CRAFT": "공예", "TT_NATURE": "자연·마을",
        "TT_CITY": "동네 산책", "TT_FOOD": "음식",
        "A_DAY": "당일치기", "A_NIGHT": "1박", "A_LONG": "2박 이상",
        "SEARCH_PH": "검색",
        "DP_TITLE": "여행지 찾기", "DP_TITLE_EN": "",
        "INTRO_STRONG": "2026년 일본 전국의 예술제·아트 이벤트를 지도에서 찾아보세요.",
        "INTRO_BODY": "현재 개최 중인 예술제와 앞으로 열릴 행사를 지역, 시기, 여행 테마로 탐색하며 다음 아트 여행을 발견할 수 있습니다.",
        "SHOWING": "표시 중",
        "LEGEND_HEAD": "WHEN",
        "CLOSE": "닫기",
        "INFO_TITLE": "이 사이트에 대하여",
        "INFO_LEAD": "JAPAN ART MAP은 일본 각지의 예술제와 아트 프로젝트를 여행의 계기로 발견하기 위한 개인 운영 지도입니다.",
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
        "F_STYLE": "从东京出发的旅行天数（参考）", "F_STYLE_EN": "",
        "UPCOMING": "2026年即将举办", "YEARROUND": "全年", "FUTURE": "2027年以后",
        "TT_ISLAND": "岛屿·海", "TT_ONSEN": "温泉", "TT_ARCH": "建筑",
        "TT_PHOTO": "摄影·影像", "TT_CRAFT": "工艺", "TT_NATURE": "自然·乡野",
        "TT_CITY": "城市漫步", "TT_FOOD": "美食",
        "A_DAY": "一日游", "A_NIGHT": "1晚", "A_LONG": "2晚以上",
        "SEARCH_PH": "搜索",
        "DP_TITLE": "寻找旅行目的地", "DP_TITLE_EN": "",
        "INTRO_STRONG": "在地图上探索2026年日本全国的艺术节与艺术活动。",
        "INTRO_BODY": "从正在举办的艺术节到未来几个月即将开始的活动，可按地区、时间和旅行主题寻找下一次艺术之旅。",
        "SHOWING": "显示中",
        "LEGEND_HEAD": "WHEN",
        "CLOSE": "关闭",
        "INFO_TITLE": "关于本网站",
        "INFO_LEAD": "JAPAN ART MAP是一个个人运营的地图，希望把日本各地的艺术节与艺术项目变成旅行的灵感入口。",
        "INFO_OPERATOR": "运营·编辑",
        "INFO_CONTACT": "关于内容修正、图片使用以及其他咨询，请通过以下链接与我们联系。",
        "INFO_NOTE_LABEL": "关于刊载信息",
        "INFO_AI_NOTE": "本站信息在AI辅助调研的基础上整理。我们尽力保证准确性，但最新信息请务必以各活动官方网站为准。",
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
  <meta property="og:locale" content="{ {'ja':'ja_JP','en':'en_US','ko':'ko_KR','zh-cn':'zh_CN'}[lang] }" />
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
