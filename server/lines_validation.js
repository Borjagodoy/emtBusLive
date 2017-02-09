var fs = require('fs'),
    _ = require('lodash');

// @see: https://gist.github.com/UlisesGascon/a9cf409ccc69f909fbd480ba30dfc69c 
var lineList = ["1","2","3","4","5","6","7","8","9","10","11","12","14","15","16","17","18","19","20","21","22","23","24","25","26", "27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51", "52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","70","71","72","73","74","75","76","77","78", "79","81","82","83","85","86","87","100","101","102","103","104","105","106","107","108","109","110","111","112","113","114","115","116","117", "118","119","120","121","122","123","124","125","126","127","128","129","130","131","132","133","134","135","136","137","138","139","140","141","142", "143","144","145","146","147","148","149","150","151","152","153","155","156","160","161","162","171","172SF","172","173","174","176","177","178","180", "200","203","210","215","247","310","A","C1","C2","E","E1","E2","E3","E4","F","G","H","H1","M1","M2","N1","N2","N3","N4","N5", "SE3","SE2","SE","N6","N7","N8","N9","N10","N11","N12","N13","N14","N15","N16","N17","N18","N19","N20","N21","N22","N23","N24","N25","N26","N27","S.E.702","S.E.704","T11","T23","T31","T32","T41","T61","T62","U"]

fs.readdir('./data/lines', function(err, files) {
    if (err) {
        console.log("ERROR reading ./data/lines:", err);
    } else {
        var finalFiles = []
        files.forEach(function(file){
            finalFiles.push(file.replace(/_[1-2].json/, ""))
        })
        
        finalFiles = _.uniq(finalFiles)
        var diferencias = _.difference(lineList, finalFiles)
        console.log("Total de líneas disponibles:", lineList.length)
        console.log("Archivos sin depurar:", files.length);
        console.log("Archivos depurados:", finalFiles.length);
        console.log("Tenemos todo?", finalFiles.length === lineList.length);
        console.log("Tenemos las rutas en ambos sentidos?", finalFiles.length*2 === files.length);
        console.log("Diferencias:", diferencias);
        console.log("Archivos depurados:\n", JSON.stringify(finalFiles.sort()));
        console.log("Líneas disponibles:\n", JSON.stringify(lineList.sort()));
    }
});