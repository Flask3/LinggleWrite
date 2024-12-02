import React from "react"
import updateMap from "../Functions/updateMap"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckDouble, faEraser } from '@fortawesome/free-solid-svg-icons'

export default class ModifyAll extends React.Component {
    constructor(props) {
      super(props)
      this.handleClick = this.handleClick.bind(this)
      this.checkIfModifiable = this.checkIfModifiable.bind(this)
    }
    
    handleClick(ChangeOrNot) {
      if (this.checkIfModifiable()) {
        let copy = JSON.parse(JSON.stringify(this.props.resultMap)) // deep copy
        let copy_length = Object.keys(copy).length
        for (let i = 0; i<copy_length; i++) {
          if (1 in copy[i] || -1 in copy[i]) {
            updateMap(copy, i, ChangeOrNot)
          }
        }
        
        this.props.updateResultMap(this.props.resultMap, copy)
      }
      
    }
    
    checkIfModifiable() {
      for (let i=0; i<Object.keys(this.props.resultMap).length; i++) {
        if (1 in this.props.resultMap[i] || -1 in this.props.resultMap[i]) {
          return true
        }
      }
  
      return false
    }
  
    render() {
      return (
        <React.Fragment>
        <button 
        className="function-bar-button button-green"
        onClick={(event) => this.handleClick(true)}>
          <FontAwesomeIcon icon={faCheckDouble} />
        </button>
        <button 
        className="function-bar-button button-red"
        onClick={(event) => this.handleClick(false)}>
          <FontAwesomeIcon icon={faEraser} />
        </button>
          </React.Fragment>
      )
    }
  }