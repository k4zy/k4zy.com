---
title: "RxJavaが好きな人のためのKotlin Coroutines"
date: "20220130"
tags: ["diary", "tech"]
---

RxJava は個人的に好きなライブラリの一つですが、Android 開発ではその役割が Kotlin Coroutines に置き換わることに疑いはないでしょう。  
これまでに Kotlin Coroutines を理解しようとして何度もドキュメントや資料を読んだ経験はありますが、とりあえず書けるようにはなるものの、どこか腑に落ちない理解で止まってました。これは Kotlin Coroutines が複雑なデザインで、他言語の async/await(主に JS) とあまりにも振る舞いが違うためだと思っています。  
昨日の夜に N 度目の初学者向けの解説記事を読み漁る行為をしていたら、今回はある程度腑に落ちる所まで理解した(気持ちになった)ので RxJava が好きな人向けに比較しながら紹介します。

## delay から Kotlin Coroutines を理解する

最初に Kotlin Coroutines がどういう仕組みで動いているのか理解します。つまり Kotlin Coroutines が特別な仕組みではなくこれまで触れてきた JVM 上のスレッドプログラミングで動いていることをちゃんと理解することで扱い方が大体わかってきます。

```kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent(...)
        lifecycle.coroutineScope.launch {
            delay(1000)
            Log.d(TAG, "1000 ms delayed")
        }
    }
}
```

一番簡単なサンプルコードから理解しましょう。このコードは UI スレッドをブロックせずに 1000ms 後にログを吐くことが出来ます。  
`launch` に渡されたブロックはどこで動いているでしょうか？ 正解は UI スレッドです。ではなぜ UI スレッドをブロックせずに 1000ms の delay が実行できるのか考えます。

```kotlin
public suspend fun delay(timeMillis: Long) {
    if (timeMillis <= 0) return // don't delay
    return suspendCancellableCoroutine sc@ { cont: CancellableContinuation<Unit> ->
        // if timeMillis == Long.MAX_VALUE then just wait forever like awaitCancellation, don't schedule.
        if (timeMillis < Long.MAX_VALUE) {
            cont.context.delay.scheduleResumeAfterDelay(timeMillis, cont)
        }
    }
}
```

これが delay 関数の中身です。`suspendCancellableCoroutine`が何かは一度置いておいて、delay の実体は `scheduleResumeAfterDelay`です。

```kotlin
override fun scheduleResumeAfterDelay(timeMillis: Long, continuation: CancellableContinuation<Unit>) {
    val block = Runnable {
        with(continuation) { resumeUndispatched(Unit) }
    }
    handler.postDelayed(block, timeMillis.coerceAtMost(MAX_DELAY))
    continuation.invokeOnCancellation { handler.removeCallbacks(block) }
}
```

`scheduleResumeAfterDelay` の実装はプラットフォーム毎に異なりますが上記のコードは Android 環境(`kotlinx.android.coroutines`)のものです。これを見れば Android 開発者であれば察しがつくかと思いますが、最初のコードで UI スレッドのみで 1000ms の delay 処理が実現できたのは単に `Handler#postDelayed` を内部で呼び出していたためでした。  
ここまでで把握しておくことは、Kotlin Coroutines は特殊な仕組みで非同期処理を実現しているわけではないことと、 `delay(1000)` を `Thread.sleep(1000)` に置き換えたら コルーチンスコープ内でも普通に UI スレッドがブロックされ画面が固まることを確信できることです。

## suspend 修飾子を理解する

[The suspend modifier — under the hood | by Manuel Vivo | Android Developers | Medium](https://medium.com/androiddevelopers/the-suspend-modifier-under-the-hood-b7ce46af624f)

Kotlin Coroutines では `susped` 修飾子が使われますが、これがコンパイラにどのように解釈されるのかという話が上記の記事で詳しく紹介されています。  
詳細は記事を読んで頂くのが一番ですが、重要なポイントは返り値は削除され`Continuation`によるコールバックスタイルに変換されることです。  
コンパイラに suspend 関数がどう扱われているのか完璧に理解する必要がないと思いますが大雑把でも知っておくと挙動の理解が深まると思います。

```kotlin
//変換前
suspend fun loginUser(userId: String, password: String): User {
  val user = userRemoteDataSource.logUserIn(userId, password)
  val userDb = userLocalDataSource.logUserIn(user)
  return userDb
}

//返り値が削除されContinuationに変換されたもの
fun loginUser(userId: String, password: String, completion: Continuation<Any?>) {
  val user = userRemoteDataSource.logUserIn(userId, password)
  val userDb = userLocalDataSource.logUserIn(user)
  completion.resume(userDb)
}
```

## CoroutinesScope

[ライフサイクル対応コンポーネントで Kotlin コルーチンを使用する | Android Developers](https://developer.android.com/topic/libraries/architecture/coroutines?hl=ja)

Jetpack がライフサイクル対応された CoroutinesScope を提供しているので、Android アプリプログラミングでは基本的にこれらの Scope を使って Kotlin Coroutines を実行します。

```kotlin
// LifecycleScope
class MyFragment: Fragment() {
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewLifecycleOwner.lifecycleScope.launch {
        }
    }
}

// ViewModelScope
class MyViewModel: ViewModel() {
    init {
        viewModelScope.launch {
        }
    }
}
```

これらの `CoroutinesScope` は 実行環境が `Dispatchers.Main.immediate` になっているので Dispacher を上書きしなければ UI スレッドで動きます。

```kotlin
// Lifecycle.kt
public val Lifecycle.coroutineScope: LifecycleCoroutineScope
    get() {
        while (true) {
            val existing = mInternalScopeRef.get() as LifecycleCoroutineScopeImpl?
            if (existing != null) {
                return existing
            }
            val newScope = LifecycleCoroutineScopeImpl(
                this,
                SupervisorJob() + Dispatchers.Main.immediate
            )
            if (mInternalScopeRef.compareAndSet(null, newScope)) {
                newScope.register()
                return newScope
            }
        }
    }

// ViewModel.kt
public val ViewModel.viewModelScope: CoroutineScope
    get() {
        val scope: CoroutineScope? = this.getTag(JOB_KEY)
        if (scope != null) {
            return scope
        }
        return setTagIfAbsent(
            JOB_KEY,
            CloseableCoroutineScope(SupervisorJob() + Dispatchers.Main.immediate)
        )
    }
```

## CoroutineDispatcher

RxJava では実行環境を Scheduler で決定していましたが、Coroutines では Dispacher がとても似た役割を果たします。 種類は 4 つあります。

- Dispatchers.Main
  - UI スレッド、RxJava の`AndroidSchedulers.mainThread()`相当
- Dispatchers.Default
  - RxJava の`Schedulers.computation()`相当
- Dispatchers.IO
  - RxJava の`Schedulers.io()`相当
- Dispatchers.Unconfined
  - CoroutineContext に Dispacher が指定されてない場合のデフォルト値。呼び出しスレッドでコルーチンが動作する
  - 基本使わないらしい

RxJava と感覚が違う点として、 RxJava のストリームは Scheduler の指定がなければ呼び出しスレッドで動作しますが、Kotlin Coroutines の実行環境は CoroutineContext に依存しているため`Dispatchers.Unconfined`でない限り呼び出しスレッドと無関係に動作します。

## 読むと良さそうな資料

ここまでの内容を把握していると大体メンタルモデルは出来上がっていると思うので、あとは知らない単語を必要に応じて調べるとか Scope の依存関係や SupervisorJob や CoroutineContext などに調べると理解が深まると思います。

- [Kotlin のコルーチンと Flow に関する参考情報 | Android Developers](https://developer.android.com/kotlin/coroutines/additional-resources?hl=ja)
- [詳細 CoroutineContext | by Kenji Abe | Medium](https://star-zero.medium.com/%E8%A9%B3%E7%B4%B0coroutinecontext-c9a055bdd52c)
