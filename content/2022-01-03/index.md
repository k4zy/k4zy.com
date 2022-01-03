---
title: "Fragment in Jetpack Compose は動くのか"
date: "20220103"
tags: ["diary"]
---

# 結論

動くが本番環境で使うのは怪しいと思っている

# Jetpack Compose

新しい Android アプリ向け UI キットである Jetpack Compose はこれまでの XML で構成されている View との高い相互運用性があります。
そのため既存の View に Compose を含めたり、画面の Compose で実装して一部に これまでの View を使いまわす実装が簡単に行えます。

<img src="" width=80% />

<figure>
<a href="https://youtu.be/7Mf2175h3RQ">
  <img
  src="https://i.imgur.com/kdLQ0AC.png"
  width="100%"
  alt="What's new in Jetpack Compose"/>
  <figcaption>What's new in Jetpack Compose | Youtube.com</figcaption>
</a>
</figure>

[相互運用 API  |  Jetpack Compose  |  Android Developers](https://developer.android.com/jetpack/compose/interop/interop-apis?hl=ja)

相互運用 API のドキュメントページを読むと、どちらの使い方もすぐ理解できると思いますが、このドキュメントには View を Compose に埋め込む方法は紹介されているものの、Fragment を Compose に埋め込むことについては推奨する/しないを含めて一切の記載がありません。

# Fragment in Jetpack Compose

試してみると意外にも普通に動きます。もちろん`FragmentContainerView`だけの XML を用意して `Inflate`する方法でも動きます。 `FragmentContainerView`を直接呼び出す際は `View.generateViewId` で ID 振りが出来ます。

```kotlin
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            ComposeFragmentSampleTheme {
                Surface(color = MaterialTheme.colors.background) {
                    FragmentContainer(
                        fragmentManager = supportFragmentManager,
                        fragment = MainFragment(),
                    )
                }
            }
        }
    }
}

@Composable
fun FragmentContainer(fragmentManager: FragmentManager, fragment: Fragment) {
    AndroidView(
        factory = { context ->
            FragmentContainerView(context).apply {
                id = View.generateViewId()
            }
        },
        modifier = Modifier.fillMaxSize(),
    ) {
        val transaction = fragmentManager.beginTransaction()
        transaction.replace(it.id, fragment)
        transaction.commit()
    }
}
```
