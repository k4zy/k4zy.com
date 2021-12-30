---
title: "CLIでSVGをVectorDrawableに一括変換する"
date: "20200801"
tags: ["tech"]
---

## VectorDrawable とは

Android アプリではベクター形式の画像を扱うために[VectorDrawable](https://developer.android.com/guide/topics/graphics/vector-drawable-resources)という SVG とおおよそ互換のあるフォーマットをサポートしています。しかし VectorDrawable の出力をサポートしているデザインツールはほぼ無いためベクターデータをアプリ内で扱いたい場合には「デザインツールから SVG に書き出してもらう-> [Vector Asset Studio](https://developer.android.com/studio/write/vector-asset-studio)を利用して SVG を VectorDrawable に変換する」という手順を踏みます。  
Vector Asset Studio は Android Studio に組み込まれたツールで GUI ツールです。これは悩みの種で例えば複数のプラットフォーム間で共通利用しているアイコンセットがあった場合に、SVG が追加/変更されたら VectorDrawable も更新する仕組みを用意したいですが CLI サポートがないため通常は手作業になります。

## AOSP 内の非公式ツール

そんな折に非公式ですが自動化する手段を教えてもらったのですが下記はその紹介です。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">だいぶ前の情報なので今も参考になるかはわかりませんが、以前こういう方法でやっていたことはあります<a href="https://t.co/Dbs7sjbGKo">https://t.co/Dbs7sjbGKo</a></p>&mdash; こにふぁー (@konifar) <a href="https://twitter.com/konifar/status/1289071980642054144?ref_src=twsrc%5Etfw">July 31, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

教えて頂いた[IssueTracker](https://issuetracker.google.com/issues/37088253)の要点は

- Vector Asset Studio 自体は AOSP の一部として開発されているからソースコードにアクセスすることが出来る
- 実は`vd-tool`という CLI 用のコマンドが存在していて、自分でビルドすれば使える
- ただ今の所公式に提供するつもりはない

という話でした。2016 年に立てられた issue の情報のため今のレポジトリでは多少手順が変わっているのかなと思ってコードをチェックアウトして試してみたのですが、全く同じ手順でビルド出来ました。:tada:

## vd-tool をビルドする

まずは AOSP から AndroidStudio が開発されているブランチをチェックアウトします。`repo`コマンドの導入からまとめると下記のようなになります。(パスはお好みで)

```sh
# repoコマンドを使えるようにする
curl https://storage.googleapis.com/git-repo-downloads/repo > ~/bin/repo
chmod a+x ~/bin/repo
# studio-master-dev(Android Studioの開発ブランチ)をチェックアウトする
mkdir studio-master-dev
cd studio-master-dev
repo init -u https://android.googlesource.com/platform/manifest -b studio-master-dev
repo sync -c -j4 -q #4は並列数なのでお好みで
```

[Android Developer Tools - Checkout and build the source code](https://android.googlesource.com/platform/tools/base/+/studio-master-dev/source.md)

チェックアウトしたら vd-tool をビルドします.

```sh
cd tools/
./gradlew :base:vector-drawable-tool:distZip
```

## SVG を一括で変換する

ビルドが成功すると `$PROJECT_ROOT/out/build/base/vector-drawable-tool/build/distributions` に`vd-tool.zip`が生成されているので解凍して利用します。  
例えば下記のように実行すると`/your/icon/svg/`以下の svg をすべて VectorDrawable に変換して`/your/icon/vd`に配置してくれます。

```sh
bin/vd-tool -c -in /your/icon/svg -out /your/icon/vd
```

引数で width や height の指定も可能です。

```
Usage: [-c] [-d] [-in <file or directory>] [-out <directory>] [-widthDp <size>] [-heightDp <size>] [-addHeader]
Options:
  -in <file or directory>:  If -c is specified, Converts the given .svg file
                            to VectorDrawable XML, or if a directory is specified,
                            all .svg files in the given directory. Otherwise, if -d
                            is specified, displays the given VectorDrawable XML file
                            or all VectorDrawables in the given directory.
  -out <directory>          If specified, write converted files out to the given
                            directory, which must exist. If not specified the
                            converted files will be written to the directory
                            containing the input files.
  -c                        If present, SVG files are converted to VectorDrawable XML
                            and written out.
  -d                        Displays the given VectorDrawable(s), or if -c is
                            specified the results of the conversion.
  -widthDp <size>           Force the width to be <size> dp, <size> must be integer
  -heightDp <size>          Force the height to be <size> dp, <size> must be integer
  -addHeader                Add AOSP header to the top of the generated XML file
```
