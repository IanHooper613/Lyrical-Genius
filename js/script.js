const DISCOGS_KEY = 'WcMjRDILhXjDbHNvwBEm';
const DISCOGS_SECRET = 'MINCKyoSTDujDzWieMQiGeAGOBcEQspu';
const APISEEDS_APIKEY =
  'ZmB4cTfin1kKUiOgRkoscUXp54GfiVyYe9xCnWhemaOBiQdVors5y17cZmKq36sU';

const DISCOGS_QUERYURL = (genre, key, secret) => `https://api.discogs.com/database/search?genre=${genre}&per_page=10&page=1&key=${key}&secret=${secret}`;
const APISEEDS_QUERYURL = (artist, track, apikey) => `https://orion.apiseeds.com/api/music/lyric/${artist}/${track}?apikey=${apikey}`;

const rows = document.getElementById('rows');
const searchInput = document.getElementById('search-input');
const form = document.getElementById('search-form');
const musicModal = document.getElementById('music-modal');
const musicCoverArt = document.getElementById('modal-cover-art');
const musicTrack = document.getElementById('modal-track');
const musicArtist = document.getElementById('modal-artist');
const musicLyrics = document.getElementById('music-lyrics');

function fetchDiscogsData(genre) {
  // We have to append a user-agent as describe in Discogs API Documents
  // https://www.discogs.com/developers#page:home,header:home-general-information
  const Header = new Headers();
  Header.append('User-Agent', 'LyricalGenius/0.1');

  const requestOptions = {
    method: 'GET',
    headers: Header,
    redirect: 'follow',
  };

  return fetch(
    DISCOGS_QUERYURL(genre, DISCOGS_KEY, DISCOGS_SECRET),
    requestOptions,
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

function fetchLyricData(artist, track) {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  return fetch(APISEEDS_QUERYURL(artist, track, APISEEDS_APIKEY), requestOptions)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

// This will toggle the modal visibility
function toggleModal(element) {
  document.documentElement.classList.toggle('is-clipped');
  element.classList.toggle('is-active');
}

// updateModal take a track name, artist name, cover art image url. and artist image url as arguments
// NOTICE: Call toggleModal AFTER you update the modal
function updateModal(track, artist, coverArt, artistImage) {
  musicCoverArt.setAttribute('src', coverArt || '');
  musicTrack.textContent = track || 'Failed to get track name';
  musicArtist.textContent = artist || 'Failed to get artist name';

  fetchLyricData(artist, track)
    .then((data) => {
      musicLyrics.innerText = data.result.track.text || 'No Lyrics Found.';
    })
}

// This create all the row and take a track year, coverArt
function createRow(track, year, coverArt) {
  const box = document.createElement('div');

  box.className = 'box has-background-dark has-text-white';
  box.setAttribute('data-track', track);
  box.setAttribute('data-year', year);
  box.setAttribute('data-coverArt', coverArt);

  const content = ` <article class="media">
  <figure class="media-left image is-128x128">
    <img src="${coverArt}" class="" alt="Image">
  </figure>
  <div class="media-content">
    <h2 class="trackName title has-text-white is-4">${track}</h2>
    <h3 class="artistName subtitle has-text-white">${year}</h3>
  </div>
  </article>`;

  box.innerHTML = content;
  box.addEventListener('click', function () {
    updateModal(this.getAttribute('data-track'), this.getAttribute('data-year'), this.getAttribute('data-coverArt'), this.getAttribute('data-artistArt'))
    toggleModal(musicModal);
  });

  rows.appendChild(box);
}

// Close Modal Events
document
  .querySelectorAll('.modal-background, .modal-close', '.close')
  .forEach(function (el) {
    el.addEventListener('click', function () {
      toggleModal(musicModal);
    });
  });

// Search Form EventListener
form.addEventListener('submit', function (event) {
  event.preventDefault();

  fetchDiscogsData(searchInput.value).then(function (data) {
    const discogData = data.results;
    discogData.forEach((element) => {
      const track = element.title;
      const year = element.year;
      const coverArt = element.cover_image;

      createRow(track, year, coverArt);
    });
  });
});
