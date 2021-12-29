// pages/index.js
import { NextPage, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { getAllPosts } from "@/libs/ContentResolver";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

// export default function Home<Props>({ allPosts }) {
//   return (
//     <div>
//       <ul>
//         {allPosts.map((blog) => (
//           <li key={blog.id}>
//             <Link href={`/blog/${blog.id}`}>
//               <a>{blog.title}</a>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

const Home: NextPage<Props> = ({ allPosts }) => (
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
);

export default Home;

export const getStaticProps = async () => {
  const allPosts = getAllPosts(["slug", "title", "date", "tags"]);

  return {
    props: { allPosts },
  };
};

// // データをテンプレートに受け渡す部分の処理を記述します
// export const getStaticProps = async () => {
//   const data = await client.get({ endpoint: "blog" });

//   return {
//     props: {
//       blog: data.contents,
//     },
//   };
// };
