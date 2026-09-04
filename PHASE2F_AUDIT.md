# JAPAN ART MAP — Phase 2F

## Changes

### 1. Trip-length filter is now explicitly Tokyo-based
The former generic "Trip style" label is now presented as an approximate trip length from Tokyo.

- Japanese: 東京からの旅の日数目安
  - 日帰り / 1泊 / 2泊〜
- English: Trip length from Tokyo
  - Day trip / 1 night / 2+ nights
- Korean: 도쿄 출발 여행 일수(예상)
  - 당일치기 / 1박 / 2박 이상
- Simplified Chinese: 从东京出发的旅行天数（参考）
  - 一日游 / 1晚 / 2晚以上

The existing Tokyo travel-time thresholds remain unchanged:
- daytrip: tokyoHours <= 2
- overnight: 2 < tokyoHours <= 4
- longtrip: tokyoHours > 4

Because the source field is an approximate Tokyo travel-time value, the UI says "目安 / 예상 / 参考" rather than presenting the night count as a guaranteed itinerary.

### 2. Korean / Chinese event names
All 81 events continue to have localized name entries.

For titles that had previously appeared mainly as English brand names, Korean and Simplified Chinese now show a localized/transliterated title as the primary readable form, while retaining the official / established English brand title in parentheses where useful.

Examples:
- AOMORI GOKAN
  - KO: 아오모리 5관 (AOMORI GOKAN)
- Reborn-Art Festival
  - KO: 리본 아트 페스티벌 (Reborn-Art Festival)
  - ZH: 重生艺术节（Reborn-Art Festival）
- FUJI TEXTILE WEEK
  - KO: 후지 텍스타일 위크 (FUJI TEXTILE WEEK)
  - ZH: 富士纺织周（FUJI TEXTILE WEEK）
- OHNO ART BREW
  - KO: 오노 예술제 (OHNO ART BREW)
  - ZH: 大野艺术节（OHNO ART BREW）

Original Japanese names and preferred English official names remain preserved in the case-localization structure for search / reference.

## Safety
Internal Japanese lookup keys remain untouched:
- region
- cat
- nextYear
- data-travel-tag
- getTravelTags() Japanese matching rules

## Validation
- 81 / 81 Korean event-name localization entries
- 81 / 81 Simplified Chinese event-name localization entries
- all new trip-length labels present
- JavaScript syntax passes for all 4 generated pages
- 22 / 22 targeted Phase 2F automated checks passed

## Rebuild
From `_build/`:
```bash
python3 make_template.py && python3 generate.py
```
