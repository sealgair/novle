import ServerComponent from "./ServerComponent";
import {getData, setData} from "./utils";
import Share from "./Share";
import React from "react";
import Lookup from "./Lookup";
import {withTranslation} from "react-i18next";

const HINTS = {
    [-1]: 'fa-arrow-down',
    [1]: 'fa-arrow-up',
    [0]: 'fa-check',
    [true]: 'fa-check',
    [false]: 'fa-xmark',
}

class Guesses extends ServerComponent {

    constructor(props, context) {
        super(props, context);
        let done = false;
        let success = false;
        let guesses = [];
        if (this.props.puzzle) {
            let data = getData('guess' + this.props.puzzle.order);
            if (Array.isArray(data)) {
                guesses = data;
                success = guesses[guesses.length - 1].success;
                done = success || guesses.length >= 6;
                if (done) {
                    this.dispatchGuess(6);
                } else {
                    this.dispatchGuess(guesses.length);
                }
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

    dispatchGuess(count) {
        const customEvent = new CustomEvent('guess', { detail: { count: count } });
        document.dispatchEvent(customEvent);
    }

    makeGuess() {
        if (this.state.guessing) {
            return;
        }
        const params = new URLSearchParams({
            book: this.state.guess.id,
            puzzle: this.props.puzzle.id,
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
                if (done) {
                    this.dispatchGuess(6);
                } else {
                    this.dispatchGuess(guesses.length);
                }

                if (this.props.puzzle.order) {
                    setData('guess' + this.props.puzzle.order, this.state.guesses);
                    if (done) {
                        let scores = getData('scores') || {};
                        let score;
                        if (result.success) {
                            score = guesses.length;
                        } else {
                            score = 'X';
                        }
                        scores[this.props.puzzle.order] = score;
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
                return (<li className="Guess Hints" key={n}>
                    <div className="author hint">
                        <div className="wrapper">{guess.author}</div>
                        <i className={`icon fa-solid ${HINTS[guess.hint.author]}`}></i>
                    </div>
                    <div className="bookTitle hint">
                        <div className="wrapper">{guess.book}</div>
                        <i className={`icon fa-solid ${HINTS[guess.hint.book]}`}></i>
                    </div>
                    <div className="year hint" title={t('guess.yearHint', {
                        context: {[-1]: 'early', [0]: 'right', [1]: 'late'}[guess.hint.year]
                    })}>
                        <div className="wrapper">{guess.year}</div>
                        <i className={`icon fa-solid ${HINTS[guess.hint.year]}`}></i>
                    </div>
                </li>);
            } else {
                return (<li className="Guess Empty" key={n}/>);
            }
        });

        let lookup = "";
        let button = "";
        if (this.state.done) {
            button = <Share success={this.state.success} guesses={this.state.guesses}
                            puzzle={this.props.puzzle}/>;
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