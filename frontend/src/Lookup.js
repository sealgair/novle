import ServerComponent from "./ServerComponent";
import {escapeRegExp, removeDiacritics} from "./utils";
import {withTranslation} from "react-i18next";
import React from "react";

class Lookup extends ServerComponent {

    constructor(props) {
        super(props);
        this.state = {
            value: "",
            selected: 0,
            books: []
        };

        this.handleKeypress = this.handleKeypress.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.selectBook = this.selectBook.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.loadBooks = this.loadBooks.bind(this);
    }

    handleKeypress(event) {
        let selected = this.state.selected;
        let books = this.filteredBooks();
        let bcount = books.length;

        if (event.code === "ArrowDown") {
            if (selected === null) {
                selected = bcount - 1;
            } else {
                selected -= 1;
            }
            if (selected < 0) {
                selected = null;
            }
        } else if (event.code === "ArrowUp") {
            if (selected === null) {
                selected = 0;
            } else {
                selected += 1;
            }
            if (selected >= bcount) {
                selected = null;
            }
        }
        if (event.code === "Enter") {
            if (selected === null) {
                selected = 0;
            } else {
                let book = books[selected];
                this.selectBook(book);
            }
        }
        this.setState({selected: selected});
    }

    handleChange(event) {
        this.guessId = null;
        this.setState({value: event.target.value, selected: null});
        this.props.onSelect();
    }

    handleSelect(event) {
        this.selectBook({id: event.target.value, title: event.target.textContent});
    }

    handleBlur(event) {
    }

    selectBook(book) {
        if (book) {
            this.guessId = book.id;
            this.setState({value: book.title});
            this.props.onSelect(book);
        }
    }

    filteredBooks() {
        const rd = removeDiacritics;
        const query = rd(this.state.value);
        const patterns = query.split(" ").map(t => new RegExp('\\b' + escapeRegExp(t), 'gi'));
        return this.state.books.filter(book => patterns.reduce(
            (p, pat) => p && (rd(book.title + ' ' + book.alternate_titles).match(pat) || rd(book.authors.join(' ')).match(pat)),
            true
        ));
    }

    bookName(book, year) {
        if (year) {
            return `${book.title} (${book.authors.join(', ')}, ${book.year})`;
        } else {
            return `${book.title} (${book.authors.join(', ')})`;
        }
    }

    render() {
        if (this.props.answer) {
            let answer = this.state.books.filter(b => b.id === this.props.answer);
            if (answer.length === 1) {
                answer = this.bookName(answer[0], true);
            } else {
                answer = "";
            }
            return <div className="LookupWrapper" aria-live="polite">
                <input type="text" className="Guess Lookup" aria-label="correct answer"
                       disabled value={answer}/>
            </div>;
        }

        let filtered = "";
        let selected = null;
        if (!this.guessId && this.state.value) {
            const self = this;
            let list = this.filteredBooks().map(function (book, i) {
                let classes = "Book";
                if (i === self.state.selected) {
                    classes += " Selected";
                    selected = book;
                }
                return (
                    <li className={classes} key={book.id} value={book.id} role="option" aria-selected={self.state.selected}
                        onClick={self.handleSelect} id={"book-" + book.id}>
                        {self.bookName(book)}
                    </li>);
            });
            filtered = (
                <ul className="BookList" id="books" aria-label="books" role="listbox">
                    {list}
                </ul>
            )
        }
        const t = this.props.t;
        return (
            <div className="LookupWrapper">
                <label className="Hidden" htmlFor="guess-lookup">{t("lookup.description")}</label>
                <input id="guess-lookup" type="text" className="Guess Lookup" autoFocus role="combobox"
                       placeholder={t("lookup.prompt")} value={this.state.value}
                       aria-controls="Books"
                       aria-autocomplete="list"
                       aria-expanded={filtered ? "true" : "false"}
                       aria-activedescendant={selected ? "Book-" + selected.id : "none"}
                       onBlur={this.handleBlur}
                       onChange={this.handleChange} onKeyDown={this.handleKeypress}/>
                {filtered}
            </div>
        )
    }

    componentWillUnmount() {
        this.state.books = [];
    }

    loadBooks() {
        this.fetch("/books.json",
            (result) => {
                this.setState({
                    books: result
                })
            }
        );
    }

    componentDidMount() {
        this.loadBooks();
    }
}

export default withTranslation()(Lookup);
