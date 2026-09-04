# JAPAN ART MAP — ART TRIP BETA PoC

JAPAN ART MAP を「芸術祭の地図」から **“アートを理由に旅先を決める地図”** へ広げるための展覧会取得PoCです。

## 今回できたところ

- 3館を対象にした取得設計
  - 東京都現代美術館
  - 金沢21世紀美術館
  - 京都市京セラ美術館
- 公式展覧会ページから候補を取る Python scraper
- robots.txt を実行時に確認し、許可を確認できない場合は取得しない保守的な動作
- 低頻度アクセス（1ソース1回、ソース間2秒）
- 展覧会画像は取得しない
- `source_url` / `scraped_at` を保持
- スクレイピング結果と公開データを分離
- ART TRIP SCORE 3/5以上を掲載候補とする簡易ルール
- GitHub Actions の日次実行例
- 現在の公式情報で作った seed JSON
- ブラウザで確認できる `preview/index.html`

## 重要な考え方

自動スクレイピングした内容を、そのまま本番サイトには公開しません。

`公式サイト → raw candidates → normalize → art-trip scoring → editorial review → publish`

という二段階以上の運用を想定しています。

特に美術館ページはHTML構造が変わるため、スクレイパーの保守は必要です。
東京都現代美術館は、HTML一覧に将来展が出ないタイミングがあり、年度ラインアップPDFをフォールバックにする必要があります。このPoCではPDF由来の現在データを seed に入れつつ、PDF完全自動解析は次フェーズ扱いです。

## 実行

```bash
pip install -r requirements.txt
python scripts/scrape_exhibitions.py
python scripts/enrich_art_trip.py
```

GitHub Actionsは `.github/workflows/update-exhibitions.yml` にあります。
現時点ではサイトへ自動コミットせず、候補JSONをArtifactとして出す安全設計です。

## 次にやること

1. 実際のGitHub Actions環境で3サイトへのrobots.txt確認とHTML取得をテスト
2. 各サイトのHTML構造に合わせてselectorを固定し、誤検出率を下げる
3. MOT年度PDFの専用parserを追加
4. 本番JAPAN ART MAPに `ART FESTIVAL / EXHIBITION` 切替を追加
5. 展覧会詳細に `WHY TRAVEL?` と `ART TRIP SCORE` を表示
6. 台湾・英語・韓国語向けの表示名/旅行タグを生成
