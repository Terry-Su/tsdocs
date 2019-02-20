import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout/Layout";
import { Link, Router } from "@reach/router"
import Home from "./Home/Home";

export default ({ data }) => {
  const { title } = data.site.siteMetadata
  return <Layout>
    <h1>Welcome to {title}!</h1>
  </Layout>
}

export const query = graphql`
query Query {
  site {
    siteMetadata {
      title
    }
  }
}
`
