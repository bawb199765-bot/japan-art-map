# JAPAN ART MAP — Phase 2I
## Traditional Chinese (Taiwan) + International Traveler Guide

### New language / locale
Added:
- `/zh-tw/`
- `html lang="zh-TW"`
- `hreflang="zh-TW"`
- Traditional Chinese SEO title / description / canonical / OGP
- GA4 segmentation:
  - `site_language: zh-tw`
  - `content_group: language/zh-tw`
- Sitemap now includes all 5 locale URLs.

Language switch:
- JP
- EN
- 한국어
- 简中
- 繁中

The header availability badge is now:
- `5 LANGUAGES`
- mobile: `5L`

Traditional Chinese content is derived from the existing Simplified Chinese editorial dataset, converted to Traditional Chinese and adjusted with common Taiwan-facing wording such as 資訊, 連結, 計畫, 搜尋, etc.
The original Japanese lookup keys remain unchanged.

### International traveler guide
Added a new filter block across all language versions:
- Easy from Tokyo / 東京から行きやすい
- Easy from Osaka / Kyoto / 大阪・京都から行きやすい
- Weekend trip / 週末旅向き
- Pair with onsen / 温泉と組み合わせ

These are travel-planning hints, not guarantees:
- `tokyo-easy`: approximate Tokyo travel time <= 2.5h
- `osaka-kyoto-easy`: prefecture heuristic for Shiga, Kyoto, Osaka, Hyogo, Nara, Wakayama, Mie, Okayama
- `weekend`: approximate Tokyo travel time <= 4h
- `onsen`: existing onsen travel-theme inference

A short note is shown in the UI telling users to confirm current transport details.

The same hints also appear as small badges in festival details.

### Existing content preserved
- 82 cases
- Waza Waza — Iga Art Book Fair 2026
- Japanese / English / Korean / Simplified Chinese pages
- GA4 events
- existing timing filters, travel-theme filters, trip-length filters
- existing images and asset routing

### QA
Final targeted checks:
- 5 generated language pages
- 5 language switch destinations
- zh-TW canonical / hreflang / sitemap
- GA4 language segmentation for all 5 locales
- visitor filter and visitor badge logic on all pages
- 82 CASES retained
- Waza Waza retained
- no unfilled template placeholders
- JavaScript syntax passes on all 5 pages
- Traditional Chinese UI spot checks pass
- 66 / 66 targeted checks pass
