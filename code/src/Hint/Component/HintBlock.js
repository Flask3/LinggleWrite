import React from "react";

import "../CSS/Hint.css"

export default class HintBlock extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let pattern = this.props.content["pattern"]
        let ngram = this.props.content["ngram"]
        let example = this.props.content["example"]
        
        return (
            <div className="hintblock">
                <span className="pattern">{pattern}</span>
                {example !== "0" && <span className="example">{highlightNgram(ngram, example)}</span>}
            </div>
        )
    }
}

function highlightNgram(ngram, example) {
    let ngram_idx = example.indexOf(ngram)
    let ngram_length = ngram.length
    
    if (ngram_idx !== -1) {
        let returning_list = []
        
        returning_list.push(<span>{example.slice(0, ngram_idx)}</span>)
        returning_list.push(<span className="ngram">{example.slice(ngram_idx, ngram_idx + ngram_length)}</span>)
        returning_list.push(<span>{example.slice(ngram_idx + ngram_length)}</span>)

        return returning_list
    }
    else {
        return example
    }
}