import React, { Component } from 'react';

class Book extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * Evento atribuido ao onChange do select para
     * trocar livro de prateleira
     */
    handleChange(event) {
        this.props.changeBookShelf(this.props.book, event.target.value);
    }

    render() {

        /**
         * Se livro não possuir autor, atribui autor desconhecido
         */
        if ( typeof this.props.book.authors === 'undefined' || this.props.book.authors.length === 0 ) {
            this.props.book.authors = ['Unknown Author'];
        }

        /**
         * Somente atribui imagem do livro caso exista
         */
        const style = { width: 128, height: 193 };
        let images = this.props.book.imageLinks;
        if ( typeof images !== 'undefined' ) {
            style.backgroundImage = `url(${images.thumbnail})`
        }

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                    <div className="book-cover" style={style}></div>
                    <div className="book-shelf-changer">
                        <select defaultValue={(this.props.book.shelf) ? this.props.book.shelf : 'none'} onChange={this.handleChange} >
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
