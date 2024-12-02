import React, { Fragment } from "react";

import InputArea from "../../InputSide/Components/InputArea";
import WordField from "../../Correction/Components/WordField";
import FetchRawParagraph from "../Functions/FetchRawParagraph";
import { fetch_url, InputText, Result } from "../../data";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faArrowLeft, faUserCheck, faUser } from '@fortawesome/free-solid-svg-icons'

import "../CSS/Translator.css"
import Cookies from "universal-cookie";
import LoginOutPage from "../../Login/LoginOutPage";

export default class Translator extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        input: "",
        correctionMethod: "",
        output: "",
        hintWord: "",
        currentMap: null,
        submitted: false,
        disabled: true,
        userName: null,
        currentPage: "Home" // Home, Login, Logout
      };
      
      // 目前的Output是Fetch過後的結果!!! 注意
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleCorrectionMethodChange = this.handleCorrectionMethodChange.bind(this);
      this.onClickSubmit = this.onClickSubmit.bind(this);
      this.onClickChangeback = this.onClickChangeback.bind(this);
      this.updateCurrentMap = this.updateCurrentMap.bind(this);
      this.updateHintWord = this.updateHintWord.bind(this);
      this.updateUserInfo = this.updateUserInfo.bind(this);
      this.updateCurrentPage = this.updateCurrentPage.bind(this);
    }
    
    componentDidMount() {

      // loads cookie
      const cookies = new Cookies()
      let cookie_displayName = cookies.get('displayName')
      console.log(cookie_displayName)
      
      if (this.state.userName === null && typeof(cookie_displayName) !== 'undefined'){  
        console.log("hey")
        this.setState({
          userName: cookie_displayName
        })
      }

      // test
      // fetch(fetch_url + "/predict",
      // {
      //   method: "POST",
      //   credentials: 'include',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json'
      //   },
      //     body: JSON.stringify({
      //   "sent": this.state.input
      // })})
      // .then((res) =>  { 
      //   if (res.ok) {
      //     return res.json();
      //   }

      //   throw new Error('Internet Error');
      // })
      // .then((data) => {
      //   if (data.length === 0) {
      //     throw new Error('Return Length 0');
      //   }
      // })
      // .catch ((e) => {
      //  })
    }

    handleInputChange(Text) {
      this.setState({
        input: Text,
        disabled: (Text.length ? false : true)
      })
    }
    
    handleCorrectionMethodChange(Text) {
      this.setState({
        correctionMethod: Text
      })
    }
    
    onClickSubmit() {
      /*
      ******* Login first 的部分 *******
      */
     
      // if (this.state.userName === null) {
      //   alert("Please login first.")
      //   return
      // }

      const that = this;
      that.setState({
        disabled: true
      })

      // 等能連上之後把下面取消註解
      fetch(fetch_url + "/predict",
      {
        method: "POST",
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
          body: JSON.stringify({
        "sent": this.state.input
      })})
      .then((res) =>  { 
        if (res.ok) {
          return res.json();
        }

        throw new Error('Internet Error');
      })
      .then((data) => {
        if (data.length === 0) {
          throw new Error('Return Length 0');
        }
        else {

          that.setState({
            output: data,
            submitted: true,
            disabled: false
          })

          that.tab = "Result"
        }
      })
      .catch ((e) => {
        that.setState({
          disabled: false
        })})
        
    }
      
    onClickChangeback() {
      let paragraph = FetchRawParagraph(this.state.currentMap)

      this.setState({
        input: paragraph,
        output: "",
        currentMap: null,
        submitted: false
      })

      this.tab = "Hint"
    }
    
    updateCurrentMap(map) {
      this.setState({
        currentMap: map
      })
    }
    
    updateHintWord(word) {
      this.setState({
        hintWord: word
      })
    }

    updateCurrentPage(Page) {
      this.setState({
        currentPage: Page
      })
    }
    updateUserInfo(AuthResult) {
      this.setState({
        userName: AuthResult.displayName
      }, function() {
        // set cookie
        if (AuthResult.displayName !== null) {
          console.log("登入")
          const cookies = new Cookies()
          cookies.set("displayName", AuthResult.displayName, { path: '/'})
          cookies.set("email", AuthResult.email, { path: '/'})
          cookies.set("uid", AuthResult.uid, { path: '/' })
        }
        else {
          console.log("登出")
          const cookies = new Cookies()
          cookies.remove("displayName", {path: "/"})
          cookies.remove("email", { path: "/"})
          cookies.remove("uid", { path: "/" })
        }
      })
    }

    render() {
      return (
        
        <Fragment>
          {this.state.currentPage === "LoginOut" ? <LoginOutPage 
              updateUserInfo = {this.updateUserInfo}
              updateCurrentPage = {this.updateCurrentPage}
              userName = {this.state.userName}
              login = {this.state.userName ? true : false} /> 
              : 
          <div className="entire-container">
          <nav className="nav">
          <div className="img-container">
            <img src={require("./linggle-logo.png")} alt="linggle-logo" onClick={() => this.updateCurrentPage("Home")}></img>
          </div>
          <div className="login-btn-container">
            <button className="login-btn" 
                    onClick={() => this.updateCurrentPage("LoginOut")}>
              {this.state.userName ? 
               <span><FontAwesomeIcon icon={faUserCheck}/>  {this.state.userName} </span> : "Login"}
            </button>
            </div>
          </nav>
        <div className="input-output-container">
          <div className="input-container">
            <div className="input-top"></div>
              <div className="input-area">
          <InputArea 
            input={this.state.input}
            changeInputHandler={this.handleInputChange} 
            changeCorrectionMethodHandler={this.handleCorrectionMethodChange}
            updateHintWord={this.updateHintWord}
            submitted={this.state.submitted}
            />
            {<button 
            disabled={this.state.disabled} 
            className="convertBtn"
              onClick={this.onClickSubmit}>
                <FontAwesomeIcon icon={faPaperPlane} />
                </button>}
           
            {
            this.state.submitted ? 
            <button className="convertBtn_back"
              onClick={this.onClickChangeback}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </button> : 
            <div>
              </div>
                }
              </div>
          </div>
          
            <div className="wordfield-container">
            <WordField
              output={this.state.output}
              updateCurrentMap={this.updateCurrentMap} 
              submitted={this.state.submitted}
              hintWord={this.state.hintWord}/>
            </div>
        </div>
        <div className="footer">

        </div>
       
        </div>
      }
        </Fragment>
      )}
  }