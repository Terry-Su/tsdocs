const path = require( `path` )

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
    }
  ` ).then( result => {
              result.data.allMarkdownRemark.edges.forEach( ( { node } ) => {
                  createPage( {
                      path     : node.fields.slug,
                      component: path.resolve( __dirname, `../src/templates/DocTemplate.tsx` ),
                      context  : {
                          // Data passed to context is available in page queries as GraphQL variables.
                          slug: node.fields.slug,
                      },
                  } )
              } )

              // // // create home page
              // createPage( {
              //   path     : '/',
              //   component: path.resolve( __dirname, `../src/pages/Home/Home.tsx` )
              // } )

              resolve()
          } )
  } )
}
