var geolocation = navigator.geolocation;

module.exports.position = geolocation.getCurrentPosition;

/*var geo = require('html5-geolocation')();

/*
function setPosition() {
    geo.get(function (err, position) {
        if (!err) {
            module.exports.position = position;
        } else {
            module.exports.position = "unknown";
        }
    })
}


module.exports.printPosition = function printPosition() {
    geo.get(function (err, position) {
        if (!err) {
            console.log('Position is: ', position);
        } else {
            console.log('Error');
        }
    })
};

*/