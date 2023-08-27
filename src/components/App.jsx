import React, { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from '../../src/fetch.js';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import styles from '../../src/styles.module.css';
import Loader from './Loader/Loader';

export const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [modalImg, setModalImg] = useState('');
  const [status, setStatus] = useState('idle');
  const [showBtn, setShowBtn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchKey, setSearchKey] = useState('');

  const getInputValue = value => {
    setInputValue(value);
    setPage(1);
    setImages([]);
    setModalImg('');
    setStatus('idle');
    setShowBtn(false);
    setShowModal(false);
    setSearchKey(Date.now());
  };

  const renderImages = () => {
    setStatus('pending');
    fetchImages(inputValue, page)
      .then(response => {
        if (response.hits.length === 0) {
          toast.error('нажаль, нічого не знайдено 🥺');
          setStatus('resolved');
          return;
        }

        setImages(prevImages => [...prevImages, ...response.hits]);
        setStatus('resolved');
        setShowBtn(page < Math.ceil(response.totalHits / 12));
      })
      .catch(error => setStatus('rejected'));
  };

  const onClickLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (searchKey || page > 1) {
      renderImages();
    }
  }, [searchKey, page]);

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const getLargeImg = url => {
    console.log(123);
    toggleModal();
    setModalImg(url);
  };

  return (
    <section className={styles['App']}>
      <Searchbar onSubmit={getInputValue} />
      {status === 'pending' ? <Loader /> : null}
      <ImageGallery onClick={getLargeImg} images={images} />
      {showBtn && <Button onClick={onClickLoadMore} />}
      {showModal && <Modal url={modalImg} onClose={toggleModal} />}
      <ToastContainer autoClose={3000} />
    </section>
  );
};
