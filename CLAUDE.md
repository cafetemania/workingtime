# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

マラソンランナー向け栄養管理PWAアプリ。React + TypeScript + Vite で開発。

## 基本方針

- 必ず日本語で応対する
- 調査やデバッグにはサブエージェントを活用してコンテキストを節約する
- 重要な決定事項は定期的にマークダウンファイルに記録する

## 技術スタック

- **フレームワーク**: React 18 + Vite
- **言語**: TypeScript
- **テスト**: Vitest + @testing-library/react
- **チャート**: Chart.js + react-chartjs-2
- **CSS**: Tailwind CSS v3
- **PWA**: vite-plugin-pwa
- **ルーティング**: React Router v6 (HashRouter)
- **デプロイ**: GitHub Pages

## 開発環境

- **プラットフォーム**: Windows 11

## コマンド

```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev

# テスト実行
npm test

# テスト（ウォッチモード）
npm run test:watch

# 単一テストファイル実行
npx vitest run src/services/phaseCalculator.test.ts

# カバレッジ付きテスト
npm run test:coverage

# 型チェック
npm run typecheck

# ビルド
npm run build
```

## コード規約

- TypeScript を使用
- テストは Vitest で書く
- コミットメッセージは日本語で簡潔に
- サービス層は純粋関数で実装
- 型定義は src/types/index.ts に集約
- イミュータブルなデータモデル（readonly）
