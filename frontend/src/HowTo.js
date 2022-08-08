import React from "react";
import ModalComponent from "./ModalComponent";
import {withTranslation} from "react-i18next";

class HowTo extends ModalComponent {
    getTitle() {
        return this.props.t("titles.how-to");
    }

    contents() {
        const t = this.props.t;
        return (
            <div>
                <p>{t("howto.intro")}</p>
                <p>{t("howto.afterGuess")}</p>
                <div className="howTo">
                    {t("howto.example.phrase")}
                    <div className="PhraseContainer">
                        <span className="line shown">It was the best of times, it was the worst of times,</span>
                    </div>

                    {t("howto.example.guess")}
                    <div className="GuessWrapper">
                        <ul className="Guesses">
                            <li className="Guess Hints">
                                <div className="author hint">
                                    Charles Dickens
                                    <i className="icon fa-solid fa-check"></i>
                                </div>
                                <div className="bookTitle hint">
                                    Oliver Twist
                                    <i className="icon fa-solid fa-xmark"></i>
                                </div>
                                <div className="year hint">
                                    1873
                                    <i className="icon fa-solid fa-arrow-up"></i>
                                </div>
                            </li>
                        </ul>
                    </div>
                    {t("howto.example.explain")}
                </div>
            </div>
        )
    }
}

export default withTranslation()(HowTo);