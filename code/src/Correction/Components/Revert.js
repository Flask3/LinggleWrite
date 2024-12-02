import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons'

export default class Revert extends React.Component {
    constructor(props) {
      super(props)
      this.handleClick = this.handleClick.bind(this)
    }
    
    handleClick () {
      let historyMaps = this.props.historyMaps
      
      if (historyMaps.length === 0) return null
      let top = historyMaps.pop()
      
      this.props.handleRevert(historyMaps, top)
    }
    
    render() {
      return (
        <button className="function-bar-button"
        onClick={this.handleClick}>
          <FontAwesomeIcon icon={faArrowRotateLeft} />
        </button>
        )
    }
  }