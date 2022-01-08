import { NextPage, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { getAllPosts, getPostBySlug } from "@/libs/ContentResolver";
import { markdownToHtml, markdownToText } from "@/libs/markdownToHtml";
import dayjs from "dayjs";
import { HeadTemplate } from "@/components/HeadTemplate";
import { createOgpImage } from "@/libs/createOgpImage";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Post: NextPage<Props> = ({ post }) => {
  const { ogImageUrl } = createOgpImage(
    "https://images.microcms-assets.io/assets/a832632f6ab04aacaf7850ca7c7c9e9c/3a72acd0afba4a95b1047434b34274b9/simple_ogp.png",
    post.title
  );
  return (
    <>
      <HeadTemplate
        pagetitle={post.title}
        pagedescription={post.summary}
        postimg={ogImageUrl}
      />
      <main>
        <article>
          <Head>
            <title>{post.title} - k4zy.com</title>
          </Head>
          <h1 className="blogTitle">{post.title}</h1>
          <p>
            <ul id="tags">
              {post.tags.map((tag) => (
                <li className="tag" key={tag}>
                  {tag}
                </li>
              ))}
            </ul>
            <time>{dayjs(post.date).format("MMM D, YYYY")}</time>
          </p>
          <section>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </section>
        </article>
      </main>
    </>
  );
};

export default Post;

export const getStaticPaths = async () => {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const post = getPostBySlug(params.slug, [
    "slug",
    "title",
    "date",
    "tags",
    "content",
  ]);

  const content = await markdownToHtml(post.content);
  const plainText = await markdownToText(post.content);
  const summary = plainText.slice(0, 80);

  return {
    props: {
      post: {
        ...post,
        content,
        summary,
      },
    },
  };
};
