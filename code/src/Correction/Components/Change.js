import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck, faRectangleXmark } from '@fortawesome/free-solid-svg-icons'

import '../CSS/Change.css'

export default class Change extends React.Component {
    constructor(props) {
      super(props)
      
      this.handleClick = this.handleClick.bind(this)
    }
    
    handleClick(ChangeOrNot) {
      // console.log(this.props.resultMap)
      // let copy = JSON.parse(JSON.stringify(this.props.resultMap)) // deep copy
      // let newMap = updateMap(copy, this.props.selectedCombinationID, ChangeOrNot)
      // this.props.updateResultMap(this.props.resultMap, newMap)
      
      // 從WordField傳下來的
      console.log("A")
      this.props.handleChange(ChangeOrNot)
    }
  
    render() {
      return (
        <span className="change-btn-container">
        <button className="function-bar-button button-green change-btn"
        onClick={(e) => this.handleClick(true)}>
              <FontAwesomeIcon icon={faSquareCheck}/>
            </button>
                
        <button className="function-bar-button button-red change-btn"
        onClick={(e) => this.handleClick(false)}>
              <FontAwesomeIcon icon={faRectangleXmark}/>  
        </button>
          </span>
      )
    }
  }