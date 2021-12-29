import { NextPage, InferGetStaticPropsType } from "next";
import { getAllPosts, getPostBySlug } from "@/libs/ContentResolver";
import markdownToHtml from "@/libs/markdownToHtml";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Post: NextPage<Props> = ({ post }) => (
  <article>
    <h1 className="title">{post.title}</h1>
    <p>{post.date}</p>
    <ul>
      {post.tags?.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
    <section>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </section>
  </article>
);

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

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
};
