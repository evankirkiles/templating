import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Head from 'next/head';

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>home - evan&apos;s boilerplate</title>
        <NextSeo />
      </Head>
      <h1>welcome to the website boilerplate</h1>
    </>
  );
};

export default HomePage;
