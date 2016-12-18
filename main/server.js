const http = require('http');
const querystring = require('querystring');
const fs = require('fs');
const url = require('url');
const universityModel = require('./Modules/app_modules/universityModel');
const filter = require('./Modules/app_modules/filter');

http.createServer(function (req, res) {
    const method = req.method;
    const urlParts = url.parse(req.url);

    if(!urlParts.query) {
        fs.readFile("../Final Project" + req.url, function (err, data) {
            if (err) {
                res.statusCode = 404;
                res.end("File not found");
            }
            res.statuscode = 200;
            res.end(data);
        });

    }
    else {

        var universities = universityModel.getUniversities();

        console.log(req.method);

        //if (req.method == "GET") {


            res.setHeader('Content-Type', 'application/json');


            const studentInfo = querystring.parse(urlParts.query);
            for (var key in studentInfo) {

                switch (key) {
                    case "gpa":
                        universities = filter.filterByGpa(universities, studentInfo[key]);
                        console.log('requst gpa');
                        break;
                    case "sat_reading":
                        universities = filter.filterBySatReading(universities, studentInfo[key]);
                        break;
                    case "sat_math":
                        universities = filter.filterBySatMath(universities, studentInfo[key]);
                        break;
                    case "sat_writing":
                        universities = filter.filterBySatWriting(universities, studentInfo[key]);
                        break;
                    case "act_composite":
                        universities = filter.filterByActComposite(universities, studentInfo[key]);
                        break;
                    case "act_english":
                        universities = filter.filterByActEnglish(universities, studentInfo[key]);
                        break;
                    case "act_math":
                        universities = filter.filterByActMath(universities, studentInfo[key]);
                        break;
                    case "act_reading":
                        universities = filter.filterByActReading(universities, studentInfo[key]);
                        break;
                    case "act_science":
                        universities = filter.filterByActScience(universities, studentInfo[key]);
                        break;
                    case "finances":
                        universities = filter.filterByFinances(universities, studentInfo[key]);
                        break;
                    case "tuition_fee":
                        universities = filter.filterByTuitionFee(universities, studentInfo[key]);
                        break;
                    case "rooms_fee":
                        universities = filter.filterByRoomsFee(universities, studentInfo[key]);
                        break;
                    case "total_enrollement":
                        universities = filter.filterByTotalEnrollement(universities, studentInfo[key]);
                        break;
                    case "applications_fee":
                        universities = filter.filterByApplicationFee(universities, studentInfo[key]);
                        break;
                    case "acceptance_rate":
                        universities = filter.filterByAcceptanceRate(universities, studentInfo[key]);
                        break;
                    case "application_deadline":
                        universities = filter.filterByApplicationDeadline(universities, studentInfo[key]);
                        break;
                }
            }

            console.log("res end");

            console.log(JSON.stringify(universities));
            res.end(JSON.stringify(universities));



    }
    console.log("return");
}
).listen(8081);