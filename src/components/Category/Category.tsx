import { navigate } from 'gatsby'
import React, { Component } from 'react'

import { CategoryType } from '@/__typings__/Category'
import { COLOR_PRIMARY_TEXT_UNDER_DARK } from '@/styles/colors'
import DefaultProps from '@/utils/DefaultProps'
import { css, jsx } from '@emotion/core'

class Props extends DefaultProps {
  category: CategoryType
  level?: number
  paddingLeft?: number
  slug?: string
}

class State {
  isFolded: boolean = false
}

const levelsMap = {
  1: css`
    height: 37px;
    font-size: 14px;
    font-weight: bold;
    margin: 0;
    color: "black";
  `
}

const BASIC_PADDING = 40

export default class Category extends Component<Props, State> {
  state: State
  constructor(props: Props) {
    super(props)
    const {
      foldable = false,
      folded = false,
      allFolded = false
    } = this.props.category
    this.state = {
      isFolded: allFolded === false ? false : folded
    }
  }

  get noHref(): boolean {
    return !this.props.category.href
  }

  get isExpanding(): boolean {
    return !this.state.isFolded
  }

  onLabelClick = () => {}

  onWholeLineClick = (event) => {
    const { foldable, href } = this.props.category
    // if (foldable) {
    //   this.onFoldIconClick(event)
    //   return
    // }
    if (href != null) {
      navigate(href)
    } else {
      // if no href, activate folding logic
      foldable && this.onFoldIconClick(event)
    }
  }

  onFoldIconClick = (event) => {
    event.stopPropagation()
    this.setState(prev => ({
      isFolded: !prev.isFolded
    }))
  }

  render() {
    const { category, level = 1 } = this.props
    let { paddingLeft = BASIC_PADDING, slug } = this.props
    const {
      foldable = false,
      folded = false,
      allFolded = false,
      href
    } = category
    const { label, items = [] } = category
    const { isExpanding } = this
    const isActiveItem = slug === `${href}/`

    if (level > 2) {
      paddingLeft = paddingLeft + 20
    }

    return (
      <div
        style={{
          minWidth: "100%"
        }}
      >
        <div
          css={css`
            box-sizing: border-box;
            display: flex;
            align-items: center;
            width: 100%;
            height: 20px;
            margin: 5px 0 0 0;
            padding: 0 0 0 ${paddingLeft}px;
            font-size: 16px;
            color: #343;
            cursor: pointer;

            &:hover {
              color: ${isActiveItem
                ? COLOR_PRIMARY_TEXT_UNDER_DARK
                : "#6d6d6d"};
            }

            ${levelsMap[level]}
            ${isActiveItem
              ? `
      color: ${COLOR_PRIMARY_TEXT_UNDER_DARK};
      font-weight: bolder;
      `
              : ""}
          `}
          onClick={this.onWholeLineClick}
        >
          {foldable && (
            <span
              css={css`
                font-size: 12px;
              `}
              onClick={this.onFoldIconClick}
            >
              {isExpanding ? "∧" : "∨"}
            </span>
          )}
          <span css={css`
            margin: 0 0 0 7px;
          `} onClick={this.onLabelClick}>{label} </span>
        </div>

        {this.isExpanding &&
          items &&
          items.map((item, index) => (
            <Category
              key={index}
              category={item}
              level={level + 1}
              paddingLeft={paddingLeft}
              slug={slug}
            />
          ))}
      </div>
    )
  }
}
