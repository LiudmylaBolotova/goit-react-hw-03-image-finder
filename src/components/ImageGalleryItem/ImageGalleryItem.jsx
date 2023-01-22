import propTypes from 'prop-types';
import { Modal } from '../Modal/Modal';
import style from '../ImageGalleryItem/ImageGalleryItem.module.css';
import { Component } from 'react';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  toggleOpen = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  openModalImage = e => {
    if (e.target.nodeName === 'IMG') {
      this.setState({ isModalOpen: true });
    }
  };

  render() {
    return (
      <>
        {this.props.images.map(
          ({ webformatURL, largeImageURL, tags, id }) => (
            <div key={id}>
              <li className={style.imageGalleryItem}>
                <img
                  src={webformatURL}
                  alt={tags}
                  className={style.imageGalleryItemImage}
                  onClick={this.openModalImage}
                />
              </li>
              {/* Не можу передати велике зображення, на яке клікнули - передається останнє */}
              {this.state.isModalOpen && (
                <Modal onClose={this.toggleOpen}>
                  <img
                    src={largeImageURL}
                    alt={tags}
                    width={800}
                    height={450}
                  />
                </Modal>
              )}
            </div>
          )
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  images: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      webformatURL: propTypes.string.isRequired,
      largeImageURL: propTypes.string.isRequired,
      alt: propTypes.string,
    })
  ),
};
