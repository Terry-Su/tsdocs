import React, { Component } from "react"

class Props {

}

class State {
  
}

export default class Copyright extends Component<Props, State> {
  render() {
    return <div style={{
      display: 'grid',
      placeItems: 'center',
      padding: '20px 0',
      background: '#ddd',
      fontSize: '12px',
    }}>
      Copyright © 2019 TSDOCS
    </div>
  }
}