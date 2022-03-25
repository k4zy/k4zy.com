---
title: "Github CopilotはAndroid開発でも使える"
date: "20220325"
tags: ["Android"]
---

<figure>
<a href="https://copilot.github.com/">
<img src="https://imgur.com/g7d6oYw.png" width=90% />
  <figcaption>GitHub Copilot</figcaption>
</a>
</figure>

モバイルエンジニアの間ではあまり話題に上がっているのを見かけないですが、最近 [Github Copilot](https://copilot.github.com/) を愛用している知り合いが増えてきました。自分も少し前に遊んでみたんですが Android 開発でもそれなりに動きそうです。

Github Copilot は自動生成されるコードの品質の差はあるものの任意の言語で動く仕組みになっているみたいで Java や Kotlin でも動きます。JetBrains のマーケットプレイスに公式プラグインが提供されているので以前から IntelliJ などの JetBrains 系の IDE でも動かせたんですが、Android 開発に限ると Android Studio の ベースとなっている IntelliJ のバージョンが古くて stable 版では使えませんでした。

[GitHub Copilot - IntelliJ IDEs Plugin | Marketplace](https://plugins.jetbrains.com/plugin/17718-github-copilot)

今年 stable に昇格した Android Studio Bumblebee から IntelliJ のバージョンが build 211.0 に上がったことで Copilot のプラグインが動くようになりました ✌️

Github Copilot が生成したコードのライセンスは怪しくて仕事で触っている規模の大きい Android プロジェクトではまだ動かせてないですが、補完の様子を見ると同一ファイル内のコードベースや Github に公開されているコードから自動生成されている雰囲気があり、ローカルの別のファイルに定義されているコンポーネントをいい感じに呼び出したりはやってなさそう挙動でした。Jetpack Compose を使った開発スタイルとは相性が良さそうなので Github Copilot が正式リリースされてライセンス問題がクリアになったら仕事でも使えると嬉しいですね。

<figure>
<img src="https://imgur.com/wydYrpV.png" width=90% />
  <figcaption>雑なコメントからコード生成されている例</figcaption>
</figure>
