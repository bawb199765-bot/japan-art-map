#!/usr/bin/env python3
"""
JAPAN ART MAP — ART TRIP exhibition scraper PoC

Principles:
- Only fetch public official museum pages.
- Respect robots.txt at runtime; skip a source if the path is disallowed.
- One request per source per run by default; no crawling loops.
- Identify ourselves with a clear User-Agent.
- Store source_url and scraped_at for traceability.
- Do not download/reuse exhibition images.
- Scraped output is a candidate dataset: editorial review happens before publishing.

This is a PoC. HTML layouts can change, so adapters should be checked periodically.
"""
from __future__ import annotations
import json, re, time, sys
from pathlib import Path
from datetime import datetime, timezone
from urllib.parse import urljoin, urlparse
from urllib.robotparser import RobotFileParser

import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
CONFIG = ROOT / "config" / "museums.json"
OUT_RAW = ROOT / "data" / "exhibitions_raw.json"
OUT_NORM = ROOT / "data" / "exhibitions_normalized.json"

UA = "ArtsLogix-JAPAN-ART-MAP/0.1 (+https://artslogix.github.io/japan-art-map/; contact via site)"
TIMEOUT = 20
SLEEP_SECONDS = 2.0

DATE_RE = re.compile(
    r"(?P<y1>20\d{2})年(?P<m1>\d{1,2})月(?P<d1>\d{1,2})日"
    r".{0,20}?(?:(?P<y2>20\d{2})年)?(?P<m2>\d{1,2})月(?P<d2>\d{1,2})日"
)

def iso(y,m,d):
    return f"{int(y):04d}-{int(m):02d}-{int(d):02d}"

def robots_allowed(url: str) -> tuple[bool, str]:
    p = urlparse(url)
    robots = f"{p.scheme}://{p.netloc}/robots.txt"
    rp = RobotFileParser()
    rp.set_url(robots)
    try:
        rp.read()
        return rp.can_fetch(UA, url), robots
    except Exception as e:
        # Conservative mode: don't fail open silently.
        return False, f"{robots} (unreadable: {e})"

def fetch(url: str) -> str:
    ok, robots = robots_allowed(url)
    if not ok:
        raise RuntimeError(f"robots.txt check did not allow fetch: {url} / {robots}")
    r = requests.get(url, timeout=TIMEOUT, headers={"User-Agent": UA, "Accept-Language":"ja,en;q=0.7"})
    r.raise_for_status()
    return r.text

def normalize_candidate(x):
    x = dict(x)
    x["type"] = "exhibition"
    x["scraped_at"] = datetime.now(timezone.utc).isoformat()
    x.setdefault("travel_tags", [])
    x.setdefault("travel_value", None)
    x.setdefault("travel_reason", None)
    return x

def parse_date_range(text: str):
    m = DATE_RE.search(re.sub(r"\s+"," ",text))
    if not m:
        return None, None
    y1,m1,d1 = int(m["y1"]),int(m["m1"]),int(m["d1"])
    y2 = int(m["y2"] or y1)
    return iso(y1,m1,d1), iso(y2,int(m["m2"]),int(m["d2"]))

def parse_kyocera(html_text: str, source: dict):
    soup = BeautifulSoup(html_text, "html.parser")
    out=[]
    # Robust-ish strategy: inspect links/cards whose text contains a 2-date range.
    for el in soup.find_all(["article","li","a","div"]):
        text=" ".join(el.stripped_strings)
        start,end=parse_date_range(text)
        if not start: continue
        # Remove common status/control words; title is text before first date.
        title=re.split(r"20\d{2}年\d{1,2}月\d{1,2}日", text, maxsplit=1)[0]
        title=re.sub(r"^(終了まで\d+日|開幕まで\d+日|チケット購入|入場自由)\s*","",title).strip()
        if len(title)<2 or len(title)>180: continue
        href = el.get("href") if el.name=="a" else None
        out.append(normalize_candidate({
            "title":title, "museum":source["museum"], "start_date":start, "end_date":end,
            "official_url":urljoin(source["url"], href) if href else source["url"],
            "source_url":source["url"]
        }))
    return dedupe(out)

def parse_kanazawa21(html_text: str, source: dict):
    soup=BeautifulSoup(html_text,"html.parser")
    out=[]
    for el in soup.find_all(["article","li","a","div"]):
        text=" ".join(el.stripped_strings)
        start,end=parse_date_range(text)
        if not start: continue
        # Common page format: "TITLE 2026年... 開催中 ..."
        title=re.split(r"20\d{2}年\d{1,2}月\d{1,2}日", text, maxsplit=1)[0].strip()
        title=re.sub(r"^(開催中/開催予定の展覧会|開催中/開催予定の市民ギャラリー展覧会)\s*","",title)
        if len(title)<2 or len(title)>180: continue
        href=el.get("href") if el.name=="a" else None
        out.append(normalize_candidate({
            "title":title,"museum":source["museum"],"start_date":start,"end_date":end,
            "official_url":urljoin(source["url"], href) if href else source["url"],
            "source_url":source["url"]
        }))
    return dedupe(out)

def parse_mot(html_text: str, source: dict):
    # MOT sometimes shows no future cards in HTML while the annual lineup PDF has them.
    # HTML adapter still captures cards when available; PDF fallback is intentionally left
    # as a separate/manual adapter in this PoC because PDF layout text order is not stable.
    soup=BeautifulSoup(html_text,"html.parser")
    out=[]
    for el in soup.find_all(["article","li","a","div"]):
        text=" ".join(el.stripped_strings)
        start,end=parse_date_range(text)
        if not start: continue
        title=re.split(r"20\d{2}年\d{1,2}月\d{1,2}日",text,maxsplit=1)[0].strip()
        if len(title)<2 or len(title)>180: continue
        href=el.get("href") if el.name=="a" else None
        out.append(normalize_candidate({
            "title":title,"museum":source["museum"],"start_date":start,"end_date":end,
            "official_url":urljoin(source["url"], href) if href else source["url"],
            "source_url":source["url"]
        }))
    return dedupe(out)

def dedupe(rows):
    seen=set(); out=[]
    for r in rows:
        key=(r.get("museum"),r.get("title"),r.get("start_date"),r.get("end_date"))
        if key in seen: continue
        seen.add(key); out.append(r)
    return out

ADAPTERS={"kyocera":parse_kyocera,"kanazawa21":parse_kanazawa21,"mot":parse_mot}

def main():
    sources=json.loads(CONFIG.read_text(encoding="utf-8"))
    raw=[]
    report=[]
    for src in sources:
        try:
            body=fetch(src["url"])
            rows=ADAPTERS[src["adapter"]](body,src)
            raw.extend(rows)
            report.append({"museum":src["museum"],"ok":True,"count":len(rows)})
        except Exception as e:
            report.append({"museum":src["museum"],"ok":False,"error":str(e)})
        time.sleep(SLEEP_SECONDS)

    raw=dedupe(raw)
    OUT_RAW.write_text(json.dumps({"report":report,"items":raw},ensure_ascii=False,indent=2),encoding="utf-8")
    # For now normalization is intentionally minimal. Editorial enrichment is separate.
    OUT_NORM.write_text(json.dumps(raw,ensure_ascii=False,indent=2),encoding="utf-8")
    print(json.dumps(report,ensure_ascii=False,indent=2))
    print(f"wrote {len(raw)} candidates")

if __name__=="__main__":
    main()
