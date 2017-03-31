// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
// var path = require("path");
var event_list = [];

var spec;

var agendaData;

var mysql = require("mysql");

var port = 3306;

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Bahman16",
    database: "projectwork"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

var dataquery = { 
    getData : function (callBack) {
connection.query("SELECT * FROM users", function(err, result) {
            //console.log("-----------------------------------");
            for (var i = 0; i < result.length; i++) {
                // console.log(result[i].name + " | " + result[i].availability + " | " + result[i].rating);
                // console.log(result);
                // console.log("-----------------------------------");                
                spec = {
                    title: result[i].name,
                    start: result[i].availability,
                    description: result[i].rating
                };

                event_list.push(spec);
            }

            callBack(result);
        });
}
};

function callBack(data) {

    // agendaData = JSON.parse(JSON.stringify(data));

    // console.log(agendaData);

    //console.log("\nthis is the eventlist:\n");

    console.log(event_list);
}

//dataquery.getData(callBack);



// Routes
// =============================================================
module.exports = function(app) {

    // Each of the below routes just handles the HTML page that the user gets sent to.

    //var event_list = [{ title: "John", start: '2017-03-28', description: 'Rating: 3 Stars' }];

    // index route loads view.html
    app.get("/", function(req, res) {
        res.render("index");
    });

    app.get("/register", function(req, res) {
        res.render("registration");
    });

    app.get("/calendar", function(req, res) {

        // var event_list = [
        //     { title: 'John', start: '2017-03-28', description: 'Rating: 3 Stars' },
        //     { title: 'David', start: '2017-03-26', description: 'Rating: 3 Stars' },
        //     { title: 'Bruno', start: '2017-03-26', description: 'Rating: 3 Stars' }
        // ]

        dataquery.getData(callBack);

        console.log("\nthis is the eventlist:\n");

        console.log(event_list);

        res.render("calendar", { events: event_list });
 
        event_list.length = 0;
    });

    app.get("/login", function(req, res) {
        res.render("login");
    });

};