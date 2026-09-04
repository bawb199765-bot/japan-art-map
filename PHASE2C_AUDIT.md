# JAPAN ART MAP — Phase 2C Artist-name localization audit

## Completed

- English artist display names added for every artist entry in the source CASES data.
- 79 CASES records contain `artists` arrays.
- 253 artist/group occurrences were found.
- 224 unique Japanese/source strings are covered by `ARTIST_EN`.
- Missing mapping count: 0.
- Japanese source strings remain unchanged in `CASES` and are preserved as `artistsJa`.
- Localization is applied only when `LANG === "en"`.
- `region`, `cat`, `nextYear`, travel-tag keys and Japanese rule-matching text are untouched.

## Implementation

`_build/i18n_block.js` now contains `ARTIST_EN` and `localizeCases()` maps `artistsJa` to English display names.

The build remains reproducible:

```bash
cd _build
python3 make_template.py
python3 generate.py
```

`make_template.py` injects the Phase 2 localization block from `i18n_block.js`, so artist localization survives regeneration from `base_index.html`.

## Verification / corrections made during Phase 2C

Several ambiguous/non-Latin spellings were checked against artist, festival, museum, or project pages. Examples include:

- Avani Tandon Vieira / İbrahim Kurt — ARCUS-related English listings
- Anita Gratzer — Nakanojo Biennale
- Alexa Kumiko Hatanaka — Maebashi Biennale / artist representation
- Barthélémy Toguo — artist website
- Stasys Eidrigevičius — artist website
- Kasia Kujawska-Murphy — artist website
- Henriette Sabroe Ebbesen — photographer website
- Gabriela Morawetz — artist profile
- Benedetta Pompili — artist website
- Midori Takayama — corrected from an initial misreading after checking an English artist profile
- Eriko Mukai — confirmed from Tokyo Arts and Space / 3331 Art Fair
- Kenichi Obana — confirmed from Rokko Meets Art English profile
- Tadayuki Tahara — confirmed from artist website
- Keisuke Yamamoto — confirmed from Tomio Koyama Gallery
- Atsuro Terunuma — confirmed from artist/gallery listings
- Yukako Kojima — confirmed from Toyama glass-related English profile
- Koutarou Ushijima — spelling aligned to the artist's own English usage
- Takeshi Kagaya — confirmed from Toyama Prefectural Museum of Art database

## Final QA note

The visitor-facing English page now has English/Latin-script display values for all 253 artist/group occurrences. For less widely documented Japanese artists, the current value is a readable romanization of the Japanese source name. Before treating every individual spelling as archival/authority-file grade, a final one-by-one source check is still recommended for those less documented names.

This does not affect site functionality and is suitable for the Phase 2C site build.
