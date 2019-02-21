import React, { Component } from "react"
import Header from "./Header"
import Flex from "../Flex/Flex"
import { graphql } from "gatsby"
import Sidebar from "./Sidebar/Sidebar"
import "../../styles/main.css"
import Copyright from "../Copyright";

class Props {
  enableSidebar?: boolean = false
  categoryKey?: string
}

export default class Layout extends Component<Props, any> {
  render() {
    const { enableSidebar, categoryKey } = this.props
    return (
      <div
        style={{
          width: "100%",
          height: "100%"
        }}
      >
        <Header />

        <Flex>
          {enableSidebar && (
            <div
              style={{
                boxSizing: "border-box",
                width: "300px",
                height: "100%"
              }}
            >
              <Sidebar categoryKey={categoryKey} />
            </div>
          )}
          <div
            style={{
              boxSizing: "border-box",
              width: enableSidebar ? "calc( 100% - 300px )" : "100%",
              height: "100%",
              padding: "20px"
            }}
          >
            {this.props.children}
          </div>
        </Flex>

        <Copyright />
      </div>
    )
  }
}
