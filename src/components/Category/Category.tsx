import React, { Component } from 'react'

import { COLOR_PRIMARY_TEXT_UNDER_DARK } from '@/styles/colors'
import { CategoryType } from '@/typings/Category'
import DefaultProps from '@/utils/DefaultProps'
import { css, jsx } from '@emotion/core'
import { navigate } from '@reach/router'

class Props extends DefaultProps {
  category: CategoryType
  level: number
  paddingLeft: number
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
  color: 'black';
`,
}

const BASIC_PADDING = 40

export default class Category extends Component<Props, State> {
  state: State
  constructor( props: Props ) {
    super( props )
    const { foldable = false, folded = false, allFolded = false } =  this.props.category
    this.state = {
      isFolded: allFolded === false ? false : folded
    }
  }

  get noHref(): boolean {
    return ! this.props.category.href
  }

  get isExpanding(): boolean {
    return ! this.state.isFolded
  }

  onLabelClick = () => {

  }

  onWholeLineClick = () => {
    const { foldable, href } = this.props.category
    if ( foldable ) {
      this.onFoldIconClick()
      return
    }
    if ( href != null ) {
      navigate( href )
    } else {
      // if no href, activate folding logic
      foldable && this.onFoldIconClick()
    }
  }

  onFoldIconClick = () => {
    this.setState( prev => ({
      isFolded: ! prev.isFolded
    }) )
  }


  render() {
    const { category, level = 1 } =  this.props
    let { paddingLeft = BASIC_PADDING } =  this.props
    const { foldable = false, folded = false, allFolded = false, href } =  category
    const { label, items = [] } = category
    const { isExpanding } = this
    const isActiveItem = href === location.pathname

    if ( level > 2 ) {
      paddingLeft = paddingLeft + 20
    }

    return <div style={{
      minWidth: '100%',
    }}>
      <div css={css`
      box-sizing: border-box;
      display: flex;
      align-items: center;
      width: 100%;
      height: 20px;
      margin: 5px 0 0 0;
      padding: 0 0 0 ${ paddingLeft }px;
      font-size: 16px;
      color: #1a1a1a;
      cursor: pointer;

      &:hover {
        color: ${ isActiveItem ? COLOR_PRIMARY_TEXT_UNDER_DARK : '#6d6d6d' };
      }
      
      ${levelsMap[ level ]}
      ${ isActiveItem ? `
      color: ${ COLOR_PRIMARY_TEXT_UNDER_DARK };
      font-weight: bolder;
      ` : '' }
      ` }
        onClick={ this.onWholeLineClick }
      >
        <span onClick={ this.onLabelClick }>{ label } </span>
        
      {
        foldable &&
        <span
        css={css`
          margin: 0 0 0 7px;
          font-size: 12px;
        `}  onClick={ this.onFoldIconClick }>
         { isExpanding ? '∧' : '∨' }
        </span> 
      }
         
      </div>

      {
        this.isExpanding && items && items.map( (item, index) => <Category key={index} category={ item } level={ level + 1 } paddingLeft={ paddingLeft }/> )
      }
    </div>
  }
}