const container = document.querySelector('.slider');
function myHttpRequest({ method, url } = {}, cb) {
  try {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.addEventListener('load', () => {
      if (Math.floor(xhr.status / 100) !== 2) {
        cb(`Error. Status code: ${xhr.status}`, xhr);
        return;
      }
      const response = JSON.parse(xhr.responseText);
      cb(null, response);
    });

    xhr.addEventListener('error', () => {
      cb(`Error. Status code: ${xhr.status}`, xhr);
    });

    xhr.send();
  } catch (error) {
    cb(error);
  }
}


function cardTemplate(post){
  console.log(post);
  const item = document.createElement('div');
  item.classList.add('slider__item');
  const img_container = document.createElement('div');
  img_container.classList.add('slider__img');
  const img = document.createElement('img');
  img.setAttribute('src',` https://image.tmdb.org/t/p/w500${post.poster_path}`);
  img.setAttribute('alt', `${post.original_title}`);
  const info = document.createElement('div');
  info.classList.add('slider__info');
  const h1 = document.createElement('h1');
  h1.classList.add('slider__header');
  h1.textContent = `${post.original_title}`;
  info.appendChild(h1);
  img_container.appendChild(img);
  img_container.appendChild(info);
  item.appendChild(img_container);
  return item;
}

function renderFilm(res){
  const fragment = document.createDocumentFragment();
  res.forEach(post => {
    const card = cardTemplate(post);
    fragment.appendChild(card);
  });
  container.appendChild(fragment);
}

myHttpRequest({
  method: 'GET',
  url: 'https://api.themoviedb.org/3/trending/movie/day?api_key=19cc2d55ec287216302aaf07144d9835',
  },
  (err, res) => {
    if(err){
      alert(err);
      return;
    }
    renderFilm(res.results);
  }
);