import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import ReactMarkDown from "react-markdown";
import { useState } from "react";

const Article = ({ data }) => {
  return (
    <Layout>
      <> 
        <h2>{data.title}</h2>
        <ReactMarkDown source={data.content} escapeHTML={false}/>
      </>
    </Layout>
  );
};

export default Article;

export const getStaticProps = async ({params}) => {
  const r = await fetch(`${process.env.STRAPI_URL}/articles/?slug=${params.slug}`);
  const data = await r.json();

  return {
    props: {
      data: data.pop(),
    },
  };
};

export const getStaticPaths = async () => {
  const r = await fetch(`${process.env.STRAPI_URL}/articles`);
  const data = await r.json();

  return {
    paths: data.map((article) => ({ 
      params: {
         slug: article.slug,
      } ,
    })),
    fallback: false,
  };
};
