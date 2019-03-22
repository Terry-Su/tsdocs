import path from 'path'

export default function createPageByLocale( locale: string, {
  result,
  createPage,
  rootPath,
  categoryYamlEdges,
}: any ) {
  result.data.allMarkdownRemark.edges.forEach( edge => {
    const { slug } = edge.node.fields
    const route = getRemarkRoute( slug )
    createPage( {
      path     : `${rootPath}${ route }`,
      component: path.resolve( __dirname, `../../src/templates/DocTemplate.tsx` ),
      context  : {
        // Data passed to context is available in page queries as GraphQL variables.
        slug: edge.node.fields.slug,
      },
    } )
  } )
}

function getRemarkRoute( slug: string ) {
  const names = slug.split( "/" ).filter( str  => str !== '' )
  return names[ names.length - 2 ]
}