import { Link } from 'gatsby'
import React, { Component } from 'react'

import { URL_BAR, URL_FOO, URL_LOGO, URL_TSDOCS } from '@/constants/urls'
import { CLASS_EMPTY_LINK } from '@/styles/classNames'
import { COLOR_PRIMARY_TEXT_UNDER_LIGHT } from '@/styles/colors'
import { STYLE_NAV_HEIGHT } from '@/styles/styles'
import { css, jsx } from '@emotion/core'

import Flex from '../Flex/Flex'
import OuterLinkIcon from '../svg/OuterLinkIcon'

class Props {
  slug?: string
  pageContext?: any
}

class State {}

class TypeLink { 
    label: string
    to: string 
}

export default class Header extends Component<Props, State> {
  get links(): TypeLink[] {
    const { rootPath } = this.props.pageContext
    return [
      {
        label: "Fruit",
        to: `${rootPath}/fruit`
      },
    ]
  }
  render() {
    const { slug } = this.props
    const { rootPath = '/' } = this.props.pageContext || {}
    const isHomePage = !slug
    return (
      <div
        style={{
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: `${STYLE_NAV_HEIGHT}px`,
          padding: "0 80px",
          background: "white",
          ...(isHomePage
            ? {}
            : {
                borderBottom: "1px solid #e8e8e8"
              })
        }}
      >
        <Link className={CLASS_EMPTY_LINK} to={rootPath}>
          <div
            style={{
              display: "flex",
              alignItems: "center"
            }}
          >
            {/* <img src="/svg/ts.svg" height="24px" /> */}
            <img src={URL_LOGO} width="36px" height="24px" />
            <span
              style={{
                margin: "0 0 0 10px",
                fontSize: "24px",
                fontWeight: "bold",
                color: COLOR_PRIMARY_TEXT_UNDER_LIGHT
              }}
            >
              TSDocs
            </span>
          </div>
        </Link>

        <div>
          {this.links.map((link, index) => (
            <Link className={CLASS_EMPTY_LINK} key={index} to={link.to}>
              <span
                css={css`
                  margin: 0 50px 0 0;
                  ${slug === `${link.to}/` ? "color: #111;" : "color: #757575;"}
                  &:hover: {
                    color: #292929;
                  }
                `}
              >
                {link.label}
              </span>
            </Link>
          ))}
          <a
            className={CLASS_EMPTY_LINK}
            css={{
              color: "#757575",
              "&:hover": {
                color: "#292929"
              },
              cursor: "pointer"
            }}
            href={URL_TSDOCS}
          >
            Github
            <OuterLinkIcon />
          </a>
        </div>
      </div>
    )
  }
}
