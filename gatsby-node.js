const path = require( `path` )
const { createFilePath } = require( `gatsby-source-filesystem` )

const component = path.resolve( `./src/templates/DocTemplate.tsx` )


// webpack
exports.onCreateWebpackConfig = ( {
  stage,
  rules,
  loaders,
  plugins,
  actions,
} ) => {
  actions.setWebpackConfig( {
    // module: {
    //   rules: [
    //     // {
    //     //   test   : /\.ts*?/,
    //     //   use    : "ts-loader",
    //     //   // include: __dirname
    //     //   exclude: /node_modules/
    //     // },
    //     // {
    //     //   test: /\.css$/,
    //     //   use : [ "style-loader", "css-loader" ]
    //     // },
    //     // {
    //     //   test: /\.scss$/,
    //     //   use : [
    //     //     "style-loader", // creates style nodes from JS strings
    //     //     "css-loader", // translates CSS into CommonJS
    //     //     "sass-loader" // compiles Sass to CSS
    //     //   ]
    //     // },
    //     // {
    //     //   test  : /\.(png|woff|woff2|eot|ttf|svg)$/,
    //     //   loader: "url-loader?limit=100000000"
    //     // }
    //   ]
    // },
    resolve: {
      extensions: [ ".ts", ".tsx", ".js" ],
      alias     : {
        '@': path.resolve( __dirname, 'src' )
      }
    }
  } )
}




// # create node
exports.onCreateNode = ( { node, actions, getNode } ) => {
  const { createNodeField } = actions

  if ( node.internal.type === `MarkdownRemark` ) {
    const value = createFilePath( { node, getNode } )
    createNodeField( {
      name: `slug`,
      node,
      value,
    } )
  }
}



// # create page

exports.createPages = ( { graphql, boundActionCreators } ) => {
    const { createPage } = boundActionCreators
    
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
                    console.log( node.fields.slug )
                    createPage( {
                        path     : node.fields.slug,
                        component: path.resolve( `./src/templates/DocTemplate.tsx` ),
                        context  : {
                            // Data passed to context is available in page queries as GraphQL variables.
                            slug: node.fields.slug,
                        },
                    } )
                } )

                // create home page
                createPage( {
                  path     : '/',
                  component: path.resolve( `./src/pages/Home/Home.tsx` )
                } )

                resolve()
            } )
    } )
}



