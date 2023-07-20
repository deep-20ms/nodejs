var express = require('express');
var router = express.Router();
const userModel = require("../models/userModel");
// const user = require('../models/userModel');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Homepage' });
});

router.get('/signup', function (req, res, next) {
  res.render('signup', { title: 'Sign Up' });
  // res.json(req.body)
});

router.post('/signup', async function (req, res, next) {
  // res.render('signup', { title: 'Sign Up' });
  // res.json(req.body)

  try {
    const newuser = new userModel(req.body)
    await newuser.save()
    res.redirect("/signin")
  }

  catch (error) {
    res.send(error)
  }

});

router.get('/signin', function (req, res, next) {
  res.render('signin', { title: 'Sign In' });
});

router.post('/signin', async function (req, res, next) {
  // res.render('signin', { title: 'Sign In' });
  // res.json(req.body)

  try {
    const { username, password } = req.body
    const user = await userModel.findOne({ username })


    if (user === null) {
      return res.send(`user not found. <a href= "/signin"> signin </a> `)
    }

    if (user.password != password) {
      return res.send(`Incorrect Password. <a href= "/signin"> signin </a> `)
    }

    res.redirect("/profile")
  }


  catch (error) {
    res.send(error)
  }

});

router.get('/forgotpass', function (req, res, next) {
  res.render('forgotpass', { title: 'forget-password' });
});

router.post('/forgotpass', function (req, res, next) {
  // res.render('forgotpass', { title: 'forget-password' });
  res.json(req.body)
});

router.get('/signout', function (req, res, next) {
  res.render('signout', { title: 'sign-out' });
});

router.get('/profile', async function (req, res, next) {
  // res.json(req.body)
  // res.render("profile", { title: "profile" })
  try {
    const users = await userModel.find()
    res.render("profile", { title: "profile", users })
  }
  catch (error) {
    res.send(error)
  }

});


router.get('/delete/:id', async function (req, res, next) {
  // res.json(req.body)
  // res.render("profile", { title: "profile" })
  try {
    await userModel.findByIdAndDelete(req.params.id)
    res.redirect("/profile")
  }
  catch (error) {
    res.send(error)
  }

});



module.exports = router;
