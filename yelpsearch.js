function yelpSearch(searchTerm) {
    const yelp = require('yelp-fusion');

    const apiKey = 'UAKsM-LiqMJRkxK8HO3GGjAqRsznetWwRK-bucrwgbrqfTKkMt4SYhqpfLGrwYvdYFM2evbLWpTe9jxRLFZZDJbLgqMfvju2YTmMXc6xAAJaHqAuHJemjwkKbiZYXnYx';

    const client = yelp.client(apiKey);

    let searchResponse = 'its not working';

    function setResponse(response) {
        searchResponse = new Array();
        for (var i = 0; i < response.jsonBody.businesses.length; i++) {
            searchResponse.push(response.jsonBody.businesses[i].name);
        }
    }

    client.search(searchTerm)
        .then((response) =>
            setResponse(response)
        )
        .then(() => {
            this.searchResponse = searchResponse;
        })
        .catch((error) => {
            console.log(error);
        });

}

module.exports = {
    yelpSearch: yelpSearch
}

