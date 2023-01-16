import propTypes from 'prop-types';
import style from '../ImageGalleryItem/ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ images }) => {
  return (
    <>
      {images.map(image => (
        <li key={image.id} className={style.imageGalleryItem}>
          <img
            src={image.webformatURL}
            alt={image.tags}
            className={style.imageGalleryItemImage}
          />
        </li>
      ))}
    </>
  );
};

ImageGalleryItem.propTypes = {
  images: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      webformatURL: propTypes.string.isRequired,
      alt: propTypes.string,
    })
  ),
};