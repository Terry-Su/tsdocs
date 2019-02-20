import React, { Component } from "react"
import Header from "./Header"
import Flex from "../Flex/Flex"
import { graphql } from "gatsby"
import Sidebar from "./Sidebar"
import '../../styles/main.css'

export default class Layout extends Component<any, any> {
    
  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100%"
        }}
      >
        {/* <Header /> */}

        <Flex>
          <div
            style={{
              boxSizing: "border-box",
              width: "300px",
              height: "100%"
              // border: "1px solid blue"
            }}
          >
            <Sidebar />
          </div>
          <div
            style={{
              boxSizing: "border-box",
              width: "calc( 100% - 300px )",
              height: "100%",
              padding: "20px"
              // border: "1px solid red"
            }}
          >
            {this.props.children}
          </div>
        </Flex>

        {/* footer */}
      </div>
    )
  }
}
