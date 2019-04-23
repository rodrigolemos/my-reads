import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import './App.css';
import BookShelf from './BookShelf';
import SearchBook from './SearchBook';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      books: []
    };
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  changeBookShelf = (book, shelf) => {
    
    BooksAPI.update(book, shelf).then( (result) => {
      
      this.state.books.forEach( (bstate) => {
        if ( bstate.id === book.id ) {
          bstate.shelf = shelf;
        }
      });
  
      this.setState({
        books: this.state.books
      });

    });
    
  }
  
  updateQuery = (query) => {
      this.setState({
         query: query.trim() 
      });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={ () => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <BookShelf
                section="Currently Reading"
                books={this.state.books.filter(book => book.shelf === 'currentlyReading')}
                changeBookShelf={this.changeBookShelf}
                />
              <BookShelf
                section="Want to Read"
                books={this.state.books.filter(book => book.shelf === 'wantToRead')}
                changeBookShelf={this.changeBookShelf}
                />
              <BookShelf
                section="Read"
                books={this.state.books.filter(book => book.shelf === 'read')}
                changeBookShelf={this.changeBookShelf}
                />
            </div>
            <div className="open-search">
              <Link to="/search">
                <button>Search</button>
              </Link>
            </div>
          </div>
        )}/>
        <Route path="/search" render={ () => (
          <SearchBook
            books={this.state.books}
            changeBookShelf={this.changeBookShelf}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp;
