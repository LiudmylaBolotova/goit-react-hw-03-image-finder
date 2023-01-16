import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const API = (q, page) => {
  const options = {
    params: {
      key: '29672596-80b7f00160ec49143013d00d9',
      q: '',
      id: '',
      image_type: 'photo',
      orientation: 'horizontal',
      page: 1,
      per_page: 12,
    },
  };

  return axios.get('baseURL', options);
};
