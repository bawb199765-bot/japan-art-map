# Phase 2H — Multilingual visibility update

## Changes
- Added a persistent `4 LANGUAGES` badge beside the language switcher on desktop.
- On mobile the badge compresses to `4L` to preserve header space.
- Kept the direct language switch visible: 日本語 / English / 한국어 / 中文.
- Added a multilingual availability row inside INFORMATION:
  `4 LANGUAGES  日本語 / English / 한국어 / 中文`.
- Preserved the 82-case dataset including Waza Waza.
- Updated `_build/make_template.py` so the enhancement survives future rebuilds.

## QA
- All 4 generated pages contain the multilingual badge.
- All 4 language switches remain present.
- All 4 language labels are present.
- 82 CASES retained.
- Waza Waza retained.
- JavaScript syntax passes on all 4 pages.
- 24/24 targeted checks passed.
