import { Link } from 'gatsby'
import React, { Component } from 'react'

import { URL_BAR, URL_FOO, URL_GITHUB, URL_TSDOCS } from '@/constants/urls'
import { CLASS_EMPTY_LINK } from '@/styles/classNames'
import { COLOR_PRIMARY_TEXT_UNDER_LIGHT } from '@/styles/colors'
import { STYLE_NAV_HEIGHT } from '@/styles/styles'
import { css, jsx } from '@emotion/core'

import Flex from '../Flex/Flex'
import OuterLinkIcon from '../svg/OuterLinkIcon'

const links = [{ label: "Foo", to: URL_FOO }, { label: "Bar", to: URL_BAR }]

class Props {
  slug?: string
}

class State {}

export default class Header extends Component<Props, State> {
  render() {
    const { slug } = this.props
    const isHomePage = ! slug
    return (
      <div
        style={{
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: `${STYLE_NAV_HEIGHT}px`,
          padding: '0 80px',
          background: "white",
          ...(isHomePage
            ? {}
            : {
                borderBottom: "1px solid #e8e8e8"
              })
        }}
      >
        <Link className={CLASS_EMPTY_LINK} to="/">
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img src="/svg/ts.svg" height="24px" />
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
          {links.map((link, index) => (
            <Link className={CLASS_EMPTY_LINK} key={index} to={link.to}>
              <span
                css={css`
                margin: 0 50px 0 0;
                ${ slug === `${link.to}/` ? 'color: #111;' : 'color: #757575;' }
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
