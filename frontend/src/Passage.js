import React from "react";
import {withTranslation} from "react-i18next";
const sanitizeHtml = require('sanitize-html');

class Passage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            guesses: 0
        }
    }

    componentDidMount() {
        document.addEventListener('guess', event => this.setState({'guesses': event.detail.count}));
    }

    render() {
        const lines = this.props.lines.map((line, i)=>
            <span className={"line" + (i <= this.state.guesses ? " shown" : "")} key={i} dangerouslySetInnerHTML={{
                __html: sanitizeHtml(line, {
                    allowedTags: ['em'],
                    allowedAttributes: []
                })
            }}>
            </span>
        );
        return (
            <div className="PhraseContainer">
                {lines}
            </div>
        )
    }
}

export default withTranslation()(Passage);