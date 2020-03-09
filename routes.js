var express = require("express");
var router = express.Router();

const yelpGeneral = require('./yelpsearch')
const yelpSearch = yelpGeneral.yelpSearch;
const businessSearch = yelpGeneral.businessSearch;

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
    var latitude = '';
    var longitude = '';

    if (location.includes("lat") && location.includes("long")) {
        latitude = location.substring(location.indexOf("lat:") + 4, location.indexOf(","));
        longitude = location.substring(location.indexOf("long:") + 5);
    }

    if (latitude != "") {
        search = new yelpSearch({ term: term, location: location })
        setTimeout(function () {
            response = search.businessNames;
        }, 3000)

        setTimeout(function () {
            res.render("searchResponse", {
                "term": term,
                "location": location,
                "response": response,
                "termName": termName,
                "choice": choice
            });
        }, 3200)
    }

    else {
        search = new yelpSearch({ term: term, latitude: latitude, longitude: longitude })
        setTimeout(function () {
            response = search.businessNames;
        }, 3000)

        setTimeout(function () {
            res.render("searchResponse", {
                "term": term,
                "location": location,
                "response": response,
                "termName": termName,
                "choice": choice
            });
        }, 3200)
    }
});


router.get('/result/:choice', function (req, res) {
    var choice = req.params.choice;
    var term = req.query.term;
    var location = req.query.location;
    var termName = setName(term);
    var response = new Array();

    var latitude = '';
    var longitude = '';

    if (location.includes("lat") && location.includes("long")) {
        latitude = location.substring(location.indexOf("lat:") + 4, location.indexOf(","));
        longitude = location.substring(location.indexOf("long:") + 5);
    }

    if (choice == "price") {
        var price = req.query.price;
        if (latitude != "") {
            search = new yelpSearch({ term: term, latitude: latitude, longitude: longitude, price: price })
        }
        else {
            search = new yelpSearch({ term: term, location: location, price: price })
        }
        setTimeout(function () {
            response.push(search.businessNames);
            response.push(search.businessIds);
        }, 3000)
    }

    if (choice == "rating") {
        // ideally this would go in another function but async is making it hard
        if (latitude != "") {
            search = new yelpSearch({ term: term, latitude: latitude, longitude: longitude, sort_by: "rating" })
        }
        else {
            search = new yelpSearch({ term: term, location: location, sort_by: "rating" })
        }
        setTimeout(function () {
            response.push(search.businessNames);
            response.push(search.businessIds);
        }, 3000)
    }

    if (choice == "open-now") {
        if (latitude != "") {
            search = new yelpSearch({ term: term, latitude: latitude, longitude: longitude, open_now: true })
        }
        else {
            search = new yelpSearch({
                term: term, location: location, open_now: true })
        }
        setTimeout(function () {
            response.push(search.businessNames);
            response.push(search.businessIds);
        }, 3000)
    }

    if (choice == "deals") {
        if (latitude != "") {
            search = new yelpSearch({ term: term, latitude: latitude, longitude: longitude, attributes: "deals" })
        }
        else {
            search = new yelpSearch({ term: term, location: location, attributes: "deals" })
        }
        setTimeout(function () {
            response.push(search.businessNames);
            response.push(search.businessIds);
        }, 3000)
    }

    if (choice == "near-me") {
        if (latitude != "") {
            search = new yelpSearch({ term: term, latitude: latitude, longitude: longitude, sort_by: "distance" })
        }
        else {
            search = new yelpSearch({ term: term, location: location, sort_by: "distance" })
        }
        setTimeout(function () {
            response.push(search.businessNames);
            response.push(search.businessIds);
        }, 3000)
    }

    if (choice == "cuisine") {
        var category = req.query.category;
        if (latitude != "") {
            search = new yelpSearch({ term: term, latitude: latitude, longitude: longitude, categories: category })
        }
        else {
            search = new yelpSearch({ term: term, location: location, categories: category })
        }
        setTimeout(function () {
            response.push(search.businessNames);
            response.push(search.businessIds);
        }, 3000)
    }

    if (choice == "reservations") {
        if (latitude != "") {
            search = new yelpSearch({ term: term, latitude: latitude, longitude: longitude, attributes: "reservation" })
        }
        else {
            search = new yelpSearch({ term: term, location: location, attributes: "reservation" })
        }
        setTimeout(function () {
            response.push(search.businessNames);
            response.push(search.businessIds);
        }, 3000)
    }

    if (choice == "waitlist") {
        if (latitude != "") {
            search = new yelpSearch({ term: term, latitude: latitude, longitude: longitude, attributes: "waitlist_reservation" })
        }
        else {
            search = new yelpSearch({ term: term, location: location, attributes: "waitlist_reservation" })
        }
        setTimeout(function () {
            response.push(search.businessNames);
            response.push(search.businessIds);
        }, 3000)
    }

    setTimeout(function () {
        res.render("searchResponse", {
            "term": term,
            "location": location,
            "response": response,
            "termName": termName,
            "choice": choice
        });
    }, 3200)
});

router.get('/business/:id', function (req, res) {
    var id = req.params.id

    search = new businessSearch(id);
    setTimeout(function () {
        response = search.response;
    }, 3000)

    setTimeout(function () {
        res.render("businessPage", {
            "response": response
        })
    }, 3200)
    

});
   
module.exports = router;
