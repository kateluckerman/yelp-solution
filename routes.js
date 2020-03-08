var express = require("express");
var router = express.Router();

const yelp = require('./yelpsearch')
const yelpSearch = yelp.yelpSearch;

function setName(term) {
    var termName;
    switch (term) {
        case "restaurants":
        case "shopping": {
            termName = term;
            break;
        }
            break;
        case "night": {
            termName = "night life";
            break;
        }
        case "active": {
            termName = "activities";
            break;
        }
        case "beauty": {
            termName = "beauty and spas";
            break;
        }
        case "auto": {
            termName = "automotive services";
            break;
        }
        case "home": {
            termName = "home services";
            break;
        }
        default: {
            termName = term;
        }
    }
    return termName;
}

router.get("/", function (req, res) {
    res.render("index");
});

router.get('/indexOption/:term', function (req, res) {
    var term = req.params.term;
    var termName = setName(term);

    res.render("locationrequest.ejs", {
        "term": term,
        "termName": termName
    })
});

router.get('/indexOption', function (req, res) {
    var term = req.query.term;
    var termName = setName(term);

    res.render("locationrequest", {
        "term": term,
        "termName": termName
    })
});

router.get('/location/:term', function (req, res) {
    var term = req.params.term;
    var location = req.query.location;

    var termName = setName(term);

    res.render("termOptions", {
        "term": term,
        "location": location,
        "termName": termName
    });

});

router.get('/cuisine', function (req, res) {
    var term = req.query.term;
    var location = req.query.location;

    res.render("cuisine", {
        term: term,
        location: location
    })
});

router.get('/cuisine/options', function (req, res) {
    var term = req.query.category;
    var location = req.query.location;

    var termName = setName(term);

    res.render("cuisineOptions", {
        "term": term,
        "location": location,
        "termName": termName
    });

});

router.get('/result/default/:location', function (req, res) {
    var location = req.params.location;
    var term = req.query.term;
    var choice = term;
    var termName = term;
    var response = '';

    search = new yelpSearch({ term: term, location: location })
    setTimeout(function () {
        response = search.searchResponse;
    }, 2000)

    setTimeout(function () {
        res.render("searchResponse", {
            "term": term,
            "location": location,
            "response": response,
            "termName": termName,
            "choice": choice
        });
    }, 2100)
});


router.get('/result/:choice', function (req, res) {
    var choice = req.params.choice;
    var term = req.query.term;
    var location = req.query.location;
    var termName = setName(term);
    var response = '';

    if (choice == "price") {
        var price = req.query.price;
        search = new yelpSearch({ term: term, location: location, price: price })
        setTimeout(function () {
            response = search.searchResponse;
        }, 2000)
    }

    if (choice == "rating") {
        // ideally this would go in another function but async is making it hard
        search = new yelpSearch({ term: term, location: location, sort_by: "rating" })
        setTimeout(function () {
            response = search.searchResponse;
        }, 2000)
    }

    if (choice == "open-now") {
        search = new yelpSearch({ term: term, location: location, open_now: true })
        setTimeout(function () {
            response = search.searchResponse;
        }, 2000)
    }

    if (choice == "deals") {
        search = new yelpSearch({ term: term, location: location, attributes: "deals" })
        setTimeout(function () {
            response = search.searchResponse;
        }, 2000)
    }

    if (choice == "near-me") {
        search = new yelpSearch({ term: term, location: location, sort_by: "distance" })
        setTimeout(function () {
            response = search.searchResponse;
        }, 2000)
    }

    if (choice == "cuisine") {
        var category = req.query.category;
        search = new yelpSearch({ term: term, location: location, categories: category})
        setTimeout(function () {
            response = search.searchResponse;
        }, 2000)
    }

    if (choice == "reservations") {
        search = new yelpSearch({ term: term, location: location, attributes: "reservation" })
        setTimeout(function () {
            response = search.searchResponse;
        }, 2000)
    }

    if (choice == "waitlist") {
        search = new yelpSearch({ term: term, location: location, attributes: "waitlist_reservation" })
        setTimeout(function () {
            response = search.searchResponse;
        }, 2000)
    }

    if (choice == "delivery") {
        search = new yelpSearch({ term: term, location: location, categories: "fooddeliveryservices" })
        setTimeout(function () {
            response = search.searchResponse;
        }, 2000)
    }


    setTimeout(function () {
        res.render("searchResponse", {
            "term": term,
            "location": location,
            "response": response,
            "termName": termName,
            "choice": choice
        });
    }, 2100)
});
    


/*
        var responseInterval = setInterval(function () {
            if (!(response == '' || typeof response == 'undefined')) {
                clearInterval(responseInterval);
                setTimeout(function () { console.log(response) }, 5000);
            }
            response = searches.ratingSearch(term, location);
        }, 1000);
        */


module.exports = router;
