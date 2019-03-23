import fs from 'fs'
import path from 'path'

import { PATH_CONTENT, PATH_ROOT } from '../constants'
import { getCategoryYamlRootName } from '../utils/index'
import yamlParser from '../utils/yamlParser'

export default async function createPagesByLocale( locale: string, {
  remarkEdges,
  createPage,
  rootPath,
  categoryYamlEdges,
}: any ) {
  // # generate categorys
  class CategoryYamlMap {
    // the parent directory name of `.category`
    categoryRootName: string
    getCategory: Function
  }
  const categoryYamls: CategoryYamlMap[] = categoryYamlEdges.map( v => {
    const { relativePath } = v.node
    const names = relativePath.split( '/' ).filter( str  => str !== '' )
    const categoryRootName = getCategoryYamlRootName( relativePath )
    const getCategory = () => {
      const yamlFilePath = path.resolve( PATH_CONTENT, relativePath )
      const text = fs.readFileSync( yamlFilePath )
      try {
        return yamlParser( text )
      } catch( e ) {
        console.log( e )
        return {}
      }
    }
    return { categoryRootName, getCategory }
  } )
  

  // # create every page
  for ( const edge of remarkEdges ) {
    const { slug } = edge.node.fields
    const route = getRemarkRoute( slug )
    const remarkRootName = getRemarkRootName( slug )
    const categoryYaml = categoryYamls.filter( v => v.categoryRootName === remarkRootName )[ 0 ]
    const category = categoryYaml.getCategory()
    await createPage( {
      path     : `${rootPath}${ route }`,
      component: path.resolve( __dirname, `../../src/templates/DocTemplate.tsx` ),
      context  : {
        // Data passed to context is available in page queries as GraphQL variables.
        slug: edge.node.fields.slug,
        category
      },
    } )
  }
}

function getRemarkRoute( slug: string ) {
  const names = slug.split( "/" ).filter( str  => str !== '' )
  return names[ names.length - 2 ]
}

function getRemarkRootName( slug: string ) {
  const names = slug.split( "/" ).filter( str  => str !== '' )
  return names[ 0 ]
}