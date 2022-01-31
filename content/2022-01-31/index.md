---
title: "Jetpack DataStore を仕事で使った"
date: "20220131"
tags: ["tech"]
---

Jetpack DataStore は、去年 Stable になったライブラリの一つで `SharedPreferences` を置き換えるように設計されています。protocol buffers で任意の型を保存できる `Proto DataStore` もありますが、今回はプリミティブ型を格納する`Preferences DataStore` を使いました。

[DataStore | Android Developers](https://developer.android.com/jetpack/androidx/releases/datastore?hl=ja)

公式ブログの方で SharedPreferences との比較表があって、Jetpack DataStore があたかも優れているように紹介されています。正直 Jetpack DataStore をあえて利用したい気持ちはないですが、将来的に SharedPreferences を置き換えたい計画があるみたいなので、新規で Key-Value Store みたいなものが使いたくなった時は Jetpack DataStore を利用するのが無難かもしれません。

<figure>
<img src="https://3.bp.blogspot.com/-Vk_q5hWw6DQ/X00ZfiRrB9I/AAAAAAAAPlo/u-kvBvmMfzgRnNViYLwaAim-E7wq5yxKACLcBGAsYHQ/s1600/Screen%2BShot%2B2020-08-31%2Bat%2B11.25.43%2BAM.png" width=800 />
  <figcaption>SharedPrefとDataStoreの比較表</figcaption>
</figure>

[Android Developers Blog: Prefer Storing Data with Jetpack DataStore](https://android-developers.googleblog.com/2020/09/prefer-storing-data-with-jetpack.html)

## 読み込みと書き込み

```kotlin
// データストアへのアクセス
private val Context.dataStore by preferencesDataStore(name = "debug_data_store")

// 読み込み
val key = booleanPreferencesKey("key")
val value: Flow<Boolean> = context.dataStore.data.map { it[key] ?: false }

// 書き込み
val key = booleanPreferencesKey("key")
context.dataStore.edit { it[key] = isEnabled }
```

読み込みや書き込みの型の指定は key の定義で伝えるインターフェースになっています。

- `intPreferencesKey`
- `doublePreferencesKey`
- `stringPreferencesKey`
- `booleanPreferencesKey`
- `floatPreferencesKey`
- `longPreferencesKey`
- `stringSetPreferencesKey`

書き込みは suspend 関数になっていて、読み込みは `Flow` で返ってきます。どうしても suspend 関数や `Flow` の形が扱いづらかったら `runBlocking` で囲んで同期的に処理する方法が公式に紹介されています。  
これまで Flow で返ってくる API にあんまり馴染みがなかったんですが、Jetpack Compose を View に使っている場合は Flow で受け取って `collectAsState(defaultValue)` で State に変換できるので比較手に扱いやすかったです。
