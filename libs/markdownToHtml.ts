import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeExternalLinks from "rehype-external-links";
import rehypeRow from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import retextStringify from "retext-stringify";

export const markdownToHtml = async (markdown: string) => {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRow)
    .use(rehypeExternalLinks, {
      target: "_blank",
      rel: ["noopener noreferrer"],
    })
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
};

export const markdownToText = async (markdown: string) => {
  const result = await unified()
    .use(remarkParse)
    .use(retextStringify)
    .process(markdown);
  return result.toString();
};
