import "../styles/globals.css";
import "@code-hike/mdx/dist/index.css";

import type { AppProps } from "next/app";
import Footer from "@/components/Footer";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Script from "next/script";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href="/rounded-avatar.png"
          type="image/x-icon"
        />
        <meta
          property="fb:app_id"
          content={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
        />
      </Head>
      <ThemeProvider attribute="class" enableSystem defaultTheme="system">
        <Navbar />
        <Component {...pageProps} />
        <Footer />
        <div id="fb-root"></div>
      </ThemeProvider>

      {process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL &&
        process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <Script
            strategy="lazyOnload"
            async
            defer
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL}
          ></Script>
        )}
    </>
  );
}

export default MyApp;
