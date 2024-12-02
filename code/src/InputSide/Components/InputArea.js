import React from "react";
import TextareaAutosize from 'react-textarea-autosize';
import { fetch_url ,InputText } from "../../data";
import "../CSS/InputArea.css"

export default class InputArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: "Correct",
      resData: null
    }

    this.onInputChange = this.onInputChange.bind(this)
    this.onCorrectionMethodChange = this.onCorrectionMethodChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.restoreSelection = this.restoreSelection.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  restoreSelection() {
    if (typeof(this.input)==='object'&&this.input!==null) {
      const selectionStart = this.state.selectionStart
      const selectionEnd = this.state.selectionEnd
      if (typeof(selectionStart)==='number') {
        this.input.selectionStart = selectionStart
        this.input.focus()
      }
      if (typeof(selectionEnd)==='number'&&selectionEnd!==selectionStart) {
        this.input.selectionEnd = selectionEnd
      }
    }
  }

  componentDidMount() {
    // used to test if requests are send through
  }

  onInputChange(e) {
    this.props.changeInputHandler(e.target.value)
  }

  onCorrectionMethodChange(e) {
    this.props.changeCorrectionMethodHandler(e.target.value)
  }

  handleKeyPress(e) {
    if (e.key === " ") {

      var text = String(e.target.value)
      
      var lastSpaceIndex = text.lastIndexOf(' ', e.target.selectionStart - 1)
      var lastWord = text.substring(lastSpaceIndex, e.target.selectionStart).trim()

      if (lastWord !== "") {
        this.props.updateHintWord(lastWord)
      }
    }
  }

  handleSelect(e) {
    if (e.target.selectionStart !== e.target.selectionEnd) {
      var text = String(e.target.value)
      var selectionWord = text.slice(e.target.selectionStart,e.target.selectionEnd).trim()

      if (selectionWord !== "") {
        this.props.updateHintWord(selectionWord)

      }
    }
  }

  render() {
    return (
      <textarea
      
          placeholder="Type something here..."
          className="input-textfield"
          value={this.props.input}
          onChange={this.onInputChange}
          onKeyPress={this.handleKeyPress}
          onSelect={this.handleSelect} />

    );
  }
}
