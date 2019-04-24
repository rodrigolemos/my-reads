import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';
import escapeRegExp from 'escape-string-regexp';
import SortBy from 'sort-by';

class SearchBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            books: []
        };
    }

    updateQuery = (query) => {

        BooksAPI.search(query).then((books) => {

            this.setState({ query, books });

        });

    }

    render() {

        let booksToDisplay, match;

        if (this.state.query) {

            if ( typeof this.state.books !== 'undefined' && !this.state.books.error ) {

                match = new RegExp(escapeRegExp(this.state.query), 'i');
                booksToDisplay = this.state.books.filter( (book) => match.test(book.title) || match.test(book.authors) );

            } else {

                booksToDisplay = [];

            }

        } else {

            booksToDisplay = [];
        }

        booksToDisplay.sort(SortBy('name'));

        return (
            <div className="search-books">
                <div className="search-books-bar">
                  <Link to="/">
                    <button className="close-search">Close</button>
                  </Link>
                  <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title or author"
                        onChange={ (e) => this.updateQuery(e.target.value) }
                    />
                  </div>
                </div>
                <div className="search-books-results">
                    <div className="list-books">
                        <div className="list-books-content">
                            <BookShelf
                                section="Books Found"
                                books={booksToDisplay}
                                changeBookShelf={this.props.changeBookShelf}
                            />
                        </div>
                    </div>
                  <ol className="books-grid">
                  </ol>
                </div>
            </div>
        );
    }
}

export default SearchBook;
