import React from "react"
import AddPropsToWord from "../Functions/AddPropsToWord"
import "../CSS/WordSettings.css"

export default class Correction extends React.Component {
    constructor(props) {
      super(props)
    }
    
    handleClick(event) {
      this.props.updateSelectedCombination(this.props.combinationID)
      }
    
    render() {
      
      AddPropsToWord(this.props.pushedArr, this.props.selectedCombinationID, this.props.selectedWordIdx,
        this.props.updateSelectedWordIdx, this.props.updateSelectedCombination, this.props.handleChange, -1)
  
  
      return (
        <span 
          className={this.props.combinationID === this.props.selectedCombinationID ? 
          "correction selected" : "correction"} 
          key={this.props.key}>
          
          {this.props.pushedArr}
        </span>
      )
    }
  }
  