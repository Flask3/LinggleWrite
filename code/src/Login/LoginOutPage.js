import React from "react";
import "./CSS/LoginOutPage.css"
import { signInwithGoogle } from "./firebase_init";

export default class LoginOutPage extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div className="entire-container">
                <nav className="nav">
                    <div className="img-container">
                        <img src={require("../Translator/Components/linggle-logo.png")} alt="linggle-logo" onClick={() => this.props.updateCurrentPage("Home")}></img>
                    </div>
                </nav>
                { this.props.login ? 
                <LogoutPage 
                updateUserInfo = {this.props.updateUserInfo}
                updateCurrentPage = {this.props.updateCurrentPage}
                userName = {this.props.userName} /> 
                : 
                <LoginPage 
                    updateUserInfo = {this.props.updateUserInfo}
                    updateCurrentPage = {this.props.updateCurrentPage}
                    userName = {this.props.userName}/>}
                
            </div>

            
        )
    }
}

function LoginPage (props) {
    return (
        <div className="LogInOutPage">
            <h3 className="GreetingWords"> Login with the following accounts</h3>
            <hr className="hr" />
            
                <button className="GoogleBtn" onClick=
                    {() => {signInwithGoogle(props.updateUserInfo, props.updateCurrentPage)}}>
                    <span className="GoogleLoginWordsContainer">
                        <img className="Googleicon" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"/>
                        <span className="GoogleLoginWords">Sign in with Google</span>
                    </span>
                </button>
            <hr className="hr" />
            <div className="LoginPageBtns">
            </div>
        </div>
    )
}

function LogoutPage (props) {
    return (
        <div className="LogInOutPage">
            
                <h1 className="GreetingWords">Hello, {props.userName}!</h1>
                <hr className="hr"/>
                <div className="LogoutPageBtns">
                    <button className="LogoutBtn" onClick={onLogout}>Logout</button>
                </div>
        </div>
    )

    function onLogout() {
        props.updateCurrentPage("Home")
        props.updateUserInfo({displayName: null})
    }
}