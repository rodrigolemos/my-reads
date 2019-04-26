import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';
import SortBy from 'sort-by';
import ReactLoading from 'react-loading';
import DebounceInput from 'react-debounce-input';

class SearchBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      books: [],
      loading: false,
    };
  }

  /**
   * Atualiza consulta de livros de acordo com
   * campo de pesquisa
   */
  updateQuery = query => {
    /**
     * Caso campo esteja preenchido, atualiza estado da query
     * e recupera livros da BooksAPI
     */
    if (query) {
      this.setState(
        {
          query: query.trim(),
          loading: true,
        },
        () => {
          BooksAPI.search(query).then(books => {
            /**
             * Em caso de erro, seta livros como array
             * vazio para exibição da prateleira
             */
            if (books.error) {
              books = [];
            }
            this.setState({ books, loading: false });
          });
        }
      );
    } else {
      this.setState({ query: '', books: [], loading: false });
    }
  };

  render() {
    let booksToDisplay = [];

    /**
     * Quando a consulta estiver preenchida e não tiver
     * retornado erro da API
     */
    if (this.state.query && !this.state.books.error) {
      booksToDisplay = this.state.books;

      /**
       * Livros que já foram categorizados na página principal
       * permanecem com sua categoria
       */
      booksToDisplay.forEach(book => {
        if (this.props.shelfBooks.find(b => b.id === book.id)) {
          let bookinshelf = this.props.shelfBooks.filter(x => x.id === book.id);
          book.shelf = bookinshelf[0].shelf;
        }
      });
    }

    /**
     * Ordena livros por título
     */
    booksToDisplay.sort(SortBy('title'));

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <DebounceInput
              placeholder="Search by title or author"
              minLength={2}
              debounceTimeout={400}
              onChange={e => this.updateQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {this.state.loading ? (
            <ReactLoading type="spin" color="green" className="loading" />
          ) : (
            <div className="list-books">
              <div className="list-books-content">
                <BookShelf
                  section="Books Found"
                  books={booksToDisplay}
                  changeBookShelf={this.props.changeBookShelf}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SearchBook;
