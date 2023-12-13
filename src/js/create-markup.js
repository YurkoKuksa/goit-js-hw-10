export const createOptions = data =>
  data.map(item => `<option value="${item.id}">${item.name}</option>`).join('');

export const articleTemplate = ({
  url,
  description,
  name,
  temperament,
  origin,
  alt_names,
  wikipedia_url,
}) =>
  `<img
        class="pic"
        src="${url}"
        alt="${alt_names}"
        width="560" height="auto"
      />
      <div class="info-box">
        <h1 class="title">${name}</h1>
        <p class="article">
         ${description}
        </p>
        <p class="article"><span class="title-description ">Temperament: </span>${temperament}</p>
<p class="article"><span class="title-description ">Origin: </span>${origin}</p>

       
<p class="article title-description">     <a href="${wikipedia_url}" target="_blank">Wikipedia</a></p>
      </div>`;
