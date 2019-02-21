import React, { Component } from "react"
import DefaultProps from "@/utils/DefaultProps";
import Layout from "@/components/Layout/Layout";
import { graphql } from 'gatsby'
import { CategoryType } from "@/typings/Category";
import TableOfContents from "./TableOfContents";

class Props extends DefaultProps {

}

class State {
  
}



export default class DocTemplate extends Component<Props, State> {
  render() {
    const { markdownRemark } = this.props.data
    const { html, frontmatter, headings } =  markdownRemark
    const { title, categoryKey } = frontmatter

    return <Layout enableSidebar={true} categoryKey={ categoryKey }>
      <TableOfContents headings={ headings }/>
      <hr />
      <h1>{ title }</h1>
      <div dangerouslySetInnerHTML={{
        __html: html
      }}></div>
    </Layout>
  }
}

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        categoryKey
      }
      headings {
        value
        depth
      }
    }
  }
`;
