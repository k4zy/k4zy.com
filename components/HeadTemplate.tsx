import Head from "next/head";
import NextHeadSeo from "next-head-seo";
import { useRouter } from "next/router";

export type HeadType = {
  pagetitle?: string;
  pagedescription?: string;
  postimg?: string;
};

export const HeadTemplate: React.FC<HeadType> = ({
  pagetitle,
  pagedescription,
  postimg,
}) => {
  const title = pagetitle
    ? `${pagetitle} | ${process.env.NEXT_PUBLIC_TITLE}`
    : `${process.env.NEXT_PUBLIC_TITLE}`;
  const description =
    pagedescription || `${process.env.NEXT_PUBLIC_DESCRIPTION}`;

  const router = useRouter();
  const path = router.asPath;
  const APP_ROOT_URL = process.env.NEXT_PUBLIC_APP_ROOT_URL;
  const pageUrl = APP_ROOT_URL + path;

  const imgurl = postimg ? `${postimg}` : "https://i.imgur.com/Rejg5AN.png";
  const imgw = "1200px";
  const imgh = "630px";

  return (
    <>
      <NextHeadSeo
        title={title}
        canonical={pageUrl}
        description={description}
        robots="index, follow"
        og={{
          image: imgurl,
          type: "article",
          siteName: "k4zy no blog",
        }}
        twitter={{
          site: "@_k4zy",
          card: "summary_large_image",
        }}
      />
      <Head>
        <meta property="og:image:width" content={imgw} />
        <meta property="og:image:height" content={imgh} />
        <meta property="og:locale" content="ja_JP" />
      </Head>
    </>
  );
};
