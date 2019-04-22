import React, { Component } from 'react';
import Book from './Book';

class BookShelf extends Component {
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.section}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                     {(this.props.books.length) ? (
                            this.props.books.map( book => (
                                <Book key={book.id} book={book}
                                changeBookShelf={this.props.changeBookShelf} />
                            ))
                        ) : (
                            <span> There are no books in this section. </span>
                        )}
                    </ol>
                </div>
            </div>
        );
    }
}

export default BookShelf;
