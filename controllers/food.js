// controllers/foods.js

const User = require('../models/user.js')
const express = require('express');
const router = express.Router();

const User = require('../models/user.js');


router.get('/', (req, res) => {
    res.render('foods/index.ejs')
  });

router.get('/new', (req, res) => {
    res.render('foods/new/ejs')
  });

router.post('/', async (req, res) => {
    try {
        const foundUser = await User.findbyId(req.session.user._Id)
        foundUser.pantry.push(req.body)
        await foundUser.save()
        res.redirect(`/users/${foundUser._id}/foods`)
    } catch (error) {
        res.redirect('/')
    }
}); 


// router logic will go here - will be built later on in the lab

module.exports = router;
