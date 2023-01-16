import React, { Component } from 'react';
import axios from 'axios';
import { Loader } from 'components/Loader/Loader';
import propTypes from 'prop-types';
import style from '../ImageGallery/ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';

export class ImageGallery extends Component {
  state = {
    images: [],
    status: 'idle',
    error: null,
  };

  componentDidUpdate(prevProps, _) {
    const prevValue = prevProps.inputValue;
    const nextValue = this.props.inputValue;

    if (prevValue !== nextValue) {
      this.setState({ status: 'pending' });

      axios
        .get(
          `https://pixabay.com/api/?q=${nextValue}&page=1&key=29672596-80b7f00160ec49143013d00d9&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(res => {
          this.setState({ status: 'resolved', images: res.data.hits });
        })
        .catch(error => {
          this.setState({ error, status: 'rejected' });
        });
    }
  }

  render() {
    const { images, status } = this.state;

    if (status === 'idle') {
      return (
        <h2 className={style.galleryText}>
          Enter a keyword in the search bar!
        </h2>
      );
    }

    if (status === 'pending') {
      return <Loader></Loader>
      
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={style.gallery}>
            <ImageGalleryItem images={images}></ImageGalleryItem>
          </ul>
          <Button></Button>
        </>
      );
    }

    if (status === 'rejected') {
      return (
        <h2 className={style.galleryTextError}>
          We didn't find the picture you were looking for :( Please try again!
        </h2>
      );
    }
  }
}

ImageGallery.propTypes = {
  images: propTypes.arrayOf(propTypes.object.isRequired),
};
