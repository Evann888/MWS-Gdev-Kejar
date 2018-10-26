function findLocation(x, y) {
  // console.log(x,y);
  for (var i = 0; i < places.length; i++) {
    if (places[i].lokasi[0] == x && places[i].lokasi[1] == y) {  //kalau yang diklik ada di places yang berlat dan lng sama
      return i;
    }
  }
  return -1;
}

function showLocation(e) {
  //console.log("you clicked " + e.latlng.lat + " dan "+e.latlng.lng);
  let ix = findLocation(e.latlng.lat, e.latlng.lng);
  if (ix >= 0) {
    img.src = places[ix].gambar;
    par.textContent = places[ix].review;
  }
}

let gmb = document.getElementById("gmb");
let rev = document.getElementById("review");
let img = document.createElement('img');
let par = document.createElement('p');

gmb.appendChild(img);
rev.appendChild(par);

// let r0 = "restoran spanyol di jakarta yang dekat dengan kantor saya";
// let r1 = "warung kopi cita rasa yang sangat tinggi dengan harga yang murah ";
// let r2 = "Ikan bakar kualitas tinggi, hampir gosong tapi belum";
// let r3 = "Steak lokal harga impor, 200gr dan 300gr mentah";
// let r4 = "seafood international lobster, king crabs, cumi, kerang, semua ada";
//
// let places = [{
//       "lokasi": [-6.221028, 106.791434],
//       "sponsor": "Resto Spanyol",
//       "gambar": "images/spanyol.jpg",
//       "review": r0
//     },
//     {
//       "lokasi": [-6.219912, 106.791239],
//       "sponsor": "Warung Kopi",
//       "gambar": "images/warkop.jpg",
//       "review": r1
//     },
//     {
//       "lokasi": [-6.220529, 106.789848],
//       "sponsor": "Pondok Ikan Bakar ",
//       "gambar": "images/ikan_bakar.jpg ",
//       "review ": r2
//     },
//     {
//       "lokasi": [-6.222977, 106.789152],
//       "sponsor": "STEAK cow",
//       "gambar": "images/steak.jpg",
//       "review": r3
//     },
//     {
//       "lokasi" : [-6.222043, 106.791070],
//       "sponsor": "Rupa-rupa Seafood!!",
//       "gambar" : "images/seafood.jpg ",
//       "review" : r4
//     }
// ];

const URL="data/map.json";
// let places=[ ];
fetch(URL)
  .then(function(response){
  if (response.status !== 200) { //HTTP Status
    console.log('Ada masalah. Status Code: ' + response.status);
    throw response.statusText;
  }
    return response.json()
  })
  .then ( resp => {
     let places= resp.places;
     localStorage.setItem('places', JSON.stringify(resp.places));
  })
  .catch(function(err){
    console.log(err);
});

let places= JSON.parse(localStorage.getItem('places'));
console.log(places);

for (var p of places) {
  var marker= L.marker(p.lokasi).addTo(map)
  .bindPopup(p.sponsor);
  marker.on('click', showLocation);
}
