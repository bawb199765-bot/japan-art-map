# Phase 2K — ART TRIP BETA integration

## Live-site integration
Added a top-level content switch:
- ART FESTIVALS — 82
- EXHIBITIONS — 12 (BETA)

The 12 exhibition seed records come from the Phase 2K Art Trip PoC covering:
- 東京都現代美術館
- 金沢21世紀美術館
- 京都市京セラ美術館

Exhibitions now participate in:
- map pins
- date/status filtering
- month filtering
- travel-theme filtering
- international traveler filters
- trip-length filters
- search
- list view
- desktop detail
- mobile detail
- recommendation/discovery cards

## Exhibition-specific UX
- EXHIBITION badge
- ART TRIP SCORE
- exhibition-specific discovery titles / detail headings in all 5 site languages
- official Japanese exhibition titles are preserved across locales during beta
- supporting travel copy is localized
- info/intro copy now mentions selected museum exhibitions

## Analytics
Added:
- `content_type_switch`
- `content_type` on detail / recommendation / official-link events

## Existing features preserved
- 82 art festivals
- Waza Waza
- 5 languages
- Taiwan wording corrections
- GA4 language segmentation
- visitor filters
- hreflang / sitemap

## Scraper subsystem
Included under `_arttrip/`:
- conservative official-site scraper PoC
- museum config
- seed JSON
- enrichment/scoring script
- preview
- workflow example

The workflow example is intentionally stored as `.disabled` so uploading this ZIP does NOT automatically begin scheduled scraping.

## QA
89/89 targeted checks passed.
