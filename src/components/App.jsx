import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from '../../src/fetch.js';
import styles from '../../src/styles.module.css';
import Loader from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    inputValue: '',
    page: 1,
    images: [],
    modalImg: '',
    status: 'idle',
    showBtn: false,
    showModal: false,
  };

  getInputValue = value => {
    this.setState({
      inputValue: value,
      page: 1,
      images: [],
      modalImg: '',
      status: 'idle',
      showBtn: false,
      showModal: false,
    });
  };

  renderImages = () => {
    const { inputValue, page } = this.state;

    fetchImages(inputValue, page)
      .then(response => {
        if (response.hits.length === 0) {
          toast.error('нажаль, нічого не знайдено 🥺');
          return;
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
          status: 'resolved',
          showBtn: page < Math.ceil(response.totalHits / 12),
        }));
      })
      .catch(error => this.setState({ status: 'rejected' }));
  };

  onClickLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.inputValue !== this.state.inputValue ||
      (prevState.page !== this.state.page && this.state.page > 1)
    ) {
      this.renderImages();
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  getLargeImg = url => {
    this.toggleModal();
    this.setState({ modalImg: url });
  };

  render() {
    const { status, showBtn, showModal, modalImg, images } = this.state;
    return (
      <section className={styles['App']}>
        <Searchbar onSubmit={this.getInputValue} />
        {status === 'pending' ? <Loader /> : null}
        <ImageGallery onClick={this.getLargeImg} images={images} />
        {showBtn && <Button onClick={this.onClickLoadMore} />}
        {showModal && <Modal url={modalImg} onClose={this.toggleModal} />}
        <ToastContainer autoClose={3000} />
      </section>
    );
  }
}
