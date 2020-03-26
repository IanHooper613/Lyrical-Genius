const DISCOGS_KEY = "TwyCggwPpiEBbWtlRqtO";
const DISCOGS_SECRET = "dJyxJpRgpfQZEDYXTcefbxebMahziUUN";

const DISCOGS_QUERYURL = (genre, key, secret) => `https://api.discogs.com/database/search?genre=${genre}&per_page=10&page=1&key=${key}&secret=${secret}`

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

console.log(fetchDiscogsData('Hip Hop'))