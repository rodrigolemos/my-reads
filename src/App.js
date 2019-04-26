import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import './App.css';
import BookShelf from './BookShelf';
import SearchBook from './SearchBook';
import ReactLoading from 'react-loading';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      books: [],
      loading: true,
      dcateg: ['Currently Reading', 'Want to Read', 'Read'],
      vcateg: ['currentlyReading', 'wantToRead', 'read']
    };
  }

  /**
   * Recupera livros da BooksAPI
   */
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books, loading: false });
    });
  }

  /**
   * Atualiza prateleira do livro movido na API
   * através do metodo update e atualiza livros
   * no state com a nova prateleira
   */
  changeBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book]),
      }));
    });
  };

  render() {
    return (
      <div className="app">
        {this.state.loading ? (
          <ReactLoading
            type="spin"
            color="green"
            className="loading"/>
        ) : (
          <Route
            exact
            path="/"
            render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  {this.state.vcateg.map( (categ, i) => (
                    <BookShelf
                      key={i}
                      section={this.state.dcateg[i]}
                      books={this.state.books.filter(book => book.shelf === categ)}
                      changeBookShelf={this.changeBookShelf}
                    />
                  ))}
                </div>
                <div className="open-search">
                  <Link to="/search">
                    <button>Search</button>
                  </Link>
                </div>
              </div>
            )}
          />
        )}
        <Route
          path="/search"
          render={() => (
            <SearchBook
              shelfBooks={this.state.books}
              changeBookShelf={this.changeBookShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
