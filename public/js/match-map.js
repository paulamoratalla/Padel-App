let map
let markerLoc = false 

function initMap() {
    renderMap()
    // getClubs()
    getCoords()
    setMarker()
}

function renderMap() {

    const { Map, Marker } = google.maps

    map = new Map(
        document.querySelector('#matchMap'),
        {
            center: { lat: 40.392499, lng: -3.698214 },
            zoom: 10,
        }
    )
}


function setMarker() {
    
    if (markerLoc === false) {
        
        const image =
        "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
        const beachMarker = new google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map,
            icon: image,
        });
        
        google.maps.event.addListener(pointer, 'dragend', function (event) {
            getCoords();
        });
        
        
    } else {
        beachMarker.setPosition({ lat: latitude, lng: longitude })
    }
}

function getCoords() {
    google.maps.event.addListener(map, 'click', function (event) {
        let latitude = document.getElementById('latitudeIn').value = event.latLng.lat()
        let longitude = document.getElementById('longitudeIn').value = event.latLng.lng()

        const image =
            "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
        const beachMarker = new google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map,
            icon: image,
        });
    });

}



// function getClubs() {
//     axios.get('/api/clubs')
//         .then(({ data }) => clubMarkers(data))
//         .catch(err => console.log(err))
// }

// function clubMarkers(clubs) {

//     const { Marker } = google.maps

//     clubs.forEach(club => {

//         const position = {
//             lat: club.location.coordinates[0],
//             lng: club.location.coordinates[1],
//         }

//         new Marker({ position, title: club.name, map })
//     })
// }
