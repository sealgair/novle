import React from "react";
import ModalComponent from "./ModalComponent";
import {withTranslation} from "react-i18next";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import CloseIcon from '@mui/icons-material/Close';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

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
                                    <DoneOutlineIcon/>
                                </div>
                                <div className="bookTitle hint">
                                    Oliver Twist
                                    <CloseIcon/>
                                </div>
                                <div className="year hint">
                                    1873
                                    <ArrowUpwardIcon/>
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