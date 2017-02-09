var _ = require("lodash"),
    fs = require('fs');

    var stops = [];
    fs.readdir('./data/lines', function (err, files) {
        if(err){
            console.log("ERROR reading ./data/lines:", err);
        } else {
            files.forEach(function(file){
                if (/.json/.test(file)) {
                    var currentLine = require(`./data/lines/${file}`);
                    if(currentLine.stop){
                        currentLine.stop.forEach(function(element){
                            stops.push(element);
                        });
                    } else {
                        console.log("---- No! currentLine.stop en", file);
                    }
                }
            });
            
            console.log("Total de paradas:", stops.length)
                    
            fs.writeFile("./data/raw_stops.json", JSON.stringify(stops), "utf-8", function(err){
                        if (err) throw err;
                        console.log(`./data/all_stops.json guardado con éxito!`);
                    });
            }
            
            var realStops = _.uniqBy(stops, "stopId");
            
            console.log("Total de paradas (únicas):", realStops.length)
            
            fs.writeFile("./data/unique_stops.json", JSON.stringify(realStops), "utf-8", function(err){
                        if (err) throw err;
                        console.log(`./data/all_stops.json guardado con éxito!`);
                    });
    });


/* ------ SE IGNORAN... -----

---- No! currentLine.stop en A_1.json
---- No! currentLine.stop en A_2.json
---- No! currentLine.stop en C1_1.json
---- No! currentLine.stop en C1_2.json
---- No! currentLine.stop en C2_1.json
---- No! currentLine.stop en C2_2.json
---- No! currentLine.stop en E1_1.json
---- No! currentLine.stop en E1_2.json
---- No! currentLine.stop en E2_1.json
---- No! currentLine.stop en E2_2.json
---- No! currentLine.stop en E3_1.json
---- No! currentLine.stop en E3_2.json
---- No! currentLine.stop en E4_1.json
---- No! currentLine.stop en E4_2.json
---- No! currentLine.stop en E_1.json
---- No! currentLine.stop en E_2.json
---- No! currentLine.stop en F_1.json
---- No! currentLine.stop en F_2.json
---- No! currentLine.stop en G_1.json
---- No! currentLine.stop en G_2.json
---- No! currentLine.stop en H1_1.json
---- No! currentLine.stop en H1_2.json
---- No! currentLine.stop en H_1.json
---- No! currentLine.stop en H_2.json
---- No! currentLine.stop en M1_1.json
---- No! currentLine.stop en M1_2.json
---- No! currentLine.stop en M2_1.json
---- No! currentLine.stop en M2_2.json
---- No! currentLine.stop en N10_1.json
---- No! currentLine.stop en N10_2.json
---- No! currentLine.stop en N11_1.json
---- No! currentLine.stop en N11_2.json
---- No! currentLine.stop en N12_1.json
---- No! currentLine.stop en N12_2.json
---- No! currentLine.stop en N13_1.json
---- No! currentLine.stop en N13_2.json
---- No! currentLine.stop en N14_1.json
---- No! currentLine.stop en N14_2.json
---- No! currentLine.stop en N15_1.json
---- No! currentLine.stop en N15_2.json
---- No! currentLine.stop en N16_1.json
---- No! currentLine.stop en N16_2.json
---- No! currentLine.stop en N17_1.json
---- No! currentLine.stop en N17_2.json
---- No! currentLine.stop en N18_1.json
---- No! currentLine.stop en N18_2.json
---- No! currentLine.stop en N19_1.json
---- No! currentLine.stop en N19_2.json
---- No! currentLine.stop en N1_1.json
---- No! currentLine.stop en N1_2.json
---- No! currentLine.stop en N20_1.json
---- No! currentLine.stop en N20_2.json
---- No! currentLine.stop en N21_1.json
---- No! currentLine.stop en N21_2.json
---- No! currentLine.stop en N22_1.json
---- No! currentLine.stop en N22_2.json
---- No! currentLine.stop en N23_1.json
---- No! currentLine.stop en N23_2.json
---- No! currentLine.stop en N24_1.json
---- No! currentLine.stop en N24_2.json
---- No! currentLine.stop en N25_1.json
---- No! currentLine.stop en N25_2.json
---- No! currentLine.stop en N26_1.json
---- No! currentLine.stop en N26_2.json
---- No! currentLine.stop en N27_1.json
---- No! currentLine.stop en N27_2.json
---- No! currentLine.stop en N2_1.json
---- No! currentLine.stop en N2_2.json
---- No! currentLine.stop en N3_1.json
---- No! currentLine.stop en N3_2.json
---- No! currentLine.stop en N4_1.json
---- No! currentLine.stop en N4_2.json
---- No! currentLine.stop en N5_1.json
---- No! currentLine.stop en N5_2.json
---- No! currentLine.stop en N6_1.json
---- No! currentLine.stop en N6_2.json
---- No! currentLine.stop en N7_1.json
---- No! currentLine.stop en N7_2.json
---- No! currentLine.stop en N8_1.json
---- No! currentLine.stop en N8_2.json
---- No! currentLine.stop en N9_1.json
---- No! currentLine.stop en N9_2.json
---- No! currentLine.stop en S.E.702_1.json
---- No! currentLine.stop en S.E.702_2.json
---- No! currentLine.stop en S.E.704_1.json
---- No! currentLine.stop en S.E.704_2.json
---- No! currentLine.stop en SE2_1.json
---- No! currentLine.stop en SE2_2.json
---- No! currentLine.stop en SE3_1.json
---- No! currentLine.stop en SE3_2.json
---- No! currentLine.stop en SE_1.json
---- No! currentLine.stop en SE_2.json
---- No! currentLine.stop en T11_1.json
---- No! currentLine.stop en T11_2.json
---- No! currentLine.stop en T23_1.json
---- No! currentLine.stop en T23_2.json
---- No! currentLine.stop en T31_1.json
---- No! currentLine.stop en T31_2.json
---- No! currentLine.stop en T32_1.json
---- No! currentLine.stop en T32_2.json
---- No! currentLine.stop en T41_1.json
---- No! currentLine.stop en T41_2.json
---- No! currentLine.stop en T61_1.json
---- No! currentLine.stop en T61_2.json
---- No! currentLine.stop en T62_1.json
---- No! currentLine.stop en T62_2.json
---- No! currentLine.stop en U_1.json
---- No! currentLine.stop en U_2.json

*/