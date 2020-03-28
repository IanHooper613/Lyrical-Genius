const DISCOGS_KEY = "WcMjRDILhXjDbHNvwBEm";
const DISCOGS_SECRET = "MINCKyoSTDujDzWieMQiGeAGOBcEQspu";
const APISEEDS_APIKEY =
  "ZmB4cTfin1kKUiOgRkoscUXp54GfiVyYe9xCnWhemaOBiQdVors5y17cZmKq36sU";

const DISCOGS_QUERYURL = (genre, key, secret) =>
  `https://api.discogs.com/database/search?genre=${genre}&per_page=10&page=1&key=${key}&secret=${secret}`;
const APISEEDS_QUERYURL = (artist, track, apikey) =>
  `https://orion.apiseeds.com/api/music/lyric/${artist}/${track}?apikey=${apikey}`;
const musicModal = document.getElementById("music-modal");

function fetchDiscogsData(genre) {
  // We have to append a user-agent as describe in Discogs API Documents
  // https://www.discogs.com/developers#page:home,header:home-general-information
  const Header = new Headers();
  Header.append("User-Agent", "LyricalGenius/0.1");

  const requestOptions = {
    method: "GET",
    headers: Header,
    redirect: "follow"
  };

  return fetch(
    DISCOGS_QUERYURL(genre, DISCOGS_KEY, DISCOGS_SECRET),
    requestOptions
  )
    .then(response => response.json())
    .then(result => result)
    .catch(error => console.error(error));
}

function fetchLyricData(artist, track) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };


  return fetch(APISEEDS_QUERYURL(artist, track, APISEEDS_APIKEY), requestOptions)
    .then(response => response.json())
    .catch(error => console.log("error", error));
}

// Modal
function toggleModal(element) {
  document.documentElement.classList.toggle("is-clipped");
  element.classList.toggle("is-active");
}

// Close Events
document
  .querySelectorAll(".modal-background, .modal-close", ".close")
  .forEach(function(el) {
    el.addEventListener("click", function() {
      toggleModal(musicModal);
    });
  });

const musicModal = document.getElementById("music-modal");
const musicBtn = document.getElementById("music-modalBtn");

musicBtn.addEventListener("click", function() {
  toggleModal(musicModal);
});


// updateModal take a track name, artist name, cover art image url. and artist image url as arguments
// NOTICE: Call toggleModal AFTER you update the modal
function updateModal(track, artist, coverArt, artistImage) {
  const musicCoverArt = document.getElementById("modal-cover-art");
  const musicArtistImage = document.getElementById("modal-artist-image");
  const musicTrack = document.getElementById("modal-track");
  const musicArtist = document.getElementById("modal-artist");
  const musicLyrics = document.getElementById("music-lyrics");

  musicCoverArt.setAttribute("src", coverArt || "");
  musicArtistImage.setAttribute("src", artistImage || "");
  musicTrack.textContent = track || "Failed to get track name";
  musicArtist.textContent = artist || "Failed to get artist name";

  fetchLyricData(artist, track)
    .then(data => {
      musicLyrics.innerText = data.result.track.text || "No Lyrics Found.";
    })
}


function createRow(track, artist, coverArt, artistArt) {
  const box = document.createElement("div");

  box.className = "box has-background-black has-text-white";

  let content = ` <article class="media">
  <div class="media-left">
    <figure class="image is-96x96">
      <img src="${coverArt}" class="is-rounded" alt="Image">
    </figure>

  </div>
  <div class="media-content">
    <h5 class="trackName">${track}</h5>
    <br>
    <h5 class="artistName">${artist}</h5>
  </div>

  <figure class="image is-128x128">
    <img src="${artistArt}" class="" alt="Image">
  </figure>`;

  box.innerHTML = content;

  rows.appendChild(box);
}

let enterSearch = document.getElementById("search-input");
const form = document.getElementById("search-form");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  fetchDiscogsData(enterSearch.value).then(function(data) {
    //console.log(data.results)

    const newform = data.results;
    newform.forEach(element => {
      console.log(element);

      createRow();
      function createRow(track, year, coverArt, artistArt) {
        const box = document.createElement("div");

        track = element.title;
        year = element.year;
        coverArt = element.cover_image;
        artistArt = element.thumb;

        box.className = "box has-background-black has-text-white";

        let content = ` <article class="media">
        <div class="media-left">
          <figure class="image is-96x96">
            <img src="${artistArt}" class="is-rounded" alt="Image">
          </figure>
      
        </div>
        <div class="media-content">
          <h5 class="trackName">${track}</h5>
          <br>
          <h5 class="artistName">${year}</h5>
        </div>
      
        <figure class="image is-128x128">
          <img src="${coverArt}" class="" alt="Image">
        </figure>`;

        box.innerHTML = content;
        box.addEventListener("click", function() {
          toggleModal(musicModal);
        });

        rows.appendChild(box);
      }
    });
  });
});
