var emtmadApi = require('emtmad-bus-times-node'),
    firebase = require('firebase'),
    config = require("./config"),
    fs = require('fs');

// EMT Setup
emtmadApi.initAPICredentials(config.EMT.user, config.EMT.token);


// Firebase Setup
firebase.initializeApp({
    serviceAccount: './conjuntaapp-firebase-adminsdk-zc7lo-a4c8513a48.json',
    databaseURL: 'https://conjuntaapp.firebaseio.com/'
});

var ref = firebase.database().ref('bus');

// Lines management
var stops = [];

fs.readdir('./data/lines', function(err, files) {
    if (err) {
        console.log("ERROR reading ./data/lines:", err);
    } else {
        console.log("----- ADDING LINES ------");
        files.forEach(function(file) {
            if (/.json/.test(file)) {
                console.log(`Integrando ${file}!`);
                stops.push(require(`./data/lines/${file}`));
            }
        });
        console.log("-------------------------");
    }
});

var idStops = stops.map(function(value) {
    return value.resultValues[0].node;
});

// Repetitive tasks
setInterval(function() {
    idStops.map(function(stop) {
        emtmadApi.getIncomingBusesToStop(stop, function(output) {
            if (output.status >= 200 && output.status < 300) {
                output.arrives.map(function(arrive) {
                    var lineBus = ref.child(arrive.lineId + '/' + arrive.busId)
                    lineBus.update({
                        logn: arrive.longitude,
                        lat: arrive.latitude
                    });
                    console.log('request ok');
                });
            } else if (output.status >= 400)
                console.log(output.error);
            else
                console.log(`Unknown error, code: ${output.status}`);
        });
    });
}, 1500);
