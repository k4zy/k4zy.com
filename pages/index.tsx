// pages/index.js
import { NextPage, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { getAllPosts } from "@/libs/ContentResolver";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<Props> = ({ allPosts }) => (
  <main>
    <h1 className="title">k4zy no blog</h1>
    <nav>
      <a href="https://k4zy.com" target="_blank" rel="noopener noreferrer">
        Home
      </a>
      /
      <a
        href="https://github.com/k4zy"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>{" "}
      /
      <a
        href="https://twitter.com/_k4zy"
        target="_blank"
        rel="noopener noreferrer"
      >
        Twitter
      </a>
    </nav>
    <ul>
      {allPosts?.map((post) => (
        <div key={post.slug}>
          <li>
            <Link href={`/blog/${post.slug}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        </div>
      ))}
    </ul>
  </main>
);

export default Home;

export const getStaticProps = async () => {
  const allPosts = getAllPosts(["slug", "title", "date", "tags"]);

  return {
    props: { allPosts },
  };
};
