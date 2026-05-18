var API_KEY = "94c3dbc622abfee90c62edf339a49fc4";
var url = `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=Cher&api_key=${API_KEY}&format=json&limit=5`;

var albumsDiv = document.querySelector("#albums");

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    showAlbums(data);
  })
  .catch(error => console.error("Virhe:", error));
