import React from "react";
import {cssVar, getData, isLightMode, isTouchOnly, setData, getLines, drawArrow, drawCheck} from "./utils";
import Canvas from "./Canvas";
import {withTranslation, Trans} from "react-i18next";

class Share extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style: getData("shareStyle", "text"),
            shareName: this.baseShareName(),
            options: false,
        };
        this.options = React.createRef();
        this.scoreImage = React.createRef();
        this.toggleOptions = this.toggleOptions.bind(this);
        this.shareScore = this.shareScore.bind(this);
        this.getScore = this.getScore.bind(this);
        this.makeScore = this.makeScore.bind(this);
        this.makeScoreImage = this.makeScoreImage.bind(this);
        this.makeScoreDescription = this.makeScoreDescription.bind(this);
        this.alertShare = this.alertShare.bind(this);
        this.setTextStyle = this.setTextStyle.bind(this);
        this.setSpoilerStyle = this.setSpoilerStyle.bind(this);
        this.setImageStyle = this.setImageStyle.bind(this);
        this.setStyle = this.setStyle.bind(this);
    }

    baseShareName() {
        const t = this.props.t;
        const style = getData("shareStyle", "text");
        return style === "image" ? t("buttons.copyAlt") : t("buttons.share");
    }

    toggleOptions() {
        this.setState(prev => ({options: !prev.options}));
    }

    alertShare(newName) {
        this.setState({shareName: newName});
        setTimeout(() => this.setState({shareName: this.baseShareName()}), 3000);
    }

    getScore() {
        const scores = getData('scores');
        return scores[this.props.puzzle.order];
    }

    makeScoreImage() {
        const score = this.getScore();
        const title = `Bookle #${this.props.puzzle.order}: ${score}/6`;
        let opener = this.props.puzzle.lines[0];
        const guesses = this.props.guesses;
        const size = 30;
        const ox = 10;
        const ix = 10;
        const oy = 30;
        const ly = 10;
        return <Canvas draw={function (ctx) {
            let y = oy;
            ctx.fillStyle = cssVar('--bg-color');
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            ctx.fillStyle = cssVar('--text-color');
            ctx.font = '25px';
            ctx.fillText(title, ox, y);
            y += 30;
            ctx.font = '25px';
            getLines(ctx, opener, ox * 2).forEach(function (line, i) {
                ctx.fillText(line, ox * 2, y);
                y += 20
            });

            const boxColors = {
                [true]: cssVar('--correct-color'),
                [false]: cssVar('--guess-bg-color'),
            }
            ctx.strokeStyle = cssVar('--text-color');
            let x = ox + ix;
            guesses.forEach(function (guess, i) {
                ctx.fillStyle = boxColors[guess.hint.author];
                ctx.fillRect(x, y, size, size);

                if (guess.hint.book) {
                    ctx.font = '18px mono';
                    ctx.fillStyle = boxColors[true];
                    ctx.fillRect(x, y, size, size);
                    ctx.translate(x + size / 2, y + size / 2);
                    drawCheck(ctx, size - 10);
                } else {
                    ctx.fillStyle = cssVar('--arrow-color');
                    ctx.fillRect(x, y, size, size);
                    ctx.fillStyle = cssVar('--text-color');
                    ctx.translate(x + size / 2, y + size / 2);
                    if (guess.hint.year == -1) {
                        ctx.scale(1, -1);
                    }
                    drawArrow(ctx, size - 10);
                }
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                x += size + 5;
            });
            y += size + ly;

            ctx.fillStyle = cssVar('--text-color');
            ctx.font = '20px';
            ctx.fillText(document.URL, ox, y + 20);
        }} width={(size + 1) * 6 + (ox + ix) * 2} height={(size + ly) * (guesses.length) + 70 + oy + ly}
                       title={this.makeScoreDescription()}/>
    }

    makeScoreDescription() {
        const t = this.props.t;
        let description = [t('share.alt.title', {num: this.props.puzzle.order})];
        description.push(this.props.puzzle.lines[0]);
        const score = this.getScore();
        if (this.props.success) {
            description.push(t("share.alt.score", {count: score}));
        } else {
            description.push(t("share.alt.miss"));
        }
        this.props.guesses.forEach(function (guess, i) {
            let line = t('share.alt.guessTitle', {num: i + 1});
            if (guess.hint.book) {
                line += t('share.alt.guessRight');
            } else {
                line += t('share.alt.author', {context: guess.hint.author ? 'right' : 'wrong'}) + ', ';
                line += t('share.alt.year', {context: {[-1]: 'early', [0]: 'right', [1]: 'late'}[guess.hint.year]});
            }
            description.push(line);
        });
        description.push(t('share.alt.link', {url: document.URL}));
        return description.join("\n");
    }

    makeScore() {
        const style = this.state.style;
        const score = this.getScore();
        const title = `#Bookle #${this.props.puzzle.order}: ${score}/6\n  ${this.props.puzzle.lines[0]}`;
        if (style === "image") {
            return this.makeScoreImage();
        }

        const pubyear = {
            [-1]: '⬇️️',
            [0]: '✅',
            [1]: '⬆️',
        }
        const right = '🟩';
        const almost = '🟧';
        const wrong = isLightMode() ? '⬜' : '⬛';
        let scoreCard = [];
        if (style === "spoiler") {
            scoreCard = this.props.guesses.map(function (guess) {
                if (guess.hint.book) {
                    return right+pubyear[0];
                } else {
                    let hint = [];
                    if (guess.hint.author) {
                        hint.push(almost);
                    } else {
                        hint.push(wrong);
                    }
                    hint.push(pubyear[guess.hint.year]+' ');
                    hint.push(" ||`" + guess.book + "`||")
                    return hint.join("");
                }
            });
        } else {
            let score = "📖 " + this.props.guesses.map(function (guess) {
                if (guess.hint.book) {
                    return right+pubyear[0];
                } else {
                    return (guess.hint.author ? almost : wrong) + pubyear[guess.hint.year]
                }
            }).join(" ");
            scoreCard = [score];
        }
        scoreCard.splice(0, 0, title);
        scoreCard.push(document.URL);
        return scoreCard.join("\n");
    }

    shareScore() {
        let data = this.makeScore();
        if (this.state.style === "image") {
            data = this.makeScoreDescription();
        }
        if (isTouchOnly() && this.state.style !== "image" && navigator.share) {
            navigator.share({
                title: "Bookle",
                text: data,
            }).then(r => this.alertShare("Shared"));
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(data).then(r => this.alertShare("Copied"));
        } else {
            alert("Could not copy to clipboard, copy manually here:\n\n" + data);
        }
    }

    setStyle(style) {
        setData("shareStyle", style)
        this.setState({
            style: style,
            shareName: this.baseShareName(),
        });
    }

    setTextStyle() {
        this.setStyle("text");
    }

    setSpoilerStyle() {
        this.setStyle("spoiler");
    }

    setImageStyle() {
        this.setStyle("image");
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let height = 0;
        let opacity = 0;
        if (this.state.options) {
            height = Math.max(
                this.options.current.children[0].scrollHeight + 10,
                this.options.current.children[1].scrollHeight,
            ) + 'px';
            opacity = 1;
        }
        this.options.current.style = "height: " + height + "; opacity: " + opacity + ";";
        if (this.scoreImage.current) {
            height = 0;
            opacity = 0;
            if (!this.state.options) {
                height = this.scoreImage.current.scrollHeight + 'px';
                opacity = 1;
            }
            this.scoreImage.current.style = "height: " + height + "; opacity: " + opacity + ";";
        }
    }

    render() {
        const t = this.props.t;
        let shareClass = "Guess Share";
        if (!this.props.success) {
            shareClass += " Fail";
        }
        let instructions = "";
        let image = "";
        if (this.state.style === "image") {
            instructions = t("share.instructions", {
                "context": isTouchOnly() ? "tap" : "click"
            })
            image = (<div className="ScoreImage Foldable" ref={this.scoreImage}>
                {this.makeScoreImage()}
            </div>)
        }
        let score = this.makeScore();
        if (this.state.style !== "image") {
            score = <pre role="image" aria-label={t("share.description")}>{score}</pre>;
        }
        return <div className="ShareBox">
            <button tabIndex="0" autoFocus className={shareClass}
                    onClick={this.shareScore}>{this.state.shareName}</button>
            <div className="ShareData Foldable" ref={this.options} aria-hidden={this.state.options ? "false" : "true"}
                 style={{height: 0, opacity: 0}} aria-live="polite">
                <div className="ShareOptions" aria-label={t("share.styleChoice")}>
                    <button className={"ShareOption" + ((this.state.style === "text") ? " Selected" : "")}
                            onClick={this.setTextStyle}>{t("share.textStyle")}
                    </button>
                    <button className={"ShareOption" + ((this.state.style === "spoiler") ? " Selected" : "")}
                            onClick={this.setSpoilerStyle}>{t("share.spoilerStyle")}
                    </button>
                    <button className={"ShareOption" + ((this.state.style === "image") ? " Selected" : "")}
                            onClick={this.setImageStyle}>{t("share.imageStyle")}
                    </button>
                </div>
                <div className="ShareContent" aria-live="polite">
                    {instructions}
                    {score}
                </div>
            </div>
            {image}
            <button className="ToggleShareOptions" onClick={this.toggleOptions}>
                <Trans i18nKey="share.options">Share<br/>Options</Trans>
            </button>
        </div>;
    }
}

export default withTranslation()(Share);