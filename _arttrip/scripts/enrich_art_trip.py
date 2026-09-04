#!/usr/bin/env python3
import json
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
IN=ROOT/"data"/"exhibitions_normalized.json"
OUT=ROOT/"data"/"exhibitions_publishable.json"

CITY_TAGS={
    "東京都現代美術館":["Tokyo","City Walk","Kiyosumi Shirakawa"],
    "金沢21世紀美術館":["Kanazawa","Architecture","City Walk"],
    "京都市京セラ美術館":["Kyoto","Architecture","City Walk"],
}

def score(row):
    """Simple transparent PoC score; replace with editorial review / AI later."""
    s=1
    museum=row.get("museum","")
    if museum in ("金沢21世紀美術館","京都市京セラ美術館"): s+=1 # destination-worthy institution/architecture
    title=row.get("title","")
    if any(k in title.lower() for k in ["tate","テート","国際","biennale","triennale"]): s+=1
    if any(k in title for k in ["能登","染織","工芸","禅","京都","金沢"]): s+=1
    if row.get("start_date") and row.get("end_date"): s+=1
    return min(s,5)

rows=json.loads(IN.read_text(encoding="utf-8"))
for r in rows:
    r["travel_tags"]=sorted(set(r.get("travel_tags",[])+CITY_TAGS.get(r.get("museum"),[])))
    r["travel_value"]=score(r)
    r["publish_candidate"]=r["travel_value"]>=3

OUT.write_text(json.dumps(rows,ensure_ascii=False,indent=2),encoding="utf-8")
print(f"wrote {len(rows)} rows; publish candidates={sum(x['publish_candidate'] for x in rows)}")
