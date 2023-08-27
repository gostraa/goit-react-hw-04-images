import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ url, tags, onClick }) => {
  return (
    <li className={styles['ImageGalleryItem']}>
      <img
        src={url}
        alt={tags}
        className={styles['ImageGalleryItem-image']}
        onClick={() => onClick(url)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
