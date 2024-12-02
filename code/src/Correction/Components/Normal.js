import React from "react"
import AddPropsToWord from "../Functions/AddPropsToWord"

export default class Normal extends React.Component {
    constructor(props) {
      super(props)
    }
    
    render() {
      AddPropsToWord(this.props.pushedArr, this.props.selectedCombinationID, this.props.selectedWordIdx,
                    this.props.updateSelectedWordIdx, this.props.updateSelectedCombination, this.props.handleChange, 0)
  
      return (
        <span 
          className="normal"
          key={this.props.key}>
          {this.props.pushedArr}
        </span>
      )
    }
  }
  