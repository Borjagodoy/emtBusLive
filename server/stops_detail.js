var emtmadApi = require('node-emtmad-bus-promise'),
    stops = require("./data/unique_stops.json"),
    firebase = require('firebase'),
    fs = require('fs');

// Firebase Setup
firebase.initializeApp({
    serviceAccount: './conjuntaapp-firebase-adminsdk-zc7lo-a4c8513a48.json',
    databaseURL: 'https://conjuntaapp.firebaseio.com/'
});

var ref = firebase.database().ref('bus');

// Just needed in order to keep refreshing data
//setInterval(getAllStops, 60000*5);
getAllStops();

function getAllStops () {
    stops.forEach(function(currentStop){
        // In order to avoid conectivity issues in the server side.
        var minimum = minimal();
        var maximum = maximal();
        setTimeout(function(){
            console.log("Iniciando parada:", currentStop.stopId);
            getStopData(currentStop.stopId);
        }, Math.floor(Math.random() * (maximum - minimum)) + minimum);
    });
}

stops.forEach(function(currentStop){
    // In order to avoid conectivity issues in the server side.
    var minimum = minimal();
    var maximum = maximal();
    setTimeout(function(){
        console.log("Iniciando parada:", currentStop.stopId);
        getStopData(currentStop.stopId);
    }, Math.floor(Math.random() * (maximum - minimum)) + minimum)
});

/* -- Last real Stats --
Total de paradas disponibles: 4411
Archivos depurados: 4399
*/

function minimal(){
    return Math.floor(Math.random() * (999 - 153)) + 153;
}
function maximal(){
    return Math.floor(Math.random() * (9000 - 2010)) + 2010;
}

function getStopData(stop){
    emtmadApi.getIncomingBusesToStop(stop)
        .then(function (results) {
            console.log("Parada:", stop);
            fs.writeFile(`./data/stops/${stop}.json`, JSON.stringify(results), "utf-8", function(err){
                  if (err) console.log(`./data/stops/${stop}: ${err}`) ;
                  console.log(`${stop} guardado con éxito!`);
            });
            results.forEach(function(bus){
                var bus_details = ref.child(bus.lineId + '/' + bus.busId);
                    bus_details.update({
                    "busTimeLeft": bus.busTimeLeft,
                    "busDistance": bus.busDistance,
                    "lon": bus.longitude,
                    "lat": bus.latitude
                });
            });
        })
        .catch(function (error) {
            
            console.log(`Error ${stop}: ${error}`);
        });
}

