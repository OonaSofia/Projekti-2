var API_KEY = "94c3dbc622abfee90c62edf339a49fc4";

var albumsDiv = document.querySelector("#albums");
var artistList = document.querySelector("#artistList");
const artistTitle = document.querySelector("#artistTitle");

var searchInput = document.querySelector("#artistSearch");
var searchButton = document.querySelector("#searchButton");

var artists = ["Cher", "Adele", "Coldplay", "Rihanna", "Madonna"];

artists.forEach(function (artist) {
  var button = document.createElement("button");
  button.textContent = artist;

  button.addEventListener("click", function () {
    getAlbums(artist);
  });

  artistList.appendChild(button);
});

searchButton.addEventListener("click", function () {
  var artist = searchInput.value;

  if (artist != "") {
    getAlbums(artist);
  }
});

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    showAlbums(data);
  })
  .catch((error) => console.error("Virhe:", error));

function showAlbums(data) {
  let albums = data.topalbums.album;
  let output = "";

  albums.forEach((album) => {
    var image = album.image[2]["#text"];

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
getAlbums("Rihanna");