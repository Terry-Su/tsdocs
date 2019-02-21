import React, { Component } from "react"
import { CategoryType } from "@/typings/Category";
import DefaultProps from "@/utils/DefaultProps";
import { navigate } from "@reach/router";

class Props extends DefaultProps {
  category: CategoryType
}

class State {
  isFolded: boolean = false
}

export default class Category extends Component<Props, State> {
  state: State
  constructor( props: Props ) {
    super( props )
    const { foldable = false, folded = false, allFolded = false } =  this.props.category
    this.state = {
      isFolded: allFolded === false ? false : folded
    }
  }

  get isExpanding(): boolean {
    return ! this.state.isFolded
  }

  onLabelClick = href => {
    if ( href != null ) {
      navigate( href )
    }
  }

  onFoldIconClick = () => {
    this.setState( prev => ({
      isFolded: ! prev.isFolded
    }) )
  }

  render() {
    const { category } =  this.props
    const { foldable = false, folded = false, allFolded = false, href } =  category
    const { label, items = [] } = category
    const { isExpanding } = this
    return <div style={{
      padding: '0 0 0 10px'
    }}>
      <div>
        <span onClick={ () => this.onLabelClick( href ) }>{ label } </span>
        
      {
        foldable && (
          isExpanding ?
        <span onClick={ this.onFoldIconClick }>
         ∧
        </span> :
        <span onClick={ this.onFoldIconClick }>
          ∨
        </span>
        )
      }
         
      </div>

      {
        this.isExpanding && items && items.map( (item, index) => <Category key={index} category={ item }/> )
      }
    </div>
  }
}