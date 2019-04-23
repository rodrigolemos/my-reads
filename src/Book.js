import React, { Component } from 'react';

class Book extends Component {
    
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.style = {
            width: 128,
            height: 193,
            backgroundImage: `url(${this.props.book.imageLinks.thumbnail})`
        }
    }
    
    handleChange(event) {
        this.props.changeBookShelf(this.props.book, event.target.value);
    }

    render() {
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                    <div className="book-cover" style={this.style}></div>
                    <div className="book-shelf-changer">
                        <select defaultValue={this.props.book.shelf} onChange={this.handleChange} >
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
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
