# JAPAN ART MAP — Phase 2E Production QA

## Result
PASS — 87 / 87 automated static checks passed.

## Languages / canonical URLs
- Japanese: https://artslogix.github.io/japan-art-map/
- English: https://artslogix.github.io/japan-art-map/en/
- Korean: https://artslogix.github.io/japan-art-map/ko/
- Simplified Chinese: https://artslogix.github.io/japan-art-map/zh-cn/

All four pages remain part of the same JAPAN ART MAP site and use the same GA4 property.

## GA4
Measurement ID remains:
- G-PK81WLMXKD

Phase 2E adds the following to the automatic page_view config:
- `site_language`: ja / en / ko / zh-cn
- `content_group`: language/ja / language/en / language/ko / language/zh-cn

This preserves a single total site audience while making language breakdown easier.

### How to read the numbers
- Total JAPAN ART MAP traffic: use the GA4 property totals as usual. All four language URLs are included.
- Language breakdown: use the built-in Content group dimension and compare
  - language/ja
  - language/en
  - language/ko
  - language/zh-cn
- Optional: register `site_language` as an event-scoped custom dimension in GA4 if a dedicated site-language dimension is desired.

## Static checks passed
Across all four generated pages:
- correct `<html lang>`
- correct canonical URL
- correct `og:url`
- OGP v2 image retained
- GA4 property retained
- language-specific GA4 `site_language`
- language-specific GA4 `content_group`
- `assetUrl()` retained
- localized CASES pipeline retained
- hreflang: ja / en / ko / zh-CN / x-default
- all four language-switch destinations present
- old GitHub username/domain absent
- no visible static Japanese kana remains on EN / KO / ZH-CN pages
- JavaScript syntax passes `node --check`

Sitemap:
- valid XML
- contains all four canonical language URLs

Translation data:
- English content entries: 81
- Korean content entries: 81
- Simplified Chinese content entries: 81
- preferred/verified English event-name entries: 71
- remaining events intentionally retain a non-invented source/brand form where a reliable official English title was not established

## Internal-key safety
Still intentionally untranslated:
- `region`
- `cat`
- `nextYear`
- `data-travel-tag` values
- Japanese regex / source strings used by `getTravelTags()`

Do not translate those values in future edits.

## Deployment note
This package is intended to MERGE into the existing `japan-art-map` repository.
Do not delete the existing `/images/` directory or other repo assets.
The generated HTML resolves local images via `/japan-art-map/images/...`.

## Real-browser checks still required after deploy
Automated static QA cannot prove network/runtime behavior. After publishing, verify:
1. Leaflet/CARTO map tiles actually load.
2. Festival images load on `/`, `/en/`, `/ko/`, and `/zh-cn/`.
3. Language switch works on desktop and mobile.
4. Mobile header / language switch does not overflow.
5. Filters and search work in all four languages.
6. Recommended festivals open correctly.
7. GA4 Realtime receives page views from all four language paths.
8. GA4 Content group shows `language/ja`, `language/en`, `language/ko`, `language/zh-cn`.
9. OGP preview uses `ogp-japan-art-map-v2.png`.
10. Search Console eventually discovers the three new language URLs and hreflang relationships.

## Rebuild
From `_build/`:
```bash
python3 make_template.py && python3 generate.py
```

The deployed root files in this package were rebuilt from that pipeline after the GA4 language-segmentation change.
