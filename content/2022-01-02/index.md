---
title: "TV用サウンドバーの非効率な活用方法"
date: "20220102"
tags: ["diary"]
---

この文章は思いついたままに書いています。

# Sonos Beam

家に数年前に購入した [Sonos Beam](https://www.sonos.com/ja-jp/shop/beam.html) という商品があります。これはサウンドバー/シアターバーと呼ばれるカテゴリの商品で、テレビと繋ぐことでスピーカーとして機能します。
テレビについてるスピーカーの性能は様々ですが、安価なモデルを買うと昔のラジオみたいな場合があり、音質が気に入らない人がこういう機材を接続します。

<figure>
  <img
  src="https://www.sonos.com/ja-jp/photo/contents_block/goods_contents_1_1_BEAM2JP1/beam-gen2-living-credenza-nature-black.jpg"
  width="80%"
  alt="Sonos Beam"/>
  <figcaption>[Beam (Gen 2) | Sonos(ソノス)</figcaption>
</figure>

# サウンドバー微妙説

映画が好きだったりするとサウンドバーは魅力的な商品にみえるんですが、実際に使ってみると体験が微妙なことが多いんです。残念な点は主に二つあって、一つは立ち上がりが遅く起動後数秒間音声が出ないこと、もう一つは音量調整に大きなラグがある点です。  
こういう振る舞いは多くのサウンドバーが HDMI の ARC(eARC) を使った接続なためだと思っています。(規格についてまともに調べたことはないので普通に間違っている可能性があります)  
HDMI は本来映像と音声をディスプレイに送る経路として動きますが、ARC(Audio Return Channel) はディスプレイ側から表示している映像の音声を別の機器に送るための経路して動きます。  
ARC には良い点もあって、HDMI ケーブルと繋ぐだけですぐ動くので誰でも使える上に、最近のテレビには大抵 ARC 対応端子が用意されているので幅広いテレビで利用できます。

# 使わなくなったサウンドバーの処遇

結局前述した不満点がどうしても気になったのと、テレビを買い替えたらまともなスピーカーが付いていたので、 Sonos Beam はテレビの下から部屋の隅に場所を変えました。  
一年ぐらい経った今年の 10 月に作業デスク環境を変えたんですがその時に部屋の隅にいる Sonos Beam を活用してあげられるんじゃないかと急に思いついて調べてみることにしました。

# ARC 対応端子はテレビにしかない

サウンドバーの中には ARC 未対応のテレビでも使えるように光デジタル端子やステレオミニプラグが使えるものもありますが、 Sonos Beam には HDMI 端子しかありません。そして ARC 対応端子がテレビ以外のディスプレイに付いていることは稀で 現在国内向けに 発売されている 主要な PC 向けディスプレイは全て未対応です。  
じゃあテレビ以外で Sonos Beam は使えないとなるわけですが、実はこの製品にはとても奇妙な付属品があって、光端子を HDMI に変換するケーブルが付属しています。これをつかうとなんだか Mac/PC と接続できそうな期待が生まれます。

<figure>
  <a href="https://www.sonos.com/en-us/shop/optical-audio-adapter">
  <img
  src="https://media.sonos.com/images/znqtjj88/production/ed86978e2f4d10e9a1044cf9d023cd21418f43a7-1920x345.png?w=1920&q=75&fit=clip&auto=format"
  width="80%"
  alt="Sonos Optical Audio Adapter"/>
  <figcaption>Sonos Optical Audio Adapter</figcaption>
  </a>
</figure>

# USB から 光デジタル出力

大抵の Mac/PC には光デジタル出力はないので、USB から光デジタル出力出来る商品が欲しくなります。 そういうニッチな商品は探すと意外とあります。

<figure>
<a href="https://www.amazon.co.jp/gp/product/B07ZT1WCFT?ie=UTF8&psc=1&linkCode=li3&tag=amad06-22&linkId=82b1131763eaf00c46911e0a0b78e129&language=ja_JP&ref_=as_li_ss_il" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07ZT1WCFT&Format=_SL250_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=amad06-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=amad06-22&language=ja_JP&l=li3&o=9&a=B07ZT1WCFT" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
  <figcaption>REIYIN DA-DD 192kHz 24BitハイレゾUSB-DAC DDC</figcaption>
</figure>

これを買ってみたんですが、結論から言うと使えませんでした。なぜか接続しても Sonos Beam 側が認識しません。ここで初めてネットで調べ始めたんですがあまりにニッチ過ぎて日本語の情報はありませんでした。 検索ワードを英語に変換して調べてみると下記のスレッドが見つかりました。  
(これは余談ですが、光デジタル出力を英語で調べる場合 Optical Out や S/PDIF などの単語を使います。後者は Sony Philips Digital InterFace という規格を策定した企業の名前が使われています)

[Sonos Beam (with 2 OneSL as Surround) as PC speakers | Sonos Community](https://en.community.sonos.com/home-theater-228993/sonos-beam-with-2-onesl-as-surround-as-pc-speakers-6849218)

このスレッドを読むと光デジタル出力なら何でも良いわけではないらしく、Dolby 5.1 で出力された場合のみ Sonos Beam に認識される仕様が存在するようです。  
Dolby 5.1 出力 ができるデバイスはライセンス契約が必要な都合で本格的なオーディオ機器しかなくて、それらの機器は多くの場合で Sonos Beam より高価です。安くはないですがこのスレッドでも成功報告のある ゲーミング用 DAC の Sound Blaster X3 は国内の家電量販店でも手に入るため、今回はこちらを買いました。

<figure>
<a href="https://www.amazon.co.jp/Blaster-X-Fi%E6%90%AD%E8%BC%89USB-PC%E3%81%A7%E6%9C%80%E5%A4%A77-1ch%E5%86%8D%E7%94%9F-Switch%E5%AF%BE%E5%BF%9C-SB-X-3/dp/B07XSMV9RX?&linkCode=li3&tag=amad06-22&linkId=2ad9354b96d913e1c5a39b3e47f8ddf5&language=ja_JP&ref_=as_li_ss_il" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07XSMV9RX&Format=_SL250_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=amad06-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=amad06-22&language=ja_JP&l=li3&o=9&a=B07XSMV9RX" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
  <figcaption>Sound Blaster X3</figcaption>
</figure>

Sound Blaster X3 の設定ソフトウェアは品質が低くバグもありますがどうにか出力を Dolby 5.1 に切り替えると Sonos Beam に認識されるようになり、Mac/Win どちらでも無事に動作しました。

# 終わり

これは去年の話なんのですが久々にデバイス周りで消耗したのでなんとなく文字にして供養しました。 同じ消耗にぶつかった人に届くと幸いです。
