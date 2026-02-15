# HANDOVER.md

マラソンランナー向け栄養管理PWAアプリ — セッション引き継ぎドキュメント

---

## 1. Summary

### セッションの目的
前回セッションで構築したマラソンランナー向け栄養管理PWAアプリに対して、以下の改善を実施:
- ダークモード対応 + iPhone PWAブラック画面修正（前セッション末尾の未コミット分）
- アイコンのリデザイン（オレンジ×レーダーチャート）
- チャート分析画面の改善

### 達成内容
- **ダークモード**: CSS変数ベースで全18コンポーネントがシステム設定に自動追従（ライト/ダーク）
- **iPhone PWA修正**: `apple-mobile-web-app-capable` 等のメタタグ追加でブラック画面問題を解消
- **アイコン刷新**: 「栄」テキストアイコン → オレンジグラデーション背景のレーダーチャートデザイン
- **レーダーチャート改善**: 目盛り数値（50, 100, 150）を非表示
- **体重推移チャート**: 分析タブで常時表示（データ未入力時はプレースホルダー）
- GitHub Pages への自動デプロイ完了

---

## 2. Changes Made

### ソースコード

| ファイル | 変更内容 |
|----------|----------|
| `src/index.css` | CSS変数によるライト/ダークモード自動切替システム導入 |
| `src/components/layout/AppLayout.tsx` | CSS変数ベースの背景色に移行 |
| `src/components/layout/BottomNavigation.tsx` | CSS変数ベースのカラーに移行 |
| `src/components/layout/Header.tsx` | CSS変数ベースのカラーに移行 |
| `src/components/dashboard/DashboardPage.tsx` | CSS変数対応 |
| `src/components/dashboard/DailyAdviceBanner.tsx` | CSS変数対応 |
| `src/components/dashboard/DailySummary.tsx` | CSS変数対応 |
| `src/components/dashboard/MiniPfcRadar.tsx` | CSS変数対応 |
| `src/components/weight/WeightPage.tsx` | CSS変数対応 |
| `src/components/weight/WeightChart.tsx` | Chart.jsの色をCSS変数から取得 |
| `src/components/meals/MealsPage.tsx` | CSS変数対応 |
| `src/components/meals/AddMealModal.tsx` | CSS変数対応 |
| `src/components/hydration/HydrationPage.tsx` | CSS変数対応 |
| `src/components/charts/ChartsPage.tsx` | 体重推移チャートを常時表示に変更 |
| `src/components/charts/PfcRadarChart.tsx` | 目盛り数値（50,100,150）を非表示 |
| `src/components/charts/WeeklyPfcBarChart.tsx` | Chart.jsの色をCSS変数から取得 |
| `src/components/settings/SettingsPage.tsx` | CSS変数対応 |
| `src/components/onboarding/OnboardingPage.tsx` | CSS変数対応 |

### 設定ファイル

| ファイル | 変更内容 |
|----------|----------|
| `tailwind.config.js` | `darkMode: "media"` 追加、ダークモード用カラートークン定義 |
| `vite.config.ts` | PWAマニフェストの `background_color` を `#000000` に変更 |
| `index.html` | Apple PWAメタタグ追加、dual theme-color、FOUC防止CSS、apple-touch-icon参照 |

### アセット

| ファイル | 変更内容 |
|----------|----------|
| `public/favicon.svg` | オレンジグラデーション×五角形レーダーチャートデザインに刷新 |
| `public/pwa-192x192.png` | 新規作成（SVGから生成） |
| `public/pwa-512x512.png` | 新規作成（SVGから生成） |
| `public/apple-touch-icon.png` | 新規作成（180x180、iOS用） |

---

## 3. What Worked

### CSS変数によるダークモード実装
- `prefers-color-scheme: dark` メディアクエリ内で `:root` のCSS変数を上書きする方式
- Tailwindの `dark:` プレフィックスを全ファイルに追加するより遥かに効率的
- 各コンポーネントでは `style={{ color: 'var(--color-secondary-label)' }}` の形式で参照

### アイコン生成パイプライン
- SVGで設計 → `sharp` パッケージで3サイズのPNGを一括生成 → sharp をアンインストール
- `density: 300` オプションでSVGを高解像度レンダリングしてからリサイズ

### Chart.jsのダークモード対応
- `getComputedStyle(document.documentElement).getPropertyValue('--chart-text')` でCSS変数を取得
- チャートのグリッド線・テキスト色がダークモードに自動追従

---

## 4. What Didn't Work (and Fixes)

### iPhone PWAブラック画面
- **原因**: `apple-mobile-web-app-capable` メタタグが未設定、`body` に旧クラス `bg-slate-50` が残存、PWA manifest の `background_color` が `#f8fafc`（旧値）
- **修正**: Apple PWAメタタグ一式追加、`viewport-fit=cover`、safe-area-inset対応、FOUC防止CSS

### PWAアイコンが「栄」テキスト表示
- **原因**: `pwa-192x192.png` と `pwa-512x512.png` がmanifestで参照されているが、実ファイルが存在しなかった
- **修正**: SVGからPNGを生成して `public/` に配置

---

## 5. Key Decisions

### CSS変数 vs Tailwind dark: プレフィックス
- **決定**: CSS変数方式を採用
- **理由**: 18コンポーネント全てに `dark:` プレフィックスを追加するのは保守性が低い。CSS変数なら `:root` の定義を変えるだけで全体が切り替わる
- **トレードオフ**: インラインstyleが増えるが、一貫性と保守性を優先

### アイコンデザイン
- **決定**: 五角形レーダーチャート + オレンジグラデーション
- **理由**: ユーザー要望（ClaudeCodeライクなオレンジ、レーダーチャート/インフォグラフィックス）
- **カラー**: グラデーション `#F08C42` → `#D45828`

### PFCレーダーチャートの目盛り
- **決定**: 数値ラベル（50, 100, 150）を非表示、グリッド線は維持
- **理由**: ユーザー要望。グリッド線があれば相対的な位置関係は読み取れる

---

## 6. Lessons Learned

### iOSのPWA対応に必要なメタタグ
```html
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="apple-mobile-web-app-title" content="アプリ名" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
<link rel="apple-touch-icon" href="/path/apple-touch-icon.png" />
```

### PWA manifest変更後のiPhone対応
- マニフェストやアイコンを変更した場合、iPhoneではホーム画面のアイコンを一度削除して再追加が必要
- Service Workerのキャッシュも影響するため、`registerType: "autoUpdate"` が重要

### CSS変数のカラーシステム（iOS準拠）
```css
:root {
  --color-bg: #f2f2f7;        /* systemGroupedBackground */
  --color-card: #ffffff;       /* secondarySystemGroupedBackground */
  --color-label: #000000;      /* label */
  --color-secondary-label: rgba(60, 60, 67, 0.85);
  --color-tertiary-label: rgba(60, 60, 67, 0.5);
  --color-fill: rgba(120, 120, 128, 0.2);
  --color-separator: rgba(60, 60, 67, 0.12);
  --color-glass: rgba(255, 255, 255, 0.82);
}
```
ダークモードでは全て対応するiOSダークカラーに切り替え。

### sharp パッケージでのSVG→PNG変換
- Windows環境でも問題なく動作
- `density: 300` を指定してSVGを高解像度でレンダリングしてからリサイズすると品質が良い
- 一時的にインストール → 使用 → アンインストールのパターンで本番依存に含めない

---

## 7. Next Steps

### 未実装・改善候補
- [ ] 体重記録画面（`/weight` ルート）のボトムナビゲーションへの追加（現在は5タブ：ホーム、食事、水分、分析、設定）
- [ ] お気に入りメニュー機能の拡充（ワンタップ再入力）
- [ ] E2Eテスト（Playwright）の追加
- [ ] テストカバレッジ80%以上の達成（現在はservices/utilsのみ）
- [ ] コンポーネントテスト（@testing-library/react）の追加
- [ ] PWA動作検証（オフライン、Service Worker更新フロー）
- [ ] 食品データベースの拡充（現在は日本食品標準成分表ベース）

### 既知の技術的課題
- Chart.jsのCSS変数取得は `getComputedStyle` を使用しており、初回レンダリング時にダークモード切替が反映されない可能性がある（要検証）
- `weightWithEma.length > 0` で体重チャートを表示するが、1件だけだとLine chartが点のみになる

### デプロイ
- GitHub Pages: https://cafetemania.github.io/workingtime/
- GitHub Actions: `.github/workflows/deploy.yml` で `main` ブランチへのpush時に自動デプロイ

---

## 8. File Map

### コアファイル
| ファイル | 用途 |
|----------|------|
| `src/main.tsx` | エントリポイント、HashRouter設定 |
| `src/App.tsx` | ルーティング定義（/, /meals, /hydration, /charts, /settings, /onboarding） |
| `src/types/index.ts` | 全型定義（UserProfile, MealEntry, WeightEntry, PhaseInfo等） |

### サービス層（純粋関数）
| ファイル | 用途 |
|----------|------|
| `src/services/phaseCalculator.ts` | レース日までの日数でトレーニングフェーズ判定（6段階） |
| `src/services/pfcCalculator.ts` | PFC目標計算、日次栄養素集計、達成率算出 |
| `src/services/weightAnalyzer.ts` | 7日間EMA（指数移動平均）計算 |
| `src/services/adviceGenerator.ts` | フェーズ別デイリーアドバイス生成 |
| `src/services/nutrientCalculator.ts` | 食品→栄養素変換 |
| `src/services/storageService.ts` | localStorage CRUD操作 |
| `src/services/dataExporter.ts` | JSONエクスポート/インポート |

### フック
| ファイル | 用途 |
|----------|------|
| `src/hooks/useAppData.ts` | AppData Context（全画面で共有するデータアクセス） |
| `src/hooks/useTrainingPhase.ts` | フェーズ情報取得 |
| `src/hooks/useFoodSearch.ts` | 食品DB検索（前方一致+部分一致） |

### 画面コンポーネント
| ファイル | 用途 |
|----------|------|
| `src/components/dashboard/DashboardPage.tsx` | ホーム画面（カウントダウン、アドバイス、日次サマリー） |
| `src/components/meals/MealsPage.tsx` | 食事記録画面（食品検索、追加、お気に入り） |
| `src/components/hydration/HydrationPage.tsx` | 水分記録画面（プリセットボタン、進捗バー） |
| `src/components/charts/ChartsPage.tsx` | 分析画面（PFCレーダー、体重推移、週間PFC棒グラフ） |
| `src/components/settings/SettingsPage.tsx` | 設定画面（プロフィール、水分目標、データ管理） |
| `src/components/onboarding/OnboardingPage.tsx` | 初回設定（3ステップウィザード） |

### 設定
| ファイル | 用途 |
|----------|------|
| `vite.config.ts` | Vite設定、PWAマニフェスト定義 |
| `tailwind.config.js` | Tailwind設定、iOSカラートークン、ダークモード |
| `src/index.css` | グローバルCSS、CSS変数（ライト/ダーク）、共通コンポーネントクラス |
| `src/data/phaseConfig.ts` | トレーニングフェーズ別PFC設定・アドバイステンプレート |
| `src/data/foodDatabase.ts` | 食品データベース（日本食品標準成分表ベース） |

### Git コミット履歴
```
ce4fc99 feat: アイコンをオレンジ×レーダーチャートに刷新 + チャート改善
1401d7a feat: ダークモード対応 + iPhone PWAブラック画面修正
b1060e5 style: Apple風デザインにリニューアル
ef939ac feat: マラソンランナー向け栄養管理PWAアプリ初版
```
