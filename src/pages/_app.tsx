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
      </Head>
      <ThemeProvider attribute="class" enableSystem defaultTheme="system">
        <Navbar />
        <Component {...pageProps} />
        <Footer />
        <div id="fb-root"></div>
      </ThemeProvider>

      {process.env.NEXT_PUBLIC_GA_ID && (
        <>
          <Script
            strategy="lazyOnload"
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          ></Script>
          <Script id="google-analytics" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `}
          </Script>
        </>
      )}
    </>
  );
}

export default MyApp;
