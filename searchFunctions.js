const yelp = require('./yelpsearch')
const yelpSearch = yelp.yelpSearch;

/*
 * Variations of request to Yelp API's search function
 */
function termSearch(term, location) {
    search = new yelpSearch({ term: term, location: location })
    var response;
    setTimeout(function () {
        response = search.searchResponse;
    }, 1000)
    setTimeout(function () {
        return response;
    }, 1500)
}

function catSearch(term, location, category) {
    search = new yelpSearch({ term: term, location: location, category: category })
    var response;
    setTimeout(function () {
        response = search.searchResponse;
    }, 1000)
    setTimeout(function () {
        return response;
    }, 1500)
}

function priceSearch(term, location, price) {
    search = new yelpSearch({ term: term, location: location, price: price })
    var response;
    setTimeout(function () {
        response = search.searchResponse;
    }, 1000)
    setTimeout(function () {
        return response;
    }, 1500)
}

function openSearch(term, location) {
    search = new yelpSearch({ term: term, location: location, open_now: true })
    var response;
    setTimeout(function () {
        response = search.searchResponse;
    }, 1000)
    setTimeout(function () {
        return response;
    }, 1500)
}

function dealsSearch(term, location) {
    search = new yelpSearch({ term: term, location: location, attributes: "deals" })
    var response;
    setTimeout(function () {
        response = search.searchResponse;
    }, 1000)
    setTimeout(function () {
        return response;
    }, 1500)
}

// outputting response to the console during the second timeout works
function ratingSearch(term, location) {
    search = new yelpSearch({ term: term, location: location, sort_by: "rating" })
    var response;
    setTimeout(function () {
        response = search.searchResponse;
    }, 2000)
    setTimeout(function () {
        return response;
    }, 3000)
}

function nearSearch(term, location) {
    search = new yelpSearch({ term: term, location: location, sort_by: "distance" })
    var response;
    setTimeout(function () {
        response = search.searchResponse;
    }, 1000)
    setTimeout(function () {
        return response;
    }, 1500)
}


module.exports = {
    termSearch: termSearch,
    catSearch: catSearch,
    priceSearch: priceSearch,
    openSearch: openSearch,
    dealsSearch: dealsSearch,
    ratingSearch: ratingSearch,
    nearSearch: nearSearch
}