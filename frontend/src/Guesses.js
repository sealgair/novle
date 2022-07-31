import ServerComponent from "./ServerComponent";
import {getData, setData} from "./utils";
import Share from "./Share";
import React from "react";
import Lookup from "./Lookup";
import {withTranslation} from "react-i18next";

class Guesses extends ServerComponent {

    constructor(props, context) {
        super(props, context);
        let done = false;
        let success = false;
        let guesses = [];
        if (this.props.word) {
            let data = getData('guess' + this.props.word.order);
            if (Array.isArray(data)) {
                guesses = data;
                success = guesses[guesses.length - 1].success;
                done = success || guesses.length >= 6;
            }
        }
        this.state = {
            guess: null,
            guesses: guesses,
            guessing: false,
            done: done,
            success: success,
        };
        this.onSelect = this.onSelect.bind(this);
        this.handleKey = this.handleKey.bind(this);
        this.makeGuess = this.makeGuess.bind(this);
    }

    onSelect(guess) {
        this.setState({
            guess: guess,
            done: guess ? guess.success : false,
        });
    }

    handleKey(event) {
        if (this.state.guess && event.code === "Enter" && event.target.classList.contains("Lookup")) {
            this.makeGuess();
            event.preventDefault();
        }
    }

    makeGuess() {
        if (this.state.guessing) {
            return;
        }
        const params = new URLSearchParams({
            book: this.state.guess.id,
            solution: this.props.book.id,
        }).toString();
        this.setState({'guessing': true});
        this.fetch("/guess.json?" + params,
            (result) => {
                let guesses = this.state.guesses;
                guesses.push(result);
                let done = result.success || guesses.length >= 6;
                this.setState({
                    guesses: guesses,
                    guessing: false,
                    done: done,
                    success: result.success,
                    guess: null,
                    sid: result.sid,
                    mapGuess: null,
                });
                if (this.props.word.order) {
                    setData('guess' + this.props.word.order, this.state.guesses);
                    if (done) {
                        let scores = getData('scores') || {};
                        let score;
                        if (result.success) {
                            score = guesses.length;
                        } else {
                            score = 'X';
                        }
                        if (!getData('allowMaps', true)) {
                            score = score + "*";
                        }
                        scores[this.props.word.order] = score;
                        setData('scores', scores);
                    }
                }
            },
            (error) => {
                this.setState({guessing: false});
            }
        );
    }

    render() {
        const t = this.props.t;

        const numbers = [0, 1, 2, 3, 4, 5];
        const guesses = numbers.map(n => this.state.guesses[n] || false);
        const data = guesses.map(function (guess, n) {
            if (guess) {
                return (<li className="Guess Hints">

                </li>);
            } else {
                return (<li className="Guess Empty" key={n}/>);
            }
        });

        let lookup = "";
        let button = "";
        if (this.state.done) {
            button = <Share success={this.state.success} guesses={this.state.guesses}
                            book={this.props.book}/>;
        } else {
            lookup = <Lookup onSelect={this.onSelect} key={this.state.guesses.length}/>;
            button = <button tabIndex="0" className="MakeGuess Guess" onClick={this.makeGuess}
                             disabled={this.state.guessing || !this.state.guess}>{t('buttons.guess')}</button>;
        }

        return <div className="GuessWrapper">
            <ul className="Guesses">
                {data}
            </ul>
            <div className="LookupSection" onKeyDown={this.handleKey}>
                {lookup}
                {button}
            </div>
        </div>
    }
}

class Solution extends React.Component {
    render() {
        return (
            <div className="LookupWrapper" aria-live="polite">
                <input type="text" className="Guess Lookup" aria-label="correct answer"
                       disabled value={this.props.answer}/>
            </div>
        )
    }
}

export default withTranslation()(Guesses);