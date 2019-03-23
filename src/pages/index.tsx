import { graphql } from 'gatsby'
import React from 'react'

import Layout from '../components/Layout/Layout'
import Home from './Home/Home'

export default (props) => {
  const { data, pageContext } = props
  const { title } = data.site.siteMetadata
  console.log( pageContext )
  return <Home pageContext={pageContext}/>
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
