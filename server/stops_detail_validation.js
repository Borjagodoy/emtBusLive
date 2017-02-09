var fs = require('fs'),
    _ = require('lodash');
    
var stopLists = require("./data/unique_stops.json");

fs.readdir('./data/stops', function(err, files) {
    if (err) {
        console.log("ERROR reading ./data/stops:", err);
    } else {
        var stopListsFix = [];
        var finalFiles = [];
        stopLists.forEach(function(stop){
            stopListsFix.push(stop.stopId);
        })
        
        files.forEach(function(file){
            finalFiles.push(file.replace(/\.json/, ""))
            console.log("file:", file.replace(/\.json/, ""))
        })
        
        var diferencias = _.difference(stopListsFix, stopLists)
        console.log("Total de paradas disponibles:", stopListsFix.length)
        console.log("Archivos depurados:", finalFiles.length);
        console.log("Tenemos todo?", finalFiles.length === stopListsFix.length);
    }
});