# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # 開発サーバー起動 (localhost:3000)
npm run build    # 本番ビルド
npm run lint     # ESLint実行
npm run today    # 今日の日付でブログ記事テンプレートを作成
```

## Architecture

Next.js 16 (Pages Router) を使用した個人ブログサイト。ESLint 9 flat config形式 (`eslint.config.mjs`)。

### ディレクトリ構成

- `content/` - ブログ記事 (Markdownファイル)
  - 各記事は `YYYY-MM-DD/index.md` の形式で配置
  - frontmatter: `title`, `date` (YYYYMMDD形式), `tags`
- `pages/` - Next.js ページ
  - `blog/[slug].tsx` - 記事詳細ページ (動的ルーティング)
- `libs/` - ユーティリティ
  - `contentResolver.ts` - 記事の読み込み・一覧取得
  - `markdownToHtml.ts` - Markdown→HTML変換 (unified/remark/rehype)
- `components/` - Reactコンポーネント

### データフロー

記事は `content/` から `gray-matter` でパースされ、`getStaticProps`/`getStaticPaths` でビルド時に静的生成される。Markdownは `unified` パイプラインでHTMLに変換される。

### パスエイリアス

`@/*` → プロジェクトルート (例: `@/libs/contentResolver`)
