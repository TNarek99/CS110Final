const mysql = require('mysql');
var result = [];

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'qrtmnkl1205',
    database : 'studr'
});

connection.connect();

connection.query("SELECT * from universities", function(err, rows){
    if(err) {
        throw err;
    } else {
        result = rows;
    }
});

const getUniversities = function () {
    return result;
};

exports.getUniversities = getUniversities;