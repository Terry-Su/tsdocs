import path from 'path'

import { localeNameToDecoratedNameMap } from '../../locale/decoratedNames'
import * as localeNamesMap from '../../locale/names'
import { CATEGORY_FOLDER_NAME } from '../constants'
import { getCategoryYamlParentName, getFileName } from '../utils/index'
import createPagesByLocale from './createPagesByLocale'

module.exports = ( { graphql, actions } ) => {
  const { createPage } = actions

  return new Promise( ( resolve, reject ) => {
    graphql( `
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
        allFile {
          edges {
            node {
              relativePath
              extension
              name
            }
          }
        }
      }
    ` ).then( async function( result ) {
      const allYamlEdges = result.data.allFile.edges.filter(
        v => v.node.extension === "yml"
      )

      for ( const locale of Object.values( localeNamesMap ) ) {
        const decoratedLocale = localeNameToDecoratedNameMap[ locale ]
        const rootPath =
          locale === localeNamesMap.EN ? "/" : `/${decoratedLocale}/`

        // # category
        const categoryYamlEdges = allYamlEdges.filter( v => {
          return (
            v.node.name === decoratedLocale &&
            getCategoryYamlParentName( v.node.relativePath ) ===
              CATEGORY_FOLDER_NAME
          )
        } )

        // # create markdown pages
        const remarkEdges = result.data.allMarkdownRemark.edges.filter( v => {
          const name = getFileName( v.node.fields.slug )
          return name === decoratedLocale
        } )

        await createPagesByLocale( locale, {
          remarkEdges,
          createPage,
          rootPath,
          categoryYamlEdges
        } )
      }

      resolve()
    } )
  } )
}
