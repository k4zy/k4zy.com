---
title: "自作キーボードについて僕が知っていること"
date: "20221130"
tags: ["diary"]
---

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">別にハマったわけじゃないけど作ったよ <a href="https://t.co/iFzCoKAg8z">pic.twitter.com/iFzCoKAg8z</a></p>&mdash; k4zy (@_k4zy) <a href="https://twitter.com/_k4zy/status/1596538277976166400?ref_src=twsrc%5Etfw">November 26, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

自作キーボードについて関心を持ち、調べたり作ったりして一週間くらい経ったので初心者が理解したことを残したいと思う。

### 入門向けキットに触れる

自作キーボードについて何も知らないので一連の工程を経験するために入門向けキットを買った。

[meishi2 キット - 遊舎工房](https://shop.yushakobo.jp/products/834)

<blockquote class="imgur-embed-pub" lang="en" data-id="a/vpG8LS8" data-context="false" ><a href="//imgur.com/a/vpG8LS8"></a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

このキットを組み立てるには半田付けが必要になるので組み立てガイドに従って工具を揃える必要がある。紹介されている工具を揃えると 7000 円程かかるがダイソーなどで揃えることもできるらしい。  
このキットを組み立てると大体雰囲気が掴めた。まずキーボードを構成する部品は

- PCB と呼ばれるプリント基盤
- 信号を制御するマイコン(多くの場合に Pro micro が使われる)
- キースイッチ
- 抵抗
- キーキャップ

の 5 つが最小構成になる。実用的なキットにはこれに加えてケースやスタビライザーなどが付属する。

### 半田付けは意外に難しくない

自作キーボードの敷居の高さは「半田付け」だったけれど半田付けは難しくないことがわかった。自作キーボードにおける半田付け作業はマイコンと抵抗、キースイッチを PCB に接続するために行う。
マイコンの半田付けは結構間隔が狭いため少し戸惑うが丁寧にやれば初心者でもミスなくできる。キースイッチと抵抗の半田付けは実用的なキーボードになれば量は多いがそれぞれは間隔が広いためまずミスらないのでワールドカップを観ながらのんびりやるといいと思う。  
また人気のキットの多くはキースイッチを PCB に半田付けせず付け替え可能にするホットスワップと呼ばれる機構が採用されていることが多い。この場合 PCB にキースイッチをはめ込むソケットを代わりに半田付けすることになり、この場合は少し半田付けが難しくなる。

### ファームウェアの書き込みも難しくない

半田付けを終えた基盤は USB でパソコンに接続してファームウェアを書き込む必要がある。一昔前は Docker とかを使っていたイメージがあったが今は WEB アプリで完結するようになっている。そのためこの工程も全く難しくない。

### 初めての自作キーボードを組み立てる

一つ目の本格的なキーボードを作る際は一式必要となるので可能ならば自作キーボードの専門店で相談しながら揃えると良いと思う。都内だと遊舎工房が御徒町駅の近くにある。  
お店にはいくつかのキーボードキットが売っているので店員さんと相談して初心者向けのキットを選ぶといいと思う。キットにはキースイッチとキーキャップは基本付属しないのでお店にある無数の商品から好みのものを選ぶことができる。  
初心者向けのキットの基準は LED 無し、ホットスワップ未対応のもので自分は Corne Cherry Light をお薦めしてもらって買った。Corne Cherry Light は組み立てるのは非常に簡単なんだけど、40%レイアウトかつ左右分離型のカラムスタッガードなのでクセは強い。実際にお店に行って店員さんと話せたことでキーキャップの規格やキー配置について新しく教えてもらった。詳しくは専門的な記事を読んで欲しい。

- [キーキャップの素材と形状まとめ - Sansan Tech Blog](https://buildersbox.corp-sansan.com/entry/2019/08/16/110000)
- [自作キーボードにおける様々なキーレイアウトの話 - 自作キーボード温泉街の歩き方](https://salicylic-acid3.hatenablog.com/entry/key-layout)

自作キーボードと言えば分離型の印象があったが分離型はキー配置が縦に揃っているカラムスタッガードを採用しているモデルが多い。実際に使ってみるとキーが縦に揃っているのは慣れるまでかなりミスタイプが起こると思う。初日はまずタップタイピングで使いこなすことはできないと思うので購入する際は留意して欲しい。
