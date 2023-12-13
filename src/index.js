import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { articleTemplate, createOptions } from './js/create-markup';

const refs = {
  selectElement: document.querySelector('.breed-select'),
  article: document.querySelector('.cat-info'),
  errorElement: document.querySelector('.error'),
  loaderElement: document.querySelector('.loader'),
  loadingElement: document.querySelector('.loaders'),
};

hideError();
hideBoxHidden();

fetchBreeds()
  .then(({ data }) => {
    const options = createOptions(data);

    refs.selectElement.innerHTML = options;
  })
  .catch(error => {
    Notify.failure(' The item was not found!');
    hideBoxHidden();
    showError();
  })
  .finally(() => {
    hideLoader();
    hideloading();
  });

// ================================================================

refs.selectElement.addEventListener('change', onSelectChange);
hideLoader();
hideloading();

function onSelectChange(event) {
  event.preventDefault();
  const breedId = event.target.value;
  showLoader();
  showloading();

  fetchCatByBreed(breedId)
    .then(({ data }) => {
      console.log(data);

      const url = data[0].url;
      const name = data[0].breeds[0].name;
      const description = data[0].breeds[0].description;
      const temperament = data[0].breeds[0].temperament;
      const origin = data[0].breeds[0].origin;
      const alt_names = data[0].breeds[0].alt_names;
      const wikipedia_url = data[0].breeds[0].wikipedia_url;

      const markup = articleTemplate({
        url,
        description,
        name,
        temperament,
        origin,
        alt_names,
        wikipedia_url,
      });

      refs.article.innerHTML = markup;
      hideError();
    })
    .catch(error => {
      Notify.failure(' The item was not found!');
      hideBoxHidden();
      showError();
    })
    .finally(() => {
      hideLoader();
      hideloading();
    });

  showBoxHidden();
}

// ============== LOADER =================

// під-завантаження іконки імітуючої завантаження
function showloading() {
  refs.loadingElement.classList.remove('is-hidden');
}
function hideloading() {
  refs.loadingElement.classList.add('is-hidden');
}

// під-заванатаження тексту: "Loading data, please wait..."
function showLoader() {
  refs.loaderElement.classList.remove('is-hidden');
}

function hideLoader() {
  refs.loaderElement.classList.add('is-hidden');
}

// завантаження/приховування головного контейнера
function showBoxHidden() {
  refs.article.classList.remove('is-hidden');
}

function hideBoxHidden() {
  refs.article.classList.add('is-hidden');
}

// завантаження сповіщення про помилку
function showError() {
  refs.errorElement.classList.remove('is-hidden');
}

function hideError() {
  refs.errorElement.classList.add('is-hidden');
}
