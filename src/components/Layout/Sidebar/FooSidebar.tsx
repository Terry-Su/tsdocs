import React, { Component } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import Flex from "@/components/Flex/Flex";
import Category from "@/components/Category/Category";

class Props {
}

class State {
  
}

export default class FooSidebar extends Component<Props, State> {
  render() {
    return (
      <StaticQuery
        query={graphql`
          query HeadingQuery {
            allFooNavYaml {
              edges {
                node {
                  label
                  foldable
                  href
                  items {
                    label
                    foldable
                    href
                    items {
                      label
                    }
                  }
                }
              }
            }
          }
        `}
        render={ data => {
          return <Flex
          direction="column"
          halign="flex-start"
          style={{
            background: "#f7f7f7"
          }}
        >
          <Category category={ data.allFooNavYaml.edges[ 0 ].node }/>
        </Flex>
        } }
      >
      </StaticQuery>
    )
  }
}