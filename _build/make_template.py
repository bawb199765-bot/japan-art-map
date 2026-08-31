#!/usr/bin/env python3
"""
Step 1: turn base_index.html into template.html — an i18n-aware single source.
Every replacement is asserted to hit exactly once so nothing silently drifts.
"""
import io, sys, re

SRC = "base_index.html"
OUT = "template.html"

html = io.open(SRC, encoding="utf-8").read()
i18n = io.open("i18n_block.js", encoding="utf-8").read()

errors = []

def rep(old, new, count=1, label=""):
    global html
    n = html.count(old)
    if n != count:
        errors.append(f"[{label or old[:60]}] expected {count} occurrence(s), found {n}")
        return
    html = html.replace(old, new, count)

# ────────────────────────────────────────────────────────────────
# 0. GA4 — keep one property for the whole site, while attaching the
#    site UI language to every automatic page_view.
# ────────────────────────────────────────────────────────────────
rep("gtag('config', 'G-PK81WLMXKD', { site_language: 'ja', content_group: 'language/ja' });",
    "gtag('config', 'G-PK81WLMXKD', { site_language: '__LANG__', content_group: 'language/__LANG__' });",
    label="GA4 site language")

# ────────────────────────────────────────────────────────────────
# 1. Inject the I18N block at the top of the main <script>
# ────────────────────────────────────────────────────────────────
anchor = "<script>\nfunction trackEvent(eventName, params = {}) {"
rep(anchor, "<script>\n" + i18n + "\nfunction trackEvent(eventName, params = {}) {",
    label="inject i18n block")

# ────────────────────────────────────────────────────────────────
# 1b. Phase 2A — localize visitor-facing CASES fields only after
#     the source array is fully created.
# ────────────────────────────────────────────────────────────────
rep("];\n\nconst IMPACT_PREFIX",
    "];\nlocalizeCases(CASES);\n\nconst IMPACT_PREFIX",
    label="phase2 localize CASES")

# Keep Japanese source text for rule-based travel-tag inference.
rep("""function getTravelTags(c) {
  const text = `${c.name} ${c.tagline || ''} ${c.desc || ''} ${c.cat || ''}`;
  const tags = new Set(c.travelTags || []);""",
"""function getTravelTags(c) {
  const rawName = c.nameJa || c.name;
  const rawTagline = c.taglineJa || c.tagline || '';
  const rawDesc = c.descJa || c.desc || '';
  const text = `${rawName} ${rawTagline} ${rawDesc} ${c.cat || ''}`;
  const tags = new Set(c.travelTags || []);""",
    label="phase2 travel tags raw text")

rep("""      /東京建築祭|広島国際建築祭|くまもとアートポリス|YCAM/.test(c.name)) tags.add("建築");""",
"""      /東京建築祭|広島国際建築祭|くまもとアートポリス|YCAM/.test(rawName)) tags.add("建築");""",
    label="phase2 travel tags architecture raw name")

rep("""      /KYOTOGRAPHIE|浅間国際フォト|恵比寿映像祭/.test(c.name)) tags.add("写真・映像");""",
"""      /KYOTOGRAPHIE|浅間国際フォト|恵比寿映像祭/.test(rawName)) tags.add("写真・映像");""",
    label="phase2 travel tags photo raw name")

rep("""      /Reborn|房総国際芸術祭/.test(c.name)) tags.add("食");""",
"""      /Reborn|リボーン|房総国際芸術祭/.test(rawName)) tags.add("食");""",
    label="phase2 travel tags food raw name")

# Search both localized display fields and original Japanese fields.
rep("""      if (!c.name.toLowerCase().includes(q) && !c.pref.includes(q) && !c.tagline.includes(q) && !travelTagText.includes(q)) return false;""",
"""      const nameJa = (c.nameJa || '').toLowerCase();
      const nameEn = (c.nameEn || '').toLowerCase();
      const prefJa = (c.prefJa || '').toLowerCase();
      const taglineJa = (c.taglineJa || '').toLowerCase();
      if (!c.name.toLowerCase().includes(q) && !c.pref.toLowerCase().includes(q) &&
          !c.tagline.toLowerCase().includes(q) && !nameJa.includes(q) &&
          !nameEn.includes(q) && !prefJa.includes(q) && !taglineJa.includes(q) &&
          !travelTagText.includes(q)) return false;""",
    label="phase2 bilingual search")

# Editorial recommendation matching must continue to use stable Japanese names.
rep("""  const byName = new Map(candidates.map(c => [c.name, c]));""",
"""  const byName = new Map(candidates.map(c => [c.nameJa || c.name, c]));""",
    label="phase2 discovery by raw name")

rep("""  const featuredSet = new Set(featured.map(c => c.name));""",
"""  const featuredSet = new Set(featured.map(c => c.nameJa || c.name));""",
    label="phase2 discovery featured set")

rep("""    .filter(c => !featuredSet.has(c.name))""",
"""    .filter(c => !featuredSet.has(c.nameJa || c.name))""",
    label="phase2 discovery remaining raw name")

rep("""      const isNagahama = c.name === "長浜国際芸術祭";""",
"""      const isNagahama = (c.nameJa || c.name) === "長浜国際芸術祭";""",
    label="phase2 discovery Nagahama raw name")

# ────────────────────────────────────────────────────────────────
# 2. Asset paths — route local images through assetUrl()
# ────────────────────────────────────────────────────────────────
rep('<div class="popup-thumb"><img src="${thumbSrc}"',
    '<div class="popup-thumb"><img src="${assetUrl(thumbSrc)}"',
    label="popupHtml thumb assetUrl")

rep('`<div class="discover-img"><img src="${c.localImg}"',
    '`<div class="discover-img"><img src="${assetUrl(c.localImg)}"',
    label="discovery img assetUrl")

rep('`<div class="mobile-pick-img"><img src="${c.localImg}"',
    '`<div class="mobile-pick-img"><img src="${assetUrl(c.localImg)}"',
    label="mobile pick img assetUrl")

# ────────────────────────────────────────────────────────────────
# 3. renderTimingLegend — dynamic month/status labels
# ────────────────────────────────────────────────────────────────
rep("""  const items = [
    ['ongoing', '開催中'],
    ['month0', `${year}年${m0}月開始`],
  ];
  if (m1) items.push(['month1', `${year}年${m1}月開始`]);
  if (m2) items.push(['month2', `${year}年${m2}月開始`]);
  items.push(
    ['later', `${year}年${m2 ? m2 + 1 : m0 + 1}月以降`],
    ['future', `${year + 1}年〜`],
    ['yearround', '通年'],
    ['unknown', '未発表・終了']
  );""",
"""  const items = [
    ['ongoing', T.ongoing],
    ['month0', T.monthStart(year, m0)],
  ];
  if (m1) items.push(['month1', T.monthStart(year, m1)]);
  if (m2) items.push(['month2', T.monthStart(year, m2)]);
  items.push(
    ['later', T.monthOnwards(year, m2 ? m2 + 1 : m0 + 1)],
    ['future', T.yearOnwards(year + 1)],
    ['yearround', T.yearround],
    ['unknown', T.unannouncedOrEnded]
  );""", label="renderTimingLegend items")

# ────────────────────────────────────────────────────────────────
# 4. CAT_LABELS display — route through T.cats
# ────────────────────────────────────────────────────────────────
rep("function catLabel(cat) { return CAT_LABELS[cat] || cat; }",
    "function catLabel(cat) {\n"
    "  const ja = CAT_LABELS[cat] || cat;\n"
    "  return (T.cats && T.cats[ja]) || ja;\n"
    "}", label="catLabel i18n")

# ────────────────────────────────────────────────────────────────
# 5. travelTagsHtml — translate the visible chip text only
# ────────────────────────────────────────────────────────────────
rep("""  return `<div class="travel-tags">${tags.map(t => `<span class="travel-tag">${t}</span>`).join('')}</div>`;""",
    """  return `<div class="travel-tags">${tags.map(t => `<span class="travel-tag">${travelTagLabel(t)}</span>`).join('')}</div>`;""",
    label="travelTagsHtml labels")

# ────────────────────────────────────────────────────────────────
# 6. updateDynamicFilterLabels — upcoming + future chips
# ────────────────────────────────────────────────────────────────
rep("""function updateDynamicFilterLabels() {
  const el = document.getElementById('upcoming-filter-label');
  if (el) el.textContent = `${todayLocal().getFullYear()}年これから`;
}""",
"""function updateDynamicFilterLabels() {
  const year = todayLocal().getFullYear();
  const el = document.getElementById('upcoming-filter-label');
  if (el) el.textContent = T.upcomingThisYear(year);
  const fu = document.getElementById('future-filter-label');
  if (fu) fu.textContent = T.yearOnwards(year + 1);
}""", label="updateDynamicFilterLabels")

# ────────────────────────────────────────────────────────────────
# 7. renderMonthFilters — month chip labels
# ────────────────────────────────────────────────────────────────
rep("""style="font-family: Helvetica">${today.getFullYear()}年${m}月</button>`""",
    """style="font-family: Helvetica">${T.ym(today.getFullYear(), m)}</button>`""",
    label="month filter chips")

# ────────────────────────────────────────────────────────────────
# 8. formatDateRange
# ────────────────────────────────────────────────────────────────
rep("""    if (!s || !e) return c.nextYear || '日程未発表';""",
    """    if (!s || !e) return c.nextYear || T.noDate;""",
    label="formatDateRange fallback")

rep("""  if (c.nextYear === '通年') return '通年で楽しめる';
  if (/^20\\d{2}$/.test(c.nextYear || '')) return `${c.nextYear}年 開催予定`;
  return '日程未発表';""",
    """  if (c.nextYear === '通年') return T.yearRoundLong;
  if (/^20\\d{2}$/.test(c.nextYear || '')) return T.plannedYear(c.nextYear);
  return T.noDate;""", label="formatDateRange tail")

# ────────────────────────────────────────────────────────────────
# 9. getEventStatus — all visible labels
# ────────────────────────────────────────────────────────────────
rep("""  if (c.yearRound || c.nextYear === '通年') return { key:'yearround', label:'通年' };
  if (c.statusMode === 'program') return { key:'program', label:c.statusLabel || '年間プログラム' };""",
    """  if (c.yearRound || c.nextYear === '通年') return { key:'yearround', label:T.yearround };
  if (c.statusMode === 'program') return { key:'program', label:c.statusLabel || T.annualProgram };""",
    label="getEventStatus yearround/program")

rep("""      if (eventYear > today.getFullYear()) return { key:'future', label:`${eventYear}予定` };
      if (c.approximateDate) return { key:'upcoming', label:`${s.getMonth()+1}月から` };
      return { key:'upcoming', label: days <= 30 ? `あと${days}日` : `${formatMD(c.startDate)}から` };
    }
    if (today <= e) return { key:'ongoing', label:'開催中' };
    return { key:'ended', label:'終了' };""",
    """      if (eventYear > today.getFullYear()) return { key:'future', label:T.plannedShort(eventYear) };
      if (c.approximateDate) return { key:'upcoming', label:T.fromMonth(s.getMonth()+1) };
      return { key:'upcoming', label: days <= 30 ? T.inDays(days) : T.fromMD(formatMD(c.startDate)) };
    }
    if (today <= e) return { key:'ongoing', label:T.ongoing };
    return { key:'ended', label:T.ended };""", label="getEventStatus dated branch")

rep("""  if (Number.isFinite(y) && y > today.getFullYear()) return { key:'future', label:`${y}予定` };
  return { key:'unknown', label:'日程未発表' };""",
    """  if (Number.isFinite(y) && y > today.getFullYear()) return { key:'future', label:T.plannedShort(y) };
  return { key:'unknown', label:T.noDate };""", label="getEventStatus tail")

# ────────────────────────────────────────────────────────────────
# 10. popupHtml
# ────────────────────────────────────────────────────────────────
rep("""  const tripType = c.tokyoHours <= 2 ? '日帰り向き' : c.tokyoHours <= 4 ? '1泊向き' : '遠征向き';
  const accessLabel = c.tokyoHours === 0 ? `都内・${tripType}` : `約 ${c.tokyoHours}h・${tripType}`;""",
    """  const tripType = c.tokyoHours <= 2 ? T.tripDay : c.tokyoHours <= 4 ? T.tripNight : T.tripLong;
  const accessLabel = c.tokyoHours === 0 ? T.inTokyo(tripType) : T.hoursFromTokyo(c.tokyoHours, tripType);""",
    label="popupHtml trip labels")

rep("""`<div class="popup-thumb popup-thumb-empty">No Image</div>`""",
    """`<div class="popup-thumb popup-thumb-empty">${T.noImage}</div>`""",
    label="popupHtml no image")

rep("""<span class="popup-meta-k">旅の目安</span>""",
    """<span class="popup-meta-k">${T.tripGuide}</span>""", label="popupHtml trip guide k")

rep("""<span class="popup-meta-k">東京から</span>""",
    """<span class="popup-meta-k">${T.fromTokyo}</span>""", label="popupHtml from tokyo k")

rep("""<div class="popup-artists-k">見られるアーティスト</div>""",
    """<div class="popup-artists-k">${T.featuredArtists}</div>""", label="popupHtml artists k")

rep("""target="_blank" rel="noopener">公式サイト</a>`""",
    """target="_blank" rel="noopener">${T.officialSite}</a>`""", label="popupHtml official link")

# ────────────────────────────────────────────────────────────────
# 11. Detail panel titles
# ────────────────────────────────────────────────────────────────
rep("""  if (detailPanelTitle) detailPanelTitle.textContent = '芸術祭の詳細';
  if (detailPanelTitleEn) detailPanelTitleEn.textContent = 'Festival Detail';""",
    """  if (detailPanelTitle) detailPanelTitle.textContent = T.detailTitle;
  if (detailPanelTitleEn) detailPanelTitleEn.textContent = T.detailTitleEn;""",
    label="discovery panel title")

rep("""  if (detailPanelTitle) detailPanelTitle.textContent = '選択中の芸術祭';
  if (detailPanelTitleEn) detailPanelTitleEn.textContent = 'Selected';""",
    """  if (detailPanelTitle) detailPanelTitle.textContent = T.selectedTitle;
  if (detailPanelTitleEn) detailPanelTitleEn.textContent = T.selectedTitleEn;""",
    label="selected panel title")

# ────────────────────────────────────────────────────────────────
# 12. renderDiscoveryPanel body copy
# ────────────────────────────────────────────────────────────────
rep("""      <div class="detail-guide-title">ここに、選んだ芸術祭の詳細が表示されます。</div>
      <div class="detail-guide-copy">左の一覧、または右の地図から気になる芸術祭を選んでください。画像・会期・旅の目安・見どころを、この中央パネルで確認できます。</div>
      <div class="discover-howto-arrows"><span>← 一覧から選ぶ</span><span>地図から選ぶ →</span></div>""",
    """      <div class="detail-guide-title">${T.detailGuideTitle}</div>
      <div class="detail-guide-copy">${T.detailGuideCopy}</div>
      <div class="discover-howto-arrows"><span>${T.arrowList}</span><span>${T.arrowMap}</span></div>""",
    label="discovery howto copy")

rep("""      <div class="recommend-title">${activeMonth !== 'all' ? `${activeMonth}月に行ける、おすすめの芸術祭` : '今年行ける、おすすめの芸術祭'}</div>
      <div class="recommend-lead">${activeMonth !== 'all'
        ? `${activeMonth}月に会期が重なる芸術祭から、今から行ける3件をピックアップ。`
        : `開催中、${currentYear}年にこれから始まるもの、通年で楽しめるものから3件をピックアップ。`}</div>
      ${cards || '<div class="detail-empty-sub">現在、この条件でおすすめできる芸術祭がありません。</div>'}
      <div class="discover-foot">「開催中」「${currentYear}年これから」「何月に行く？」「旅のテーマ」「旅のスタイル」を組み合わせて探せます。</div>""",
    """      <div class="recommend-title">${activeMonth !== 'all' ? T.recommendTitleMonth(activeMonth) : T.recommendTitleYear}</div>
      <div class="recommend-lead">${activeMonth !== 'all'
        ? T.recommendLeadMonth(activeMonth)
        : T.recommendLeadYear(currentYear)}</div>
      ${cards || `<div class="detail-empty-sub">${T.recommendEmpty}</div>`}
      <div class="discover-foot">${T.discoverFoot(currentYear)}</div>""",
    label="discovery recommend block")

# ────────────────────────────────────────────────────────────────
# 13. renderMobileDiscovery
# ────────────────────────────────────────────────────────────────
rep("""  title.textContent = activeMonth !== 'all'
    ? `${activeMonth}月に行ける、おすすめの芸術祭`
    : '今年行ける、おすすめの芸術祭';""",
    """  title.textContent = activeMonth !== 'all'
    ? T.recommendTitleMonth(activeMonth)
    : T.recommendTitleYear;""", label="mobile discovery title")

rep("""    wrap.innerHTML = `<div style="padding:10px 14px;color:var(--muted);font-size:11px;">この条件でおすすめできる芸術祭はありません。</div>`;""",
    """    wrap.innerHTML = `<div style="padding:10px 14px;color:var(--muted);font-size:11px;">${T.recommendEmptyMobile}</div>`;""",
    label="mobile discovery empty")

# ────────────────────────────────────────────────────────────────
# 14. syncMobileQuickbar month buttons
# ────────────────────────────────────────────────────────────────
rep("""    currentBtn.textContent = `${today.getFullYear()}年${current}月`;""",
    """    currentBtn.textContent = T.ym(today.getFullYear(), current);""",
    label="quickbar current month")

rep("""      nextBtn.textContent = `${today.getFullYear()}年${next}月`;""",
    """      nextBtn.textContent = T.ym(today.getFullYear(), next);""",
    label="quickbar next month")

# ────────────────────────────────────────────────────────────────
# 15. renderList — counter, empty state, region headers
# ────────────────────────────────────────────────────────────────
rep("""mapShow.textContent = filtered.length + ' / ' + CASES.length + ' 件';""",
    """mapShow.textContent = T.countUnit(filtered.length, CASES.length);""",
    label="map counter")

rep("""    list.innerHTML = '<div class="empty-state">該当する取り組みがありません<span class="es-en">No results</span></div>';""",
    """    list.innerHTML = `<div class="empty-state">${T.noResults}<span class="es-en">${T.noResultsEn}</span></div>`;""",
    label="empty state")

rep("""<span class="rh-jp">${region}</span>""",
    """<span class="rh-jp">${regionLabel(region)}</span>""", label="region header label")

# ────────────────────────────────────────────────────────────────
# 16. Markup placeholders that the per-language generator fills in
# ────────────────────────────────────────────────────────────────
rep('<html lang="ja">', '<html lang="__HTML_LANG__">', label="html lang")

# Header brand text
rep('<div class="site-header-title">日本の芸術祭を旅する</div>',
    '<div class="site-header-title">__HDR_TITLE__</div>', label="header title")
rep('<div class="site-header-sub">今年、どの芸術祭に行く？</div>',
    '<div class="site-header-sub">__HDR_SUB__</div>', label="header sub")

# Language switcher + INFO grouped on the right of the header
rep("""  <button class="site-info-trigger" id="site-info-open" type="button"
          aria-haspopup="dialog" aria-controls="site-info-modal">
    INFORMATION
  </button>""",
"""  <div class="site-header-actions">
    <nav class="lang-switch" aria-label="Language">
__LANG_LINKS__
    </nav>
    <button class="site-info-trigger" id="site-info-open" type="button"
            aria-haspopup="dialog" aria-controls="site-info-modal">
      INFORMATION
    </button>
  </div>""", label="header actions + lang switch")

# Mobile discovery
rep('aria-label="おすすめの芸術祭"', 'aria-label="__A11Y_PICKS__"', label="mobile discovery aria")
rep('<h2 class="mobile-discovery-title" id="mobile-discovery-title">今年行ける、おすすめの芸術祭</h2>',
    '<h2 class="mobile-discovery-title" id="mobile-discovery-title">__PICKS_TITLE__</h2>',
    label="mobile discovery title markup")
rep('<button class="mobile-quick-chip" id="mobile-now-btn" type="button">● 開催中</button>',
    '<button class="mobile-quick-chip" id="mobile-now-btn" type="button">● __ONGOING__</button>',
    label="mobile now btn")
rep("""        詳細条件で絞り込み <span>＋</span>""",
    """        __MORE_FILTERS__ <span>＋</span>""", label="mobile filter toggle")

# Filter block labels
rep("""        <span class="fl-label-jp" style="font-family: Helvetica">いつ行く？</span>
        <span class="fl-label-en">When to go</span>""",
    """        <span class="fl-label-jp" style="font-family: Helvetica">__F_WHEN__</span>
        <span class="fl-label-en">__F_WHEN_EN__</span>""", label="filter when")

rep("""        <span class="fl-label-jp" style="font-family: Helvetica">何月に行く？</span>
        <span class="fl-label-en">Month</span>""",
    """        <span class="fl-label-jp" style="font-family: Helvetica">__F_MONTH__</span>
        <span class="fl-label-en">__F_MONTH_EN__</span>""", label="filter month")

rep("""        <span class="fl-label-jp" style="font-family: Helvetica">旅のテーマ</span>
        <span class="fl-label-en">Travel Theme</span>""",
    """        <span class="fl-label-jp" style="font-family: Helvetica">__F_THEME__</span>
        <span class="fl-label-en">__F_THEME_EN__</span>""", label="filter theme")

rep("""        <span class="fl-label-jp" style="font-family: Helvetica">旅のスタイル</span>
        <span class="fl-label-en">Trip Length</span>""",
    """        <span class="fl-label-jp" style="font-family: Helvetica">__F_STYLE__</span>
        <span class="fl-label-en">__F_STYLE_EN__</span>""", label="filter style")

# Status chips
rep("""        <button class="chip chip-now" data-status="ongoing">開催中</button>
        <button class="chip" id="upcoming-filter-label" data-status="upcoming" style="font-family: Helvetica">2026年これから</button>
        <button class="chip" data-status="yearround" style="font-family: Helvetica">通年</button>
        <button class="chip" data-status="future" style="font-family: Helvetica">2027〜</button>""",
    """        <button class="chip chip-now" data-status="ongoing">__ONGOING__</button>
        <button class="chip" id="upcoming-filter-label" data-status="upcoming" style="font-family: Helvetica">__UPCOMING__</button>
        <button class="chip" data-status="yearround" style="font-family: Helvetica">__YEARROUND__</button>
        <button class="chip" id="future-filter-label" data-status="future" style="font-family: Helvetica">__FUTURE__</button>""",
    label="status chips")

# Travel tag chips — keys stay Japanese, labels swap
for ja, key in [("島・海","ISLAND"),("温泉","ONSEN"),("建築","ARCH"),("写真・映像","PHOTO"),
                ("工芸","CRAFT"),("自然・里山","NATURE"),("街歩き","CITY"),("食","FOOD")]:
    rep(f'<button class="chip" data-travel-tag="{ja}">{ja}</button>',
        f'<button class="chip" data-travel-tag="{ja}">__TT_{key}__</button>',
        label=f"travel tag chip {ja}")

# Access chips
rep("""        <button class="chip" data-access="daytrip" style="font-family: Helvetica">日帰り</button>
        <button class="chip" data-access="overnight" style="font-family: Helvetica">1泊で行ける</button>
        <button class="chip" data-access="longtrip" style="font-family: Helvetica">じっくり遠征</button>""",
    """        <button class="chip" data-access="daytrip" style="font-family: Helvetica">__A_DAY__</button>
        <button class="chip" data-access="overnight" style="font-family: Helvetica">__A_NIGHT__</button>
        <button class="chip" data-access="longtrip" style="font-family: Helvetica">__A_LONG__</button>""",
    label="access chips")

rep('placeholder="検索  ·  Search cases"', 'placeholder="__SEARCH_PH__"', label="search placeholder")

# Detail panel head
rep("""      <span class="detail-panel-head-jp" id="detail-panel-title">旅先を探す</span>
      <span class="detail-panel-head-en" id="detail-panel-title-en">Discover</span>""",
    """      <span class="detail-panel-head-jp" id="detail-panel-title">__DP_TITLE__</span>
      <span class="detail-panel-head-en" id="detail-panel-title-en">__DP_TITLE_EN__</span>""",
    label="detail panel head")

# SEO intro
rep("""        <section class="seo-intro" aria-label="JAPAN ART MAPについて">
          <strong>2026年の全国の芸術祭・アートイベントを地図から探す。</strong>
          開催中の芸術祭、8月・9月・10月に始まるアートイベント、地域や旅のテーマから、次のアート旅を見つけるためのマップです。
        </section>""",
    """        <section class="seo-intro" aria-label="About JAPAN ART MAP">
          <strong>__INTRO_STRONG__</strong>
          __INTRO_BODY__
        </section>""", label="seo intro")

# Map meta + legend
rep('<span class="k">表示中</span>', '<span class="k">__SHOWING__</span>', label="map meta showing")
rep('<div class="legend-head">WHEN ／ 開催時期</div>',
    '<div class="legend-head">__LEGEND_HEAD__</div>', label="legend head")

# INFORMATION modal
rep('<button class="site-info-close" type="button" aria-label="閉じる" data-info-close>✕</button>',
    '<button class="site-info-close" type="button" aria-label="__CLOSE__" data-info-close>✕</button>',
    label="modal close aria")
rep('<h2 class="site-info-title" id="site-info-title">このサイトについて</h2>',
    '<h2 class="site-info-title" id="site-info-title">__INFO_TITLE__</h2>', label="modal title")
rep("""    <p class="site-info-lead">
      JAPAN ART MAP は、全国の芸術祭やアートプロジェクトを、
      次の旅のきっかけとして見つけるための個人運営のマップです。
    </p>""",
    """    <p class="site-info-lead">__INFO_LEAD__</p>""", label="modal lead")
rep('<div class="site-info-label">運営・編集</div>',
    '<div class="site-info-label">__INFO_OPERATOR__</div>', label="modal operator label")
rep("""      <p class="site-info-copy">
        掲載内容の修正、画像利用に関するご連絡、その他のお問い合わせは、
        下記のリンクからご連絡ください。
      </p>""",
    """      <p class="site-info-copy">__INFO_CONTACT__</p>""", label="modal contact copy")
rep('<div class="site-info-label">掲載情報について</div>',
    '<div class="site-info-label">__INFO_NOTE_LABEL__</div>', label="modal note label")
rep("""      <p class="site-info-copy">
        掲載情報はAIによる調査を活用して作成しています。正確性には配慮していますが、
        最新情報は必ず各公式サイトでご確認ください。
      </p>""",
    """      <p class="site-info-copy">__INFO_AI_NOTE__</p>""", label="modal AI note")

# ────────────────────────────────────────────────────────────────
# 17. Language switcher CSS (appended to the final override layer)
# ────────────────────────────────────────────────────────────────
lang_css = """
    /* ── Language switcher in the floating header ── */
    .site-header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 0 0 auto;
    }
    .lang-switch {
      display: flex;
      align-items: center;
      height: 26px;
      border: 1px solid rgba(240,232,216,.28);
      background: rgba(20,17,13,.26);
      overflow: hidden;
    }
    .lang-switch a {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 8px;
      font-family: var(--mono);
      font-size: 8.5px;
      font-weight: 600;
      letter-spacing: .1em;
      color: rgba(240,232,216,.72);
      text-decoration: none;
      white-space: nowrap;
      border-right: 1px solid rgba(240,232,216,.16);
      transition: color .15s, background .15s;
    }
    .lang-switch a:last-child { border-right: none; }
    .lang-switch a:hover { color: #fff; background: rgba(20,17,13,.62); }
    .lang-switch a[aria-current="true"] {
      color: #14110d;
      background: var(--accent);
    }
    .lang-short { display: none; }

    @media (max-width: 768px) {
      .site-header-actions { gap: 6px; }
      .lang-switch { height: 24px; }
      .lang-switch a { padding: 0 6px; font-size: 8px; letter-spacing: .06em; }
      .lang-full { display: none; }
      .lang-short { display: inline; }
      /* the switcher eats horizontal room, so give the brand less */
      .site-header-brand { max-width: calc(100vw - 210px); }
    }
    @media (max-width: 560px) {
      /* drop the tagline before the language switcher wraps */
      .site-header-divider, .site-header-sub { display: none; }
      .site-header-brand { max-width: calc(100vw - 200px); }
      .site-info-trigger { min-width: 0; font-size: 0; padding: 0 7px; }
      .site-info-trigger::after {
        content: 'INFO';
        font-size: 8px;
        letter-spacing: .12em;
      }
    }
"""
rep("""    /* ── V3.8.1 MOBILE: keep Leaflet/CARTO attribution above timing legend ── */""",
    lang_css + """
    /* ── V3.8.1 MOBILE: keep Leaflet/CARTO attribution above timing legend ── */""",
    label="lang switcher css")

# ────────────────────────────────────────────────────────────────
# 18. Replace the whole head SEO area with a single placeholder
# ────────────────────────────────────────────────────────────────
start = html.index("  <title>")
end = html.index("</head>")
head_block = html[start:end]
# sanity: the block we're about to rebuild must contain the known SEO bits
for must in ["og:image", "canonical", "application/ld+json", "twitter:image"]:
    if must not in head_block:
        errors.append(f"head block missing {must} before replacement")

# Keep only the third-party asset links and the <style> block.
# Everything else in the head (title/description/OGP/twitter/canonical/JSON-LD)
# is rebuilt per language by generate.py, so the originals are dropped here —
# otherwise the old Japanese tags would survive after </style> and every
# language page would ship duplicate canonical/og/ld+json in Japanese.
keep_start = head_block.index('  <link rel="stylesheet" href="https://cdnjs.cloudflare.com')
keep_end = head_block.index("  <style>")
assets = head_block[keep_start:keep_end]

style_start = head_block.index("  <style>")
style_end = head_block.index("</style>") + len("</style>")
style_block = head_block[style_start:style_end]

dropped = head_block[style_end:]
for must in ["og:image", "canonical", "application/ld+json"]:
    if must not in dropped:
        errors.append(f"expected legacy SEO tag {must} in the dropped tail; head layout changed")

html = html[:start] + "__HEAD_SEO__\n\n" + assets + style_block + "\n\n" + html[end:]

if errors:
    print("FAILED:")
    for e in errors:
        print("  -", e)
    sys.exit(1)

io.open(OUT, "w", encoding="utf-8").write(html)
print("template.html written OK")
print("placeholders found:", len(set(re.findall(r"__[A-Z0-9_]+__", html))))
for p in sorted(set(re.findall(r"__[A-Z0-9_]+__", html))):
    print("   ", p)
