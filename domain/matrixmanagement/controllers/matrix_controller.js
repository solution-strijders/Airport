const rabbot = require("../rabbot/rabbot");
const Flight = require('../models/flight');

module.exports = {

    Get(req,res,next){
        Flight.find({})
        .then((result, err) => {
            if(result && !err){
                var matrixData = {
                    flights: []
                };

                result.forEach(element => {
                    matrixData.flights.push({
                        "FlightNumber": element.FlightNumber,
                        "Origin": element.Origin,
                        "Destination": element.Destination,
                        "Gate" : element.Gate,
                        "Depart": element.DepartDateTime,
                        "Status": element.Status
                    });
                });

                res.status(200).json({
                    status: {
                        query: 'OK'
                    },
                    result: matrixData
                });

            }else{
                console.log(err);
                console.log(result);
            }
        });
    }
}