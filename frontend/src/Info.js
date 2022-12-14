import React from "react";
import ModalComponent from "./ModalComponent";
import {withTranslation} from "react-i18next";

class Info extends ModalComponent {
    getTitle() {
        return this.props.t("titles.info");
    }

    contents() {
        const t = this.props.t;
        return <div className="InfoContent">
            <p>{t("info.credit")}</p>
            <p>
                <a href="https://github.com/sealgair/novle" target="_new">
                    <i className="fa-brands fa-github Icon"></i>
                    {t("info.code")}
                </a>
            </p>
            <p>
                <a href="https://twitter.com/ChaseCaster" target="_new">
                    <i className="fa-brands fa-twitter Icon"></i>
                    {t("info.tweet")}
                </a>
            </p>
            <p>
                <a rel="me" href="https://weirder.earth/@chase" target="_new">
                    <i className="fa-brands fa-mastodon Icon"></i>
                    {t("info.toot")}
                </a>
            </p>
            <p>
                {t("info.bugs")}
            </p>
            <hr/>
            <div className="links">
                <div className="title">{t("info.links")}</div>
                <a href="https://lingule.xyz" target="_blank" rel="noopener noreferrer">Lingule</a>
                <span> className="description">{t("info.lingule")}</span>
            </div>
        </div>;
    }
}

export default withTranslation()(Info);