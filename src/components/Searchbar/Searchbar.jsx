import { useState } from 'react';
import { toast } from 'react-toastify';
import styles from './Searchbar.style.module.css';
import PropTypes from 'prop-types';
export const Searchbar = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSearch = e => {
    e.preventDefault();
    if (input.trim() === '') {
      return toast.error(
        'Хм,здається,ви вирішили випробувати "пошук нічого"😉'
      );
    }
    onSubmit(input);
    setInput('');
  };

  return (
    <header className={styles['Searchbar']}>
      <form className={styles['SearchForm']} onSubmit={handleSearch}>
        <button type="submit" className={styles['SearchForm-button']}>
          <span>🔎</span>
        </button>

        <input
          value={input}
          className={styles['SearchForm-input']}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
