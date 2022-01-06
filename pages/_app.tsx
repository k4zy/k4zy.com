import "highlight.js/styles/a11y-dark.css";
import "../styles/globals.css";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { GoogleAnalytics, usePageView } from "@/libs/gtag";

function MyApp({ Component, pageProps }: AppProps) {
  usePageView();

  const router = useRouter();
  const path = router.asPath;
  const title = process.env.NEXT_PUBLIC_TITLE;
  const description = process.env.NEXT_PUBLIC_DESCRIPTION;

  // Set APP_ROOT_URL on enviroment variables
  // e.g. APP_ROOT_URL=https://example.com
  // https://nextjs.org/docs/basic-features/environment-variables
  const APP_ROOT_URL = process.env.NEXT_PUBLIC_APP_ROOT_URL;

  // Absolute page url
  const pageUrl = APP_ROOT_URL + path;

  return (
    <>
      <GoogleAnalytics />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
