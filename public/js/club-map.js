let map

function initMap() {
    renderMap()
    getClubs()
}

function renderMap() {

    const { Map, Marker } = google.maps

    map = new Map(
        document.querySelector('#clubsMap'),
        {
            center: { lat: 40.392499, lng: -3.698214 },
            zoom: 10,
        }
    )
}

function getClubs() {

    axios.get('/api/clubs')
        .then(({ data }) => clubMarkers(data))
        .catch(err => console.log(err))
}

function clubMarkers(clubs) {

    const { Marker } = google.maps

    clubs.forEach(club => {

        const position = {
            lat: club.location.coordinates[1],
            lng: club.location.coordinates[0],
        }

        new Marker({ position, title: club.name, map })
    })
}