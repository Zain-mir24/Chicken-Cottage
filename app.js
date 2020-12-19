const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());
const fileupload = require("express-fileupload");
app.use(fileupload());
const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  host: 'mail.chickencottage.com.pk',
  port: 465,
  auth: {
    user: 'me@chickencottage.com.pk',
    pass: '324434'
  }
});

//////////////////////// Home Route //////////////////////
app.get("/", function (req, res) {
  res.render("home", { submit: false });
});

app.post("/", function (req, res) {
  var mailOptions = {
    from: "me@chickencottage.com.pk",
    to: "Info@chickencottage.com.pk",
    subject: req.body.subject,
    text: "Name: " + req.body.username + "\n\n Email: " + req.body.email + "\n\nMessage: " + req.body.message,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.redirect("/");
    }
  });
});

app.post("/contact", function (req, res) {
  var mailOptions = {
    from: "me@chickencottage.com.pk",
    to: "Info@chickencottage.com.pk",
    subject: req.body.subject,
    text: "Name: " + req.body.username + "\n\n Email: " + req.body.email + "\n\nMessage: " + req.body.message,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.redirect("/contact");
    }
  });
  res.render("contact");
});

//////////////////// OUR FOOD MENU ROUTES /////////////////////////

app.get("/crispy", function (req, res) {
  res.render("crispy");
});

app.get("/wrap", function (req, res) {
  res.render("wrap");
});
app.get("/vegetarian", function (req, res) {
  res.render("vegetarian");
});


app.get("/burger", function (req, res) {
  res.render("burger");
});

app.get("/news", function (req, res) {
  res.render("news");
});
app.get("/salad", function (req, res) {
  res.render("salad");
});
app.get("/BBQ", function (req, res) {
  res.render("BBQ");
});
app.get("/Grilled", function (req, res) {
  res.render("Grilled");
});

app.get("/franchise", function (req, res) {
  res.render("franchise");
});
app.get("/gallery", function (req, res) {
  res.render("gallery")
})

app.get("/aboutus", function (req, res) {
  res.render("newaboutus");
});

app.get("/faq", function (req, res) {
  res.render("faq");
});
app.get("/sides", function (req, res) {
  res.render("sides");
})
//////////////// NEW FRONT END //////////////////////////
app.get("/home", function (req, res) {
  res.render("home")
});

app.get("/contact", function (req, res) {
  res.render("contact");
});
////////////////// Apply Route ////////////////////////////
app.get("/apply", function (req, res) {
  res.render("apply", { submit: false });
});
app.post("/apply", function (req, res) {
  if (req.files) {
    console.log(req.files);
    var file = req.files.upload;
    var filename = file.name;
    console.log(filename);
    file.mv(__dirname + "/public/uploads/" + filename, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Send Successfully");
      }
    });
  }
  const date = new Date(req.body.dob);
  var message =
    "Name: " +
    req.body.name +
    "\n\n Date Of Birth: " +
    date.getDay() +
    "/" +
    date.getMonth() +
    "/" +
    date.getFullYear() +
    "\n\n Nationality: " +
    req.body.nationality +
    "\n\n Mobile Number 1: " +
    req.body.mobilenum1 +
    "\n\n Residential Address: " +
    req.body.res_address +
    "\n\n Gender: " +
    req.body.gender +
    "\n\n Email: " +
    req.body.email +
    "\n\n Martial Status: " +
    req.body.mar_status +
    "\n\n CNCI: " +
    req.body.cnic +
    "\n\n Mobile Number 2: " +
    req.body.mobilenum2 +
    "\n\n Previous Address: " +
    req.body.prev_address +
    "\n\n Do You Have Any Business Experience: " +
    req.body.bus_exp +
    "\n\n Do You Have Experience In Food Industry: " +
    req.body.food_exp +
    "\n\n Food Experience Detail: " +
    req.body.foodExp_detail +
    "\n\n Monthly Income: " +
    req.body.mon_income +
    "\n\n Property Income: " +
    req.body.pro_income +
    "\n\n Total Income: " +
    req.body.tot_income +
    "\n\n Dividend Interest: " +
    req.body.div_interest +
    "\n\n Spouse Interest: " +
    req.body.spo_interest;
  var mailOptions = {
    from: "me@chickencottage.com.pk",
    to: "Info@chickencottage.com.pk",
    subject: "Chicken Cottage Application From " + req.body.name,
    text: message,
    attachments: [
      {
        path: __dirname + "/public/uploads/" + filename,
      },
    ],
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      fs.unlink(__dirname + "/public/uploads/" + filename, function (err) {
        if (err) {
          console.log(err);
        }
      });
      console.log("Email sent: " + info.response);
      res.render("apply", { submit: true });
    }
  });
});

app.listen(process.env.PORT || 3005, function () {
  console.log("Server is runing on port 3005");
});