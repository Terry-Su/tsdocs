import React, { Component } from "react"
import DefaultProps from "@/utils/DefaultProps"
import { Link } from "gatsby"
import Flex from "../Flex/Flex"

class Props extends DefaultProps {}

class State {}

export default class Sidebar extends Component<Props, State> {
  render() {
    return (
      <Flex
        direction="column"
        halign="flex-start"
        style={{
          background: "#f7f7f7"
        }}
      >
        {[
          { to: "/docs/home", title: "Home" },
          { to: "/docs/foo", title: "Foo" }
        ].map(({ to, title }, index) => (
          <Flex
            key={index}
            valign="center"
            style={{
              boxSizing: "border-box",
              height: "50px",
              padding: "0 0 0 20px",
              color: "rgb(26, 26, 26)!important"
            }}
          >
            <Link to={to}>{title}</Link>
          </Flex>
        ))}
      </Flex>
    )
  }
}
