/** @format */
import Head from "next/head";
import Layout from "../components/Layout";
import { AppProvider } from "../context/AppContext";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Farm Assist</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <AppProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </>
  );
}
