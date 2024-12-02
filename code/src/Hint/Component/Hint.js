import React, { Fragment } from "react";

import "../CSS/Hint.css"
import { fetch_url, Hint_Result } from "../../data";
import HintBlock from "./HintBlock";

export default class Hint extends React.Component {
    constructor(props) {
        super(props)

        // this.sendRequest = this.sendRequest.bind(this)
    }

    render() {
        return (
            <Fragment>
                <div className="container-hintblock">
                  {this.props.hintResult.map(item => <HintBlock content={item} />)}
                </div>
            </Fragment>
        )
    }

}