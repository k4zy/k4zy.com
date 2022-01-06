---
title: "ブログ詳細画面にtagをつけた"
date: "20220106"
tags: ["diary"]
---

このブログには「日記」と「技術記事」と「その間の文章」を混ぜて書きたいのでタグをつけた。リンク先はないので週末に作業する。  
今回は雑な JSX と 素の CSS で書いたけどやっぱり手になじまないので、モバイルアプリの UI を組む感覚に近づけたいと思っている。[Chakra UI](https://chakra-ui.com/) が求めているものに近い感じがするのでこの三連休で入門したい。

```jsx
<ul id="tags">
  {post.tags.map((tag) => (
    <li className="tag" key={tag}>
      {tag}
    </li>
  ))}
</ul>
```

```css
#tags {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
}

.tag {
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 8px 8px 0;
  padding: 2px 6px;
  font-size: 0.6rem;
  font-weight: 700;
  list-style: none;
  border-radius: 6px;
  background: #eee;
}
```
