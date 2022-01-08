// pages/index.js
import { NextPage, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import { getAllPosts } from "@/libs/contentResolver";
import { HeadTemplate } from "@/components/HeadTemplate";
import dayjs from "dayjs";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<Props> = ({ allPosts }) => (
  <main>
    <HeadTemplate />
    <Head>
      <title>k4zy no blog</title>
    </Head>
    {allPosts?.map((post) => (
      <section className="post" key={post.slug}>
        <Link href={`/blog/${post.slug}`}>
          <a className="postLink">{post.title}</a>
        </Link>
        <time dateTime={post.date} title={post.date}>
          {dayjs(post.date).format("MMM D, YYYY")}
        </time>
      </section>
    ))}
  </main>
);

export default Home;

export const getStaticProps = async () => {
  const allPosts = getAllPosts(["slug", "title", "date", "tags"]);

  return {
    props: { allPosts },
  };
};
