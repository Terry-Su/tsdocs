import React, { Component } from "react"
import DefaultProps from "@/utils/DefaultProps";
import Layout from "@/components/Layout/Layout";

class Props extends DefaultProps {

}

class State {
  
}

export default class Home extends Component<Props, State> {
  render() {
    return <Layout>
      <div style={{
        display: 'grid',
        placeItems: 'center',
        width: '100%',
        height: '300px',
      }}>
        <div style={{
        display: 'grid',
        placeItems: 'center',
      }}>
          <h1>TSDocs</h1>
          <p>A Highway to Build Static Docs Website</p>
        </div>
      </div>
      
    </Layout>
  }
}