import path from 'path'

import { localeNameToDecoratedNameMap } from '../../locale/decoratedNames'
import * as localeNamesMap from '../../locale/names'
import { CATEGORY_FOLDER_NAME } from '../constants'
import createPageByLocale from './createPageByLocale'

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
  ` ).then( result => {
              // console.log( result.data.allMarkdownRemark )
              // result.data.allMarkdownRemark.edges.forEach( ( { node } ) => {
              //     createPage( {
              //         path     : node.fields.slug,
              //         component: path.resolve( __dirname, `../src/templates/DocTemplate.tsx` ),
              //         context  : {
              //             // Data passed to context is available in page queries as GraphQL variables.
              //             slug: node.fields.slug,
              //         },
              //     } )
              // } )

              // // // create home page
              // createPage( {
              //   path     : '/',
              //   component: path.resolve( __dirname, `../../../src/pages/Home/Home.tsx` )
              // } )

              const allYamlEdges = result.data.allFile.edges.filter( v => v.node.extension === 'yml' )

              Object.values( localeNamesMap ).forEach( locale => {
                const decoratedLocale = localeNameToDecoratedNameMap[ locale ]
                const rootPath = locale === localeNamesMap.EN ? '/' : `/${decoratedLocale}/`

                // # create markdown pages
                createPageByLocale( locale, {
                  result,
                  createPage,
                  rootPath,
                } )


                // # generate category
                const categoryYamlEdges = allYamlEdges.filter( v => v.node.name === decoratedLocale && path.dirname( v.node.relativePath ) === CATEGORY_FOLDER_NAME )

              } )

              resolve()
          } )
  } )
}
