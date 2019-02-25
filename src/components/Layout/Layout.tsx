import '../../styles/main.css'

import { graphql } from 'gatsby'
import React, { Component } from 'react'

import { COLOR_PRIMARY_DARK_BACKGROUND } from '@/styles/colors'
import { STYLE_NAV_HEIGHT, STYLE_SIDEBAR_WIDTH } from '@/styles/styles'

import Flex from '../Flex/Flex'
import HeadHelmet from '../HeadHelmet'
import Footer from './Footer'
import Header from './Header'
import Sidebar from './Sidebar/Sidebar'

class Props {
  enableSidebar?: boolean = false
  categoryKey?: string
  slug?: string
}

export default class Layout extends Component<Props, any> {
  render() {
    const { enableSidebar, categoryKey, slug } = this.props
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <HeadHelmet />
        <Header slug={slug}/>

        <Flex
          height={ `calc( 100% - ${STYLE_NAV_HEIGHT}px )` }
        >
          {enableSidebar && (
            <div
              style={{
                boxSizing: "border-box",
                width: `${STYLE_SIDEBAR_WIDTH}px`,
                height: '100%',
                padding: '40px 0 0 0',
                overflow: 'auto',
                background: 'white',
                borderRight: '1px solid #e8e8e8'
              }}
            >
              <Sidebar categoryKey={categoryKey} slug={slug} />
            </div>
          )}
          <div
            style={{
              boxSizing: "border-box",
              width: enableSidebar ? `calc(100% - ${ STYLE_SIDEBAR_WIDTH }px)`: "100%",
              height: '100%',
              background: 'white',
              overflow: 'auto',
            }}
          >
            {this.props.children}
          </div>
        </Flex>

        <Footer />
      </div>
    )
  }
}
