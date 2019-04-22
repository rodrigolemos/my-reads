import React, { Component } from 'react';

class Book extends Component {
    render() {
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                        <select defaultValue={this.props.book.shelf}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                        </select>
                    </div>
                    </div>
                    <div className="book-title">{this.props.book.title}</div>
                    {this.props.book.authors.map( (author, index) => (
                        <div key={index} className="book-authors">{author}</div>
                    ))}
                </div>
            </li>
        )
    }
}

export default Book;