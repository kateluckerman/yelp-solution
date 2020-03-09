const yelp = require('yelp-fusion');

const apiKey = 'UAKsM-LiqMJRkxK8HO3GGjAqRsznetWwRK-bucrwgbrqfTKkMt4SYhqpfLGrwYvdYFM2evbLWpTe9jxRLFZZDJbLgqMfvju2YTmMXc6xAAJaHqAuHJemjwkKbiZYXnYx';

const client = yelp.client(apiKey);

/*
 * Accesses business search endpoint of the Yelp fusion API given search terms and stores
 * the names, ids, and coordinates of results.
 */
function yelpSearch(searchTerm) {    

    let businessNames = '';
    let businessIds = '';
    let businessLats = '';
    let businessLongs = '';

    function setResponse(response) {
        businessNames = new Array();
        businessIds = new Array();
        businessLats = new Array();
        businessLongs = new Array();
        for (var i = 0; i < response.jsonBody.businesses.length; i++) {
            businessNames.push(response.jsonBody.businesses[i].name);
            businessIds.push(response.jsonBody.businesses[i].id);
            businessLats.push(response.jsonBody.businesses[i].coordinates.latitude);
            businessLongs.push(response.jsonBody.businesses[i].coordinates.longitude);
        }
    }

    client.search(searchTerm)
        .then((response) => {
            setResponse(response);
        }
        )
        .then(() => {
            this.businessNames = businessNames;
            this.businessIds = businessIds;
            this.businessLats = businessLats;
            this.businessLongs = businessLongs;
        })
        .catch((error) => {
            console.log(error);
        });

}

/*
 * Accesses the rich business details endpoint of the Yelp fusion API given business id and
 * stores the name, image, url, rating, and location.
 */
function businessSearch(id) {

    client.business(id)
        .then((response) => {
            searchResponse = response.jsonBody;
        })
        .then(() => {
            this.response = {
                name: searchResponse.name,
                image_url: searchResponse.image_url,
                url: searchResponse.url,
                rating: searchResponse.rating,
                location: searchResponse.location
            }
        })
        .catch((error) => {
            console.log(error);
        });

}

module.exports = {
    yelpSearch: yelpSearch,
    businessSearch: businessSearch
}

