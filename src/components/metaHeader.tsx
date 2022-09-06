import Head from "next/head";

type Props = {
  title?: string;
  description?: string;
  imageUrl?: string;
};

const MetaHeader = ({
  title = "nawatai: 個人向け名付けブレストサービス",
  description = "nawataiはあらゆるものに名付けするサービスです。",
  imageUrl = `${process.env.NEXT_PUBLIC_VERCEL_URL}/ogp.png`,
}: Props): JSX.Element => (
  <Head>
    <title>{title}</title>
    <meta property="description" content={description} key="description" />
    <meta property="og:title" content={title} key="title" />
    <meta property="og:description" content={description} key="description" />
    <meta property="og:image" content={imageUrl} key="imageUrl" />
    <meta name="twitter:card" content="summary_large_image" />

    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/favicons/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/favicons/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/favicons/favicon-16x16.png"
    />
    <link rel="manifest" href="/favicons/site.webmanifest" />
    <link
      rel="mask-icon"
      href="/favicons/safari-pinned-tab.svg"
      color="#000000"
    />
    <meta name="msapplication-TileColor" content="#ffffff" />
    <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
    <meta name="theme-color" content="#ffffff" />
  </Head>
);

export default MetaHeader;
