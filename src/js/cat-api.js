import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_XAoghxTuYGT21J3oQYBcUUSnHeTq8RrXZ29cIzjJVhi3fSzCczl4jrgVCvSbmRyL';

export function fetchBreeds() {
  const BASE_URL = 'https://api.thecatapi.com/v1';
  const END_POINT = '/breeds';
  return axios.get(`${BASE_URL}${END_POINT}`);
}

export function fetchCatByBreed(breedIds) {
  const BASE_URL = 'https://api.thecatapi.com/v1/';
  const END_POINT = 'images/search';

  return axios.get(`${BASE_URL}${END_POINT}?breed_ids=${breedIds}`);
}

// fetch(url)
//   .then(message)
//   .then(value)
//   .catch(err => {})
//   .finally();

// const url = `?${PARAMS}`;

// fetchBreeds();
