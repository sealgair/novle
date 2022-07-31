import React from "react";
import {withTranslation} from "react-i18next";

class Passage extends React.Component {

    render() {
        const lines = this.props.lines.map((n, i)=>
            <span class={"line" + (i === 0 ? " shown" : "")} key={i}>{n}</span>
        );
        return (
            <div className="PhraseContainer">
                {lines}
            </div>
        )
    }
}

export default withTranslation()(Passage);