import "highlight.js/styles/a11y-dark.css";
import "../styles/globals.css";
import { AppProps } from "next/app";
import { GoogleAnalytics, usePageView } from "@/libs/gtag";

function MyApp({ Component, pageProps }: AppProps) {
  usePageView();

  return (
    <>
      <GoogleAnalytics />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
