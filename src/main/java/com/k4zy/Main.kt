package com.k4zy

import com.vladsch.flexmark.ext.anchorlink.AnchorLinkExtension
import com.vladsch.flexmark.ext.gfm.strikethrough.StrikethroughExtension
import com.vladsch.flexmark.ext.tables.TablesExtension
import com.vladsch.flexmark.ext.toc.TocExtension
import com.vladsch.flexmark.html.HtmlRenderer
import com.vladsch.flexmark.parser.Parser
import com.vladsch.flexmark.util.ast.Node
import com.vladsch.flexmark.util.data.MutableDataSet
import java.net.URL
import java.nio.charset.StandardCharsets
import java.nio.file.Files
import java.nio.file.Paths

fun main(@Suppress("UNUSED_PARAMETER") args: Array<String>) {
    val options = MutableDataSet().apply {
        set(
            Parser.EXTENSIONS,
            listOf(
                AnchorLinkExtension.create(),  // 見出しにアンカーを付ける
                StrikethroughExtension.create(),  // 打ち消し線に対応
                TablesExtension.create(),  // テーブルに対応
                TocExtension.create() // [TOC] の部分に目次を生成する
            )
        )
    }
    val parser: Parser = Parser.builder(options).build()
    val renderer = HtmlRenderer.builder(options).build()

    val url: URL = Main::class.java.classLoader.getResource("articles/2021-01-11-bonsai.md") ?: return
    val markdown = Files.readAllLines(Paths.get(url.path), StandardCharsets.UTF_8).joinToString("\n")
    val document: Node = parser.parse(markdown)
    val html = renderer.render(document)
    println(html)
}

object Main
