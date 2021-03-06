// Requiring our models and passport as we've configured it
const { sequelize } = require("../models");
const db = require("../models");
//const offer = require("../models/offer");
var passport = require("../config/passport");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {

    db.Agent.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber
    })
      .then(function (agent) {
        // res.redirect(307, "/api/login");
        console.log(agent)
        req.login(agent, ()=>{
          res.sendStatus(201)
        })
        
        
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  app.post("/api/user_signup", function (req, res) {

    db.User.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    })
      .then(function () {
        // res.redirect(307, "/api/login");
        res.sendStatus(201)
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });
 
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json(
      //   {
      //     email: req.user.email,
      //     password: req.user.password
      // }
      req.user

    );
  });

  app.post("/api/agentlogin", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json(
      //   {
      //     email: req.user.email,
      //     password: req.user.password
      // }
      req.user

    );
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    console.log(req.user);
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      db.User.findOne({ where: { email: req.user.email } }).then(result => {
        console.log("This is the user result", result);
        res.json({ result })
      }).catch(err => {
        console.log("Get user wasn't completed");
        res.status(500).json(err);
      })
    }
  });

  // Route for getting some data about our agent to be used client side
  app.get("/api/agent_data", (req, res) => {
    console.log(req.user);
    if (!req.user) {
      // The agent is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the agent's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        firstname: req.user.firstName,
        lastname: req.user.lastName,
        email: req.user.email,
        phoneNumber: req.user.phoneNumber
      });
    }
  });

     // Route for logging user out
     app.get("/logout", (req, res) => {
      req.logout();
      res.redirect("/");
  });


};

  //   {
  //     "dateOffered": "today",
  //        "name": "Kerem",
  //        "amount": "200000",
  //        "closingDate": "tomorrow",
  //        "moneyType": "dollar",
  //        "home": true,
  //        "id": "1"
  //  }


  //   {
  //     "address": "11211 tramonto",
  //     "sellerFirstName": "Kerem",
  //     "sellerLastName": "Karaman",
  //     "UserId": "1"
  // }

  // app.post("/api/createHome", function (req, res) {
  //   const query = {};
  //   if (req.user) {
  //       query.userId = req.user.id;
  //   }
  //   db.Home.create({
  //     address: req.body.address,
  //     sellerFirstName: req.body.sellerFirstName,
  //     sellerLastName: req.body.sellerLastName,
  //     UserId: query.userId
  //   })
  //     .then(function () {
  //       // res.redirect(307, "/api/login");
  //       res.sendStatus(201)
  //     })
  //     .catch(function (err) {
  //       res.status(401).json(err);
  //     });
  // });

  //Post request for Reviews






