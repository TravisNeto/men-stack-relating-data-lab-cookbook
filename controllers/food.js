// controllers/foods.js

const User = require('../models/user.js')
const express = require('express');
const router = express.Router();




router.get('/', async (req, res) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  res.render('foods/index.ejs', {
    foundPantry: user.pantry
  })
});

router.get('/new', (req, res) => {
    res.render('foods/new.ejs')
  });

router.post('/', async (req, res) => {
    console.log(req.session)
    try {
        const foundUser = await User.findById(req.session.user._id)
        console.log(foundUser)
        foundUser.pantry.push(req.body)
        await foundUser.save()
        res.redirect(`/users/${foundUser._id}/foods`)
    } catch (error) {
        res.redirect('/')
    }
}); 

router.delete('/users/:userId/foods/:itemId', async (req, res) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  
});




// router logic will go here - will be built later on in the lab

module.exports = router;
