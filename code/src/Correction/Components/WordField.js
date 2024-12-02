import React, { Fragment } from "react"

import ModifyAll from "./ModifyAll"
import Revert from "./Revert"
import getMap from "../Functions/DataPreprocess"
import updateMap from "../Functions/updateMap"
import Tagging from "../Functions/Tagging"
import Hint from "../../Hint/Component/Hint"
import { fetch_url } from "../../data"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck, faRectangleXmark, faL } from '@fortawesome/free-solid-svg-icons'

import "../CSS/WordSettings.css"
import "../CSS/WordField.css"

export default class WordField extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        selectedCombinationID: "-1",
        selectedWordIdx: -1,
        historyMaps: [],
        resultMap: "",
        currentTab: "Hint",
        hintResult: []
      }
      this.flagWithContinuousSubmit = false
      this.updateSelectedCombination = this.updateSelectedCombination.bind(this)
      this.updateSelectedWordIdx = this.updateSelectedWordIdx.bind(this)
      this.updateResultMap = this.updateResultMap.bind(this)
      this.handleRevert = this.handleRevert.bind(this)
      this.handleChange = this.handleChange.bind(this)
    }
    
    componentDidUpdate(prevProps) {

      // 要有submitted才getMap
      // 所以不會有最一開始render就getMap(null)的狀況
      
      // 其實這裡寫的有點笨，未來可以考慮再開一個component來做getMap，這樣就不用在state有更動之後才getMap
      
      // 第一次送出時：
      //  submitted  ||   prevProps.output  ||  this.props.output
      //  true       ||   ""                ||       A
      // 
      // prevProps.output 會是空的
      if ((this.props.submitted === true && prevProps.output === "" && prevProps.output !== this.props.output)) 
      {
        let map = getMap(this.props.output)
        this.setState({
          resultMap: map,
          currentTab: "Result"
        })
        this.props.updateCurrentMap(map)
      } 
      
      // 後續的送出
      // consecutiveSend是true
      // this.props.output會 *不是* 空的
      // prevProps.output !== this.props.output （非常重要，必須阻擋第一次送出更新state後掉進來）
      else if (this.props.submitted === true && this.props.output !== "" && prevProps.output !== this.props.output) {

        let map = getMap(this.props.output)
        this.setState({
          resultMap: map,
          currentTab: "Result"
        })

        this.props.updateCurrentMap(map)
      }
  
      // 改回去的時候把resultMap和historyMaps改成空的
      if (this.props.submitted === false && prevProps.submitted === true) {
   
        this.setState({
          selectedCombinationID: "-1",
          selectedWordIdx: -1,
          historyMaps: [],
          resultMap: "",
          currentTab: "Hint"
        })
        // this.flagWithContinuousSubmit=false
      }

      if (prevProps.hintWord !== this.props.hintWord) {
          let that = this;
          fetch(fetch_url + "/hint",
            {
              method: "POST",
              credentials: 'include',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                word: this.props.hintWord
              }),
            })
            .then((res) => {
              if (res.ok) {
                return res.json();
              }
  
              throw new Error('Internet Error');
            })
            .then(data => {
              that.setState({
                hintResult: data,
                currentTab: "Hint"
              })
            })
      }
    }
    updateSelectedCombination(combinationID) {
      this.setState({
        selectedCombinationID: combinationID
      })
    }
    
    updateSelectedWordIdx(idx) {
      this.setState({
        selectedWordIdx: idx
      })
    }
    
    // 改錯的
    updateResultMap(oldmap, newmap) {
      let history = this.state.historyMaps
      history.push(oldmap)
      
      this.setState({
        historyMaps: history,
        resultMap: newmap
      })
  
      this.props.updateCurrentMap(newmap)
    }
    
    // revert的
    handleRevert(historyMaps, top) {
      this.setState({
        historyMaps: historyMaps,
          resultMap: top
      })
  
      this.props.updateCurrentMap(top)
    }
    
    handleChange(ChangeOrNot) {
      let copy = JSON.parse(JSON.stringify(this.state.resultMap)) // deep copy
      let newMap = updateMap(copy, this.state.selectedCombinationID, ChangeOrNot)
      this.updateResultMap(this.state.resultMap, newMap)
      this.updateSelectedCombination("-1")
      this.updateSelectedWordIdx(-1)
      
    }
    
    changeTab(Tab) {
      this.setState({
        currentTab: Tab
      })
    }

    render() {
      let tags = Tagging(this.state.resultMap)
  
      for (let i = 0; i<tags.length; i++) {
        tags[i] = React.cloneElement(tags[i], {
        updateSelectedCombination: this.updateSelectedCombination,
          updateSelectedWordIdx: this.updateSelectedWordIdx,
          selectedCombinationID: this.state.selectedCombinationID,
          selectedWordIdx: this.state.selectedWordIdx,
          handleChange: this.handleChange
        })
      }
      
      return (
        <Fragment>
          <div className="tab">

            <button className={this.state.currentTab === "Hint" ? "tab-button cur-tab" : "tab-button"} onClick={(e) => this.changeTab("Hint")}>Hint</button>
            <button className={this.state.currentTab === "Result" ? "tab-button cur-tab" : "tab-button"} onClick={(e) => this.changeTab("Result")}>Result</button>
          </div>
          { this.state.currentTab === "Hint" && 
              <div className="hint-field">
              <Hint 
              hintResult={this.state.hintResult}>
              </Hint>
              </div>
          }
          { 
            this.state.currentTab === "Result" && 
            <div className="result-field">
              { this.props.submitted && <Fragment>
                <div className="function-bar">
                <button className="function-bar-button button-green">
                  <FontAwesomeIcon icon={faSquareCheck} />
                </button>
                <button className="function-bar-button button-red">
                  <FontAwesomeIcon icon={faRectangleXmark} />
                </button>
              
              
                <ModifyAll 
                resultMap={this.state.resultMap}
                historyMaps={this.state.historyMaps}
                updateResultMap={this.updateResultMap} />
                <Revert 
                  handleRevert={this.handleRevert}
                  historyMaps={this.state.historyMaps} />
                  </div>
                  </Fragment>
              }
            
            <div className="outputWord">
              {tags}
            </div>
          </div>
          }
        </Fragment>
      )
    }
  }