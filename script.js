var API_KEY = "94c3dbc622abfee90c62edf339a49fc4";
var url = `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=Cher&api_key=${API_KEY}&format=json&limit=5`;

var albumsDiv = document.querySelector("#albums");
var artistList = document.querySelector("#artistList");
const artistTitle = document.querySelector("#artistTitle");

var searchInput = document.querySelector("#artistSearch");
var searchButton = document.querySelector("#searchButton");

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    showAlbums(data);
  })
  .catch(error => console.error("Virhe:", error));


function showAlbums(data) {
  let albums = data.topalbums.album;
  let output = "";

  albums.forEach(album => {
    const image = album.image[2]["#text"];

    output += `
      <div class="album-card">
        <img src="${image}" alt="${album.name}">
        <h3>${album.name}</h3>
        <p>Artist: ${album.artist.name}</p>
        <p>Listeners: ${album.listeners}</p>
      </div>
    `;
  });
  albumsDiv.innerHTML = output;
}