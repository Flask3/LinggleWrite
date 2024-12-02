import React from "react";
import AddPropsToWord from "../Functions/AddPropsToWord"
import "../CSS/WordSettings.css"

export default class Deletion extends React.Component {
    constructor(props) {
      super(props)
      
    }
    
    render() {
      
      if (this.props.combinationID === this.props.selectedCombinationID) {
        // console.log("combination" + this.props.combinationID)
      }
      
      AddPropsToWord(this.props.pushedArr, this.props.selectedCombinationID, this.props.selectedWordIdx,
        this.props.updateSelectedWordIdx, this.props.updateSelectedCombination, this.props.handleChange, -1)
  
      return (
        <span 
          className={this.props.combinationID === this.props.selectedCombinationID ? 
          "deletion selected" : "deletion"} 
          key={this.props.key}>
          
          {this.props.pushedArr}
        </span>
      )
    }
  }
  