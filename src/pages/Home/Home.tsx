import React, { Component } from 'react'

import Layout from '@/components/Layout/Layout'
import {
    COLOR_PRIMARY_DARK_BACKGROUND, COLOR_PRIMARY_TEXT_UNDER_DARK, COLOR_PRIMARY_TEXT_UNDER_LIGHT
} from '@/styles/colors'
import DefaultProps from '@/utils/DefaultProps'

class Props extends DefaultProps {}

class State {}

export default class Home extends Component<Props, State> {
  render() {
    return (
      <Layout>
        <div
          style={{
            display: "grid",
            placeItems: "center",
            width: "100%",
            height: "100%",
            background: "no-repeat center / cover url('./images/books.jpg')"
          }}
        >
          <div
            style={{
              display: "grid",
              placeItems: "center",
              width: '100%',
              height: '100%',
              background: 'rgba(255, 255, 255, 0.7)',
            }}
          >
            <div
              style={{
                display: "grid",
                placeItems: "center",
              }}
            >
              <span style={{
                color: COLOR_PRIMARY_TEXT_UNDER_DARK,
                fontSize: '60px',
                fontWeight: 'bold',
              }}>TSDOCS</span>
              <p style={{
                fontSize: '30px',
                color: COLOR_PRIMARY_DARK_BACKGROUND,
              }}>A Highway to Build Static Docs Website</p>
              <div style={{
                padding: '15px 20px',
                fontSize: '20px',
                borderRadius: '3px',
                color: 'rgba(255, 255, 255, 0.9)',
                background: COLOR_PRIMARY_TEXT_UNDER_DARK,
              }}>Get Started</div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
