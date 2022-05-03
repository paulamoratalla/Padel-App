let map

let latitude = (document.getElementById('latitudeClub').innerHTML) *1
let longitude = (document.getElementById('longitudeClub').innerHTML) *1

function initMap() {
    renderMap()
    clubMarkers()
}

function renderMap() {

    const { Map, Marker } = google.maps

    map = new Map(
        document.querySelector('#detailsMap'),
        {
            center: { lat: latitude, lng: longitude },
            zoom: 10,
        }
    )
}

function clubMarkers() {

    const { Marker } = google.maps

    

        const position = {
            lat: latitude,
            lng: longitude,
        }

        new Marker({ position, map })
    }
