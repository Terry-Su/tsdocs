import React, { Component } from "react"
import Flex from "../Flex/Flex";
import { Link } from "gatsby"
import { URL_FOO, URL_BAR } from "@/constants/urls";

const links = [
  { label: 'Foo', to: URL_FOO },
  { label: 'Bar', to: URL_BAR },
]

export default class Header extends Component {
  render() {
    return <div style={{
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: '62px',
    }}>
      <Link to='/'><h2>Title</h2></Link>

      {
        links.map( (link, index) => <Link to={ link.to } key={index}><span>{ link.label }</span></Link> )
      }
    </div>
  }
}