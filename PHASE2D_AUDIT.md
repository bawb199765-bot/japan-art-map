# JAPAN ART MAP — Phase 2D Audit

## Scope completed
Korean and Simplified Chinese case-level localization is now implemented for all 81 cases.

### Localized per case
- name: 81 / 81
- tagline: 81 / 81
- desc: 81 / 81
- dateText: all source cases that have dateText
- dateNote: all source cases that have dateNote
- prefecture display names: 47 / 47 for Korean and Simplified Chinese

### Artist names
For Korean and Simplified Chinese pages, artist names use the Phase 2C English / official romanized forms.
Japanese source artist strings remain preserved in artistsJa.

## Safety / architecture
The following internal Japanese keys remain unchanged:
- CASES.region
- CASES.cat
- CASES.nextYear
- data-travel-tag values
- getTravelTags() Japanese regex rules

Original Japanese visitor-facing values are preserved as:
- nameJa
- prefJa
- taglineJa
- descJa
- dateTextJa
- dateNoteJa
- artistsJa

The verified / preferred English event name is preserved as nameEn.

## Search
Search now matches:
- localized display name
- localized prefecture
- localized tagline
- original Japanese name
- preferred English event name
- original Japanese prefecture
- original Japanese tagline
- inferred travel-tag text

This means Korean / Chinese users can search by localized wording, Japanese event names, or English official / preferred event names.

## Translation policy
- Korean and Simplified Chinese event names are editorial localizations for readability.
- Established brand names / English titles are retained where that is clearer.
- The English preferred / official name remains available as `nameEn`.
- No attempt was made to translate internal lookup keys.
- Descriptions are faithful localized summaries of the Phase 2B English content, not new factual research.

## Validation
- 4 generated HTML pages rebuilt successfully.
- No unresolved template placeholders.
- JavaScript syntax checked with Node.js for:
  - /
  - /en/
  - /ko/
  - /zh-cn/
- All checks passed.

## Still recommended before production
1. Open all four URLs in a real browser after deploy.
2. Confirm Leaflet/CARTO tiles render.
3. Confirm local images render on subdirectory pages.
4. Confirm GA4 receives page_view on each language path.
5. Spot-check Korean / Chinese typography on iOS and desktop.
6. Optional later QA: native-speaker editorial review of case descriptions and localized festival names.
