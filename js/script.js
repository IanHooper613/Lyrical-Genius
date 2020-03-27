const DISCOGS_KEY = "WcMjRDILhXjDbHNvwBEm";
const DISCOGS_SECRET = "MINCKyoSTDujDzWieMQiGeAGOBcEQspu";
const APISEEDS_APIKEY = "ZmB4cTfin1kKUiOgRkoscUXp54GfiVyYe9xCnWhemaOBiQdVors5y17cZmKq36sU";

const DISCOGS_QUERYURL = (genre, key, secret) =>
  `https://api.discogs.com/database/search?genre=${genre}&per_page=10&page=1&key=${key}&secret=${secret}`;
const APISEEDS_QUERYURL = (artist, track, apikey) =>
  `https://orion.apiseeds.com/api/music/lyric/${artist}/${track}?apikey=${apikey}`;

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
    .then(response => response.text())
    .then(result => result)
    .catch(error => console.log("error", error));
}

console.log(fetchDiscogsData("Hip Hop"));
console.log(fetchLyricData("Post Malone", "rockstar"));

// Modal
function toggleModal(element) {
  document.documentElement.classList.toggle("is-clipped");
  element.classList.toggle("is-active");
}

// Close Events
document.querySelectorAll(".modal-background, .modal-close", ".close").forEach(function(el) {
  el.addEventListener("click", function() {
    toggleModal(musicModal);
  });
});

const musicModal = document.getElementById("music-modal");
const musicBtn = document.getElementById("music-modalBtn")

musicBtn.addEventListener("click", function() {
  toggleModal(musicModal);
});


let enterSearch = document.getElementById("search-input")
const form = document.getElementById("search-form")
form.addEventListener("submit", function(event) {
  event.preventDefault()

fetchDiscogsData (enterSearch.value).then(function(data) {
  //console.log(data.results)

  const newform = data.results
  newform.forEach(element => {
    console.log(element)
    
  });
  
})
})
   