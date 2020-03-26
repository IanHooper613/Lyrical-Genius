const DISCOGS_KEY = "TwyCggwPpiEBbWtlRqtO";
const DISCOGS_SECRET = "dJyxJpRgpfQZEDYXTcefbxebMahziUUN";
const APISEEDS_APIKEY = "xRcHqoqt0DBCmxCKucnYZ7WvmOHMIlkLEcfoCZnqiCFbUXoADEypBn3GITKx531b"

const DISCOGS_QUERYURL = (genre, key, secret) => `https://api.discogs.com/database/search?genre=${genre}&per_page=10&page=1&key=${key}&secret=${secret}`
const APISEEDS_QUERYURL = (artist, track, apikey) => `https://orion.apiseeds.com/api/music/lyric/${artist}/${track}?apikey=${apikey}`

function fetchDiscogsData(genre) {
  // We have to append a user-agent as describe in Discogs API Documents
  // https://www.discogs.com/developers#page:home,header:home-general-information
  const Header = new Headers();
  Header.append("User-Agent", "LyricalGenius/0.1");
  
  const requestOptions = {
    method: 'GET',
    headers: Header,
    redirect: 'follow'
  };
  
  return fetch(DISCOGS_QUERYURL(genre, DISCOGS_KEY, DISCOGS_SECRET), requestOptions)
    .then(response => response.json())
    .then(result => result)
    .catch(error => console.error(error));
}

function fetchLyricData(artist, track) {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  return fetch(APISEEDS_APIKEY(artist, track, APISEEDS_APIKEY), requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

console.log(fetchDiscogsData('Hip Hop'))
console.log(fetchLyricData('Post Malone', 'rockstar'))
