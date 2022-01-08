---
title: "meta タグ用にプレインテキストを出力した"
date: "20220108"
tags: ["diary", "tech"]
---

HTML の meta タグには `description`や`og:description`が用意されていて、これを埋めておくと OGP が展開された際にブログの冒頭部分などを表示させることが出来る。このブログの今までの実装だと HTML しか渡していないため `description` を埋めることが出来なかったが、 unified を使ってプラインテキストも返すようにした。  
このブログは markdown で書いた原文を [unified](https://github.com/unifiedjs/unified) というライブラリで HTML に変換してこのブログは表示している。unified には `remark`, `rehype`, `retext` の３つの処理系統があり組み合わせることで、markdown と HTML と plainText を相互変換できる。`retext` は主に plainText の処理系で自然言語の文法チェックなどの機能を追加するために用意されている。残念ながら日本語の文法チェックはわかり書きするだけでも大変なので、retext のプラグインにはない。今回はプレインテキストが欲しいだけなので、何もプラグインを通さずにテキスト出力するために利用させてもらった。

[retextjs/retext: natural language processor powered by plugins part of the @unifiedjs collective](https://github.com/retextjs/retext)

```ts
export const markdownToText = async (markdown: string) => {
  const result = await unified()
    .use(remarkParse)
    .use(retextStringify)
    .process(markdown);
  return result.toString();
};
```
