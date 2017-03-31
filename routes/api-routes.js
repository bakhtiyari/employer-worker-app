// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");


// Routes
// =============================================================
module.exports = function (app, passport) { //import user id from passport!!!!! create conditional!!!

  
    // POST route for saving a new registration
    app.post("/register", function (req, res) {
        db.User.findAll({
            where: {
                email: req.body.email
            }
        }).then(function (data) {
            if (Object.keys(data).length !== 0) {
                res.render("registration", { error: { message: "Unfortunately, that email address is already in use. Please choose another." }});
            } else {
                db.User.create({
                    name: req.body.name,
                    password: req.body.password,
                    mode: req.body.mode,
                    phone: req.body.phone,
                    email: req.body.email,
                    street: req.body.street,
                    city: req.body.city,
                    zipcode: req.body.zipcode,
                    skill: req.body.skill,
                    availability: req.body.availability,

                },
                {
                        timestamps: false            
                
                }).then(function (data) {
                    var hbsObject = {
                        employer: data
                    };
                    res.render("registered", hbsObject);
                });
            }
        });            
    });

    //LOGIN
    app.post('/login', function(req, res) {
        db.User.findOne({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        }).then(function (data) {
            if (!data) {
                res.render("login", { error: { message: "Username and/or password is incorrect!"}});
            } else {
                res.render("calendar");
            }
        })
    });

    // Displays employer's information to a "confirmation page"
    app.get("/view/employers", function (req, res) {
        db.EmployerTable.findAll({}).then(function (data) {
            res.render("employertable", data);
        });            
    });    
    // Updates the availabity
    app.put("/calendar", function (req, res) {
        db.Post.update(
            req.body,
            {
                where: {
                    id: req.body.id
                }
            }).then(function (dbPost) {
                res.json(dbPost);
            });
    });
    // Gets the information from employer to display on the calendar
    app.get("/view/calendar", function (req, res) {
        var query = {};
        if (req.query.id) {
            query.User = req.query.id;
        }
        db.EmployerDates.findAll({
            where: query
        }).then(function (data) {
            res.render("calendarView", data);
        })
    })

};
