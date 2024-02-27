const lat = 37.7509;
const lon = -122.4153;

const url = `http://localhost:4000/api/get-pollution-data?lat=${lat}&lon=${lon}`;


fetch(url)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('There was an error with the request:', error);
    });
