//API avain last.fm palveluun
var API_KEY = "94c3dbc622abfee90c62edf339a49fc4";

//Haettu html elementit 
var albumsDiv = document.querySelector("#albums");
var artistList = document.querySelector("#artistList");
const artistTitle = document.querySelector("#artistTitle");

var searchInput = document.querySelector("#artistSearch");
var searchButton = document.querySelector("#searchButton");

//Artisti lista
var artists = ["Nightwish", "Apulanta", "HIM", "Lordi", "PMMP", "Darude"];

//Jokaiselle artistille oma painike 
artists.forEach(function (artist) {
  var button = document.createElement("button");
  button.textContent = artist;

  button.addEventListener("click", function () {
    getAlbums(artist);
  });

  artistList.appendChild(button);
});
//Voi myös hakea muutakin artistia, kuin listalla olevat 
searchButton.addEventListener("click", function () {
  var artist = searchInput.value;

  if (artist != "") {
    getAlbums(artist);
  }
});

//Haetaan oikeat albumit 
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
//Näyttää oikeat albumit
function showAlbums(data) {
  let albums = data.topalbums.album;
  let output = "";

  //Käydä albumit läpi ja sitten jokaisesta oma kortti
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

//Lisätään albumi kortit sivulle
  albumsDiv.innerHTML = output;

//Haetaan biisit jokaiselle albumille
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

  //Jos apista löytyy albumin biisejä, näytetään ne listana. 
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
