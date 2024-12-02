import React from "react"
import Change from "./Change"

import "../CSS/WordContainer.css"
import "../CSS/WordSettings.css"

export default class Word extends React.Component {
    constructor(props) {
      super(props)
      this.clickWord = this.clickWord.bind(this)
    }
    
    clickWord() {
      this.props.updateSelectedCombination(this.props.combinationID)
      this.props.updateSelectedWordIdx(this.props.wordIdx)
    }
    
    render() {
      let selected = (this.props.selectedWordIdx === this.props.wordIdx) && (this.props.combinationID === this.props.selectedCombinationID)
      
      return (
        <span className="wordContainer" >
          <span className="word"  onClick={this.clickWord}>{this.props.word}</span>
          {selected && this.props.type !== 0 && <Change handleChange={this.props.handleChange}/>}
        </span>
      )
    }
  }
  