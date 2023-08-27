import { Component } from 'react';
import { toast } from 'react-toastify';
import styles from './Searchbar.style.module.css';
import PropTypes from 'prop-types';
export class Searchbar extends Component {
  state = {
    input: '',
  };

  handleChange = e => {
    this.setState({ input: e.target.value });
  };

  handleSearch = e => {
    e.preventDefault();
    if (this.state.input.trim() === '') {
      return toast.error(
        'Хм,здається,ви вирішили випробувати "пошук нічого"😉'
      );
    }
    this.props.onSubmit(this.state.input);
    this.setState({ input: '' });
  };

  render() {
    return (
      <header className={styles['Searchbar']}>
        <form className={styles['SearchForm']} onSubmit={this.handleSearch}>
          <button type="submit" className={styles['SearchForm-button']}>
            <span>🔎</span>
          </button>

          <input
            value={this.state.input}
            className={styles['SearchForm-input']}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
