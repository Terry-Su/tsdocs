import { graphql } from 'gatsby'
import React from 'react'

import Layout from '../components/Layout/Layout'
import Home from './Home/Home'

export default ({ data }) => {
  const { title } = data.site.siteMetadata
  return <Home />
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
