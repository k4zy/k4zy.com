import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ja">
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <header className="page-header">
            <h1 className="title">k4zy no blog</h1>
            <nav>
              <a href="https://k4zy.com">Home</a>/
              <a
                href="https://github.com/k4zy"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              /
              <a
                href="https://twitter.com/_k4zy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </nav>
          </header>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
