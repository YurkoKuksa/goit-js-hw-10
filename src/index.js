import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  selectElement: document.querySelector('.breed-select'),
  article: document.querySelector('.cat-info'),
  errorElement: document.querySelector('.error'),
  loaderElement: document.querySelector('.loader'),
  loadingElement: document.querySelector('.loaders'),
};

hideError();
hideBoxHidden();

fetchBreeds().then(resp => {
  const options = resp.data
    .map(item => {
      return `<option value="${item.id}">${item.name}</option>`;
    })
    .join('');

  refs.selectElement.innerHTML = options;
});

// ================================================================

refs.selectElement.addEventListener('change', onSelectChange);
hideLoader();
hideloading();

function onSelectChange(event) {
  const breedId = event.target.value;
  showLoader();

  showloading();

  fetchCatByBreed(breedId)
    .then(({ data }) => {
      const url = data[0].url;
      const name = data[0].breeds[0].name;
      const description = data[0].breeds[0].description;

      const markup = articleTemplate({ url, description, name });

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

// /============                =============

// ================ RENDER ==================

function articleTemplate({ url, description, name }) {
  return `<img
        class="pic"
        src="${url}"
        alt=""
        width="360"
      />
      <div class="info-box">
        <h1 class="title">${name}</h1>
        <p class="article">
         ${description}
        </p>
      </div>`;
}

// // ============== LOADER =================

function showloading() {
  refs.loadingElement.classList.remove('is-hidden');
}
function hideloading() {
  refs.loadingElement.classList.add('is-hidden');
}
function showLoader() {
  refs.loaderElement.classList.remove('is-hidden');
}

function hideLoader() {
  refs.loaderElement.classList.add('is-hidden');
}

function showBoxHidden() {
  refs.article.classList.remove('is-hidden');
}

function hideBoxHidden() {
  refs.article.classList.add('is-hidden');
}

function showError() {
  refs.errorElement.classList.remove('is-hidden');
}

function hideError() {
  refs.errorElement.classList.add('is-hidden');
}
