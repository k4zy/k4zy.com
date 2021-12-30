---
title: "普通のブログを作りかた(2021)"
date: "20211230"
tags: ["tech", "diary"]
---

## 年の瀬

今年の仕事を納めて年末を迎えると暇な時間が増えて、簡単な創作活動をしたくなる。  
今年は全然アウトプットしてないことを負い目に感じていたので、ブログを書くモチベーションがアガるブログでも作ろうかとなった。ちなみに期待値調整のために書いておくと**ほぼコピペプログラミング**です。

## 技術スタック

例年奇妙な技術スタックを選んだ結果、ミドルウェアをたくさん自作する必要に駆られて途中で燃え尽きてしまうことが多いので、今年は [Next.js](https://nextjs.org/) と [Vercel](https://vercel.com) の 2021 年の安牌みたいな構成にした。

## 最初の構成: Next.js + MicroCMS

今年の春に会社のイベントで覚えたはずの Next.js の知識は消えていたので、「nextjs blog」で検索して手頃な記事を探して、検索結果の上位に microCMS さんの技術ブログを見つけた。microCMS は前から気になっていたのでこちらの記事のチュートリアルを参考にさせていただいた。

[microCMS + Next.js で Jamstack ブログを作ってみよう | microCMS ブログ](https://blog.microcms.io/microcms-next-jamstack-blog/)

こちらのチュートリアルを最後まで進めると、Next.js 製のブログが Vercel にアップロードされる所まで完成する。記事情報は microCMS の無料アカウントを作成してそちらから配信するようになっていた。

Headless CMS に初めて触ったので体験として楽しかったんだけれど、記事情報を WYSIWYG エディタで書く必要がある所に引っかかってしまった。Markdown の記法をいい感じに変換はしていくれるが素の Markdown がどこにも残らない所が気になってしまい、素直にレポジトリに Markdown を管理しようと方針を変えた。

## 今の構成: Next.js + ローカル Markdown

今度は 「Next.js markdown blog」で探してみた所、いい感じの個人ブログが見つかったのでこちらを参考にさせていただいた。

[Next.js で Markdown ブログを作る | tamalog](https://tamalog.szmd.jp/next-markdown-blog/)

microCMS から ローカルの Markdown にデーターソースを切り替えたことで、下書きの Preview が`npx next dev`で気軽に出来るようになってとても満足してる。  
こちらのブログの別記事で `tsconfig.json` の設定が紹介されていて、`@/{プロジェクトルートからの絶対パス}`で コンポーネントを import 出来るテクニックが紹介されていて便利に使わせてもらっている。これは一般的なテクニックなのか気になっている。

```json
"baseUrl": "./",
"paths": {
  "@/*": ["src/*"]
}
```

## CSS スタイリング

元々簡素なブログにしたかったんですが、特に [r7kamura.com](https://r7kamura.com/) のレイアウトが好きだったので GitHub のプロジェクトから拝借させていただいた。(ありがとうございます)  
流石にそのままだと個性がないので国内外のエンジニアの個人ブログを数件見て好みのスタイリングを真似させてもらった。

## コードハイライト

エンジニアブログなのでコードを貼る機会が多いと考えて、Remark(利用している Markdown パーサー的なもの) の拡張でコードハイライトを対応させた。
こちらの対応でもローカル Markdown 構成にする際に参考した tamalog さんの記事を参考にさせていただいた。Google 検索すると [remarkjs/remark-highlight.js](https://github.com/remarkjs/remark-highlight.js) を使った方法が紹介されている事が多いけれどこちらの方法は既に動かない。

[rehype-highlight で markdown にシンタックスハイライトを適用する | tamalog](https://tamalog.szmd.jp/rehype-highlight/)

## HTML in Markdown

自分は Markdown の中に HTML を埋め込み事が多いんだけど、これまでの構成だと HTML は変換過程で削られてしまうので、[rehypejs/rehype-raw](https://github.com/rehypejs/rehype-raw) を導入して、Twitter の埋め込みなどが出来るようにした。

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

Google Analytics も入れておきたくなって記事を探したらとても丁寧なブログがあったのでこちらを真似させていただいた。

[Next.js で Google Analytics を使えるようにする - パンダのプログラミングブログ](https://panda-program.com/posts/nextjs-google-analytics)

## OGP(まだ)

もう自分の中では完成のつもりなんだけど、Twitter 投稿の際にいい感じに画像が表示されてほしいなと思って OGP 対応について調べた。
vercel がいい感じの OGP 画像サーバーの雛形を提供しているみたいなので明日いい感じにしたい。

- [vercel/og-image: Open Graph Image as a Service - generate cards for Twitter, Facebook, Slack, etc](https://github.com/vercel/og-image)

## LightHouse

> Reduce initial server response time

Next.js のおかげで [Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=ja) のスコアは何もしなくてもほぼ満点なんだけど初回読み込みが遅いよって言われてしまったので、定石の対応方法があったら知りたいなと思ってる。

## おわり

Next.js のエコシステムの人気のおかげでほとんど何も迷わず好みのブログが作れた。これは本当にすごい。後は継続的に記事を書くだけなのでいい感じに習慣化していきたいと思います。

## レポジトリ

[k4zy/k4zy.com](https://github.com/k4zy/k4zy.com)
