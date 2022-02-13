---
title: "既存アーキテクチャにJetpackComposeを組み込む"
date: "20220208"
tags: ["android"]
---

## Android 版のレシピアプリについて

クックパッドでは VIPER アーキテクチャをベースとした設計方針で実装しています。VIPER とはレイヤードアーキテクチャの一つで、View(Activity や Fragment), Interactor(ビジネスロジック), Presenter(ビューロジック), Entities(ビュー用に変換されたデータオブジェクト), Routing(画面遷移処理) の層に実装を整理するアーキテクチャです。VIPER アーキテクチャ の詳細については[2020 年のクックパッド Android アプリのアーキテクチャ事情 - クックパッド開発者ブログ](https://techlife.cookpad.com/entry/2020/11/17/110000)を御覧ください。この記事では注釈がない限り社内で採用している設計のことを VIPER アーキテクチャと呼びます。

## Jetpack Compose を既存のアーキテクチャに組み込む

アーキテクチャの特性によって View を XML から Jetpack Compose に乗り換えられる事が難しい場合があります。これは Jetpack Compose がこれまでの Android View と比べて手続き的な UI の更新が苦手なためです。VIPER では「ライフサイクルイベントやユーザー操作を Presenter が受け取り、Presenter が Interactor に問い合わせた情報を元に View を更新する」というフローで設計しますが、前述の通り Jetpack Compose は状態を外部から手続き的に書き換えることが得意でないため、VIPER の良いところは残しつつ Jetpack Compose が監視する"状態"を更新することで UI に反映させる設計に切り替える必要がありました。

## 新しいアーキテクチャの変更点

これまで View,Interactor,Presenter,Entities,Routing を登場人物としてきましたが、Presenter を廃止し ViewModel を新たに採用しました。 ViewModel では Jetpack Compose が監視する状態を管理したり、これまで Presenter の役割だった Interactor や Routing とのやり取りを ViewModel に担当させています。

## View レイヤーについて

Jetpack Compose で実装する場合も Activity か Fragment を土台として用意しています。これは現在のレシピアプリの画面遷移実装の制約ですが、将来的には Jetpack Navigation を利用することで不要になる可能性があります。 最上位のコンポーネントは Screen-suffix をつけ引数には ViewModel を渡すようにしています。Jetpack Compose のコンポーネントの管理や設計については [モバイルアプリ開発において宣言的 UI フレームワークを利用する際のコンポーネント粒度についての考察 - クックパッド開発者ブログ](https://techlife.cookpad.com/entry/2021/12/17/103000) を御覧ください。

```kotlin
// Activity
@AndroidEntryPoint
class SampleActivity : ComponentActivity() {
    @Inject
    lateinit var viewModelFactoryProvider: ViewModelFactoryProvider<SampleModel>

    private val viewModel: SampleViewModel by viewModels { viewModelFactoryProvider }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { SampleScreen(viewModel) }
    }
}

// Fragment
@AndroidEntryPoint
class SampleFragment : Fragment() {
    @Inject
    lateinit var viewModelFactory: ViewModelFactoryProvider<SampleViewModel>

    private val viewModel: SampleViewModel by viewModels { viewModelFactory }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        return ComposeView(requireContext()).apply {
            setViewCompositionStrategy(
                ViewCompositionStrategy.DisposeOnLifecycleDestroyed(viewLifecycleOwner)
            )
            setContent {
                SampleScreen(viewModel)
            }
        }
    }
```

## ViewModel

ViewModel の実体として `androidx.lifecycle.ViewModel` を利用しています。画面の状態は `_screenState` に可能な限りまとめる方針をとっていますが、画面の描画のライフサイクルとは独立したタイミングで"状態"を更新したい場合(例えばアプリ内通知など)には別に StateFlow を管理しています。

```kotlin
class SampleViewModel @Inject constructor(
    private val interactor: SampleContract.Interactor,
    private val routing: SampleContract.Routing,
) : ViewModel(), SampleContract.ViewModel {
    private val _inAppNotificationCount = MutableStateFlow(0)
    private val _screenState = MutableStateFlow<ScreenState>(ScreenState.Loading)

    override val inAppNotificationCount = _inAppNotificationCount.asStateFlow()
    override val screenState = _screenState.asStateFlow()
```

## Rx から Coroutines への移行

これまで各レイヤーのインターフェースとして RxJava を利用していましたが、Jetpack Compose との相性や最近の Jetpack ライブラリの状況を鑑みて Kotlin Coroutines に変更しました。これまでの RxJava で書かれたコードベースも利用するために[kotlinx.coroutines/reactive/kotlinx-coroutines-rx2](https://github.com/Kotlin/kotlinx.coroutines/tree/master/reactive/kotlinx-coroutines-rx2) で相互変換させています。
