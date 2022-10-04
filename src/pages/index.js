import Head from "next/head";
import TransactionContainer from "../containers/TransactionContainer";
import Layout from "../components/Layout/Layout";

export default function Home() {
  return (
    <>
      <Head>
        <title>Budget Calculator</title>
      </Head>
      <Layout></Layout>
    </>
  );
}
