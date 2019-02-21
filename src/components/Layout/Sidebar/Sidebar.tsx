import React, { Component } from "react"
import DefaultProps from "@/utils/DefaultProps"
import { Link } from "gatsby"
import Flex from "../../Flex/Flex"
import { StaticQuery, graphql } from "gatsby"
import FooSidebar from "./FooSidebar";

class Props extends DefaultProps {
  categoryKey?: string
}

class State {}

export default class Sidebar extends Component<Props, State> {
  render() {
    const { categoryKey } = this.props
    return <FooSidebar />
  //   <Flex
  //   direction="column"
  //   halign="flex-start"
  //   style={{
  //     background: "#f7f7f7"
  //   }}
  // />
  }
}

// export const query = graphql`
//   {
//     allFooNavYaml {
//       edges {
//         node {
//           label
//           items {
//             label
//             items {
//               label
//             }
//           }
//         }
//       }
//     }
//   }
// `
