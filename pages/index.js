import Head from "next/head";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";

export default function Home({ data }) {
  return (
    <Layout>
      <p>{process.env.NEXT_PUBLIC_DEMO}</p>
      <div className={styles.grid}>
        {data.map((article) => (
          <a key={article.id} href="" className={styles.card}>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
          </a>
        ))}
      </div>
    </Layout>
  );
}
export const getStaticProps = async () => {
  const resp = await fetch(`${process.env.STRAPI_URL}/articles`);
  const data = await resp.json();

  return {
    props: {
      data,
    },
  };
};
