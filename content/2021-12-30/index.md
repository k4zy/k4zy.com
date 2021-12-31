---
title: "普通のブログを作りかた(2021)"
date: "20211230"
tags: ["tech", "diary"]
---

## 年の瀬

今年の仕事を納めて年末を迎えると暇な時間が増えて、簡単な創作活動をしたくなる。  
今年は全然アウトプットしてないことを負い目に感じていたので、ブログを書くモチベーションがアガるブログでも作ろうかとなった。期待値調整のために書いておくと恥ずかしながら**ほぼコピペプログラミング**で動いている。

## 技術スタック

例年奇妙な技術スタックを選んだ結果、ミドルウェアをたくさん自作する必要に駆られて途中で燃え尽きてしまうので、今年は [Next.js](https://nextjs.org/) と [Vercel](https://vercel.com) の 2021 年の安牌みたいな構成にした。

## 最初の構成: Next.js + MicroCMS

今年の春に会社のイベントで覚えたはずの Next.js の知識が消えていたので、「nextjs blog」で検索して手頃な記事を探して、検索結果の上位に microCMS さんの技術ブログを見つけた。microCMS は前から気になっていたのでこちらの記事のチュートリアルを参考にさせていただいた。

[microCMS + Next.js で Jamstack ブログを作ってみよう | microCMS ブログ](https://blog.microcms.io/microcms-next-jamstack-blog/)

こちらのチュートリアルを最後まで進めると、Next.js 製のブログが Vercel にアップロードされる所まで完成する。記事情報は microCMS の無料アカウントを作成してそちらから配信するようになっていた。

Headless CMS に初めて触ったので体験として楽しかったけれど、記事情報を WYSIWYG エディタで書く必要がある所に引っかかってしまった。Markdown の記法をいい感じに変換はしていくれるが素の Markdown がどこにも残らない所が気になってしまい、素直にレポジトリに Markdown を管理しようと方針を変えた。

ちなみに Cookpad の 2021 年春の学生向けインターシップのコンテンツが公開されていてこちらで Next.js が基礎から学べる。  
[Cookpad Online Spring Internship 2021 - YouTube](https://www.youtube.com/playlist?list=PLGT7Exkshx4ifQpZkjim4yJN52D00Ej3c)

## 今の構成: Next.js + ローカル Markdown

今度は 「Next.js markdown blog」で探してローカルの Markdown をデータソースにした仕組みが紹介されている下記のエントリを参考に書き換えた。

[Next.js で Markdown ブログを作る | tamalog](https://tamalog.szmd.jp/next-markdown-blog/)

microCMS から ローカルの Markdown にデーターソースを切り替えたことで、下書きの Preview が`npx next dev`で気軽に出来るようになって満足している。  
こちらのブログの別記事で `tsconfig.json` を使ったテクニックが紹介されていて、`@/{プロジェクトルートからの絶対パス}`で コンポーネントを import する方法も合わせて便利に使わせてもらっている。

```json
"baseUrl": "./",
"paths": {
  "@/*": ["src/*"]
}
```

## CSS スタイリング

元々簡素なブログにしたかったのだけど、特に [r7kamura.com](https://r7kamura.com/) のレイアウトが好きだったので GitHub のプロジェクトからコピペさせて頂いた。  
流石にそのままだと個性がないので好きな Web アプリや個人ブログを数件見て好みのスタイリングを真似させてもらった。

## コードハイライト

エンジニアブログなのでコードを貼る機会が多いと考えて、Remark(というか Unified) の拡張でコードハイライトを対応させた。
こちらの対応でもローカル Markdown 構成にする際に参考した tamalog さんの記事を参考にさせていただいた。Google 検索すると [remarkjs/remark-highlight.js](https://github.com/remarkjs/remark-highlight.js) を使った方法が紹介されている事が多いけれどこちらの方法は既に動かない。

[rehype-highlight で markdown にシンタックスハイライトを適用する | tamalog](https://tamalog.szmd.jp/rehype-highlight/)

## HTML in Markdown

自分は Markdown の中に HTML を埋め込み事が多いけれど、これまでの構成だと HTML は変換過程で削られてしまうので、[rehypejs/rehype-raw](https://github.com/rehypejs/rehype-raw) を導入して、Twitter の埋め込みなどが出来るようにした。

```js
const result = await unified()
  .use(remarkParse)
  .use(remarkRehype, { allowDangerousHtml: true }) // allowDangerousHtml も必要
  .use(rehypeRow)
  .use(rehypeHighlight)
  .use(rehypeStringify)
  .process(markdown);
```

## Google Analytics

どうせなら Google Analytics も入れておきたくなって記事を探したら丁寧なブログがあったのでこちらを真似させていただいた。

[Next.js で Google Analytics を使えるようにする - パンダのプログラミングブログ](https://panda-program.com/posts/nextjs-google-analytics)

## OGP

最後に Twitter 投稿の際にそれっぽい画像が表示されてほしいなと思って OGP 対応について調べた所 vercel が OGP 画像配信サーバーのテンプレートを提供しているみたいなので試した。

[vercel/og-image: Open Graph Image as a Service - generate cards for Twitter, Facebook, Slack, etc](https://github.com/vercel/og-image)

フルスクラッチを除くとこれを使うのが個人用途の中で柔軟性が高くて良いと思う。お昼に試した時は Vercel の Hobby プランの制限を誤解していて、EnterPrize アカウントしかホスティングできないと思って諦めたけれど `regions` と `memory` を Hobby プランの範疇に抑えるとちゃんとデプロイが成功した。 こちらも今度試してみたい。

```diff
diff --git a/vercel.json b/vercel.json
index f3686da..fb0e4ac 100644
--- a/vercel.json
+++ b/vercel.json
@@ -1,11 +1,9 @@
 {
-  "regions": ["all"],
+  "regions": ["iad1"],
   "functions": {
     "api/**": {
-       "memory": 3008
+       "memory": 1024
     }
   },
```

今日はとりあえず動くものが作りたかったので microCMS さんの API を通して[imgix](https://imgix.com/) という CDN サービスの文字合成 API を使って OGP 生成する方法を使った。

[imgix で動的画像・OGP を作成する | microCMS ブログ](https://blog.microcms.io/imgix-ogp/)

即席の割には結構それっぽいのが作れたので今日の所は満足しているけれど、日本語フォントの選択肢がほぼないのが残念だった。類似の機能を提供する [Cloudinary](https://cloudinary.com/)はカスタムフォントに対応しているみたいだけれど無料枠の利用ではレスポンスが返ってこないことも多いみたいなので見送った。

<img src="https://i.imgur.com/U3R2WcN.png" width=600 />

## LightHouse

> Reduce initial server response time

Next.js のおかげで [Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=ja) のスコアは何もしなくてもほぼ満点なんだけど初回読み込みが遅いよと言われてしまった。これは多分 Hobby プランでは東京リージョン(hnd1)ではなく米国東部リージョン(iad1)が使われるからだと思っている。今度 Pro プランにして初回読み込み速度が改善されるか確かめてみたい。

[Regions – Vercel Docs](https://vercel.com/docs/concepts/edge-network/regions)

## おわり

Next.js のエコシステムの人気のおかげでほとんど何も迷わず好みのブログが作れた。本当にすごい。後は継続的に記事を書くだけなのでいい感じに習慣化していきたい。

## レポジトリ

[k4zy/k4zy.com](https://github.com/k4zy/k4zy.com)
