import React, { Component } from 'react';
import { fetchImages } from '../../services';
import { Loader } from 'components/Loader/Loader';
import propTypes from 'prop-types';
import style from '../ImageGallery/ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';

export class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    status: 'idle',
    error: null,
    inputValue: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevValue = prevProps.inputValue;
    const nextValue = this.props.inputValue;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevValue !== nextValue) {
      this.setState({
        status: 'pending',
        images: [],
        page: 1,
        inputValue: nextValue,
      });

      try {
        const res = await fetchImages(nextValue, nextPage);
        this.setState(prevState => ({
          status: 'resolved',
          images: [...prevState.images, ...res.hits],
        }));
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    } else if (prevPage !== nextPage) {
      this.setState({ status: 'pending' });

      try {
        const res = await fetchImages(nextValue, nextPage);
        this.setState(prevState => ({
          status: 'resolved',
          images: [...prevState.images, ...res.hits],
        }));
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }
  }

  LoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

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
      return <Loader />;
    }

    if (status === 'resolved' && images.length > 0) {
      return (
        <>
          <ul className={style.gallery}>
            <ImageGalleryItem images={this.state.images}></ImageGalleryItem>
          </ul>
          <Button type="button" onClick={this.LoadMore}></Button>
        </>
      );
    }

    if (status === 'rejected' || images.length === 0) {
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
  inputValue: propTypes.string.isRequired,
};
