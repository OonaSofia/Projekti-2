//
var API_KEY = "94c3dbc622abfee90c62edf339a49fc4";

var albumsDiv = document.querySelector("#albums");
var artistList = document.querySelector("#artistList");
const artistTitle = document.querySelector("#artistTitle");

var searchInput = document.querySelector("#artistSearch");
var searchButton = document.querySelector("#searchButton");

var artists = ["Nightwish", "Apulanta", "HIM", "Lordi", "PMMP", "Darude"];

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

function getAlbums(artist) {
  artistTitle.textContent = "Albumit " + artist;
  albumsDiv.innerHTML = "<p>Pieni hetki...</p>";
  var url = `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist}&api_key=${API_KEY}&format=json&limit=8`;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      showAlbums(data);
    })
    .catch(function (error) {
      console.error("Virhe:", error);
    });
}

function showAlbums(data) {
  let albums = data.topalbums.album;
  let output = "";

  albums.forEach(function (album, index) {
    var image = album.image[2]["#text"];

   output += `
  <div class="album-card">
    <img src="${image}" alt="${album.name}">
    <h3>${album.name}</h3>
    <p>Artisti: ${album.artist.name}</p>

    <div id="tracks-${index}" class="track-list"></div>
  </div>
`; });

  albumsDiv.innerHTML = output;

  albums.forEach(function (album, index) {
  getAlbumTracks(album.artist.name, album.name, "tracks-" + index);
});
}
function getAlbumTracks(artist, album, divId) {
  var tracksDiv = document.querySelector("#" + divId);

  var url = `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&artist=${encodeURIComponent(artist)}&album=${encodeURIComponent(album)}&api_key=${API_KEY}&format=json`;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.album && data.album.tracks && data.album.tracks.track) {
        var output = "<h4>Biisit:</h4><ul>";

        data.album.tracks.track.forEach(function (track) {
          output += "<li>" + track.name + "</li>";
        });

        output += "</ul>";
        tracksDiv.innerHTML = output;
      }
    });
}
getAlbums("PMMP");
