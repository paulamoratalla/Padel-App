let map

let longitude = (document.getElementById('latitudeMatch').innerHTML) *1
let latitude = (document.getElementById('longitudeMatch').innerHTML) *1

function initMap() {
    renderMap()
    clubMarkers()
}

function renderMap() {

    const { Map, Marker } = google.maps

    map = new Map(
        document.querySelector('#matchMap'),
        {
            center: { lat: latitude, lng: longitude },
            zoom: 10,
        }
    )
}

// function getClubs() {

//     axios.get('/api/clubs')
//         .then(({ data }) => clubMarkers(data))
//         .catch(err => console.log(err))
// }

function clubMarkers() {

    const { Marker } = google.maps

    

        const position = {
            lat: latitude,
            lng: longitude,
        }

        new Marker({ position, map })
    }
