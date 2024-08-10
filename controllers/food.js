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

router.get('/pantry', async (req, res) => {
  try {
    const userId = req.session.user._id;
    const user = await User.findById(user._id);

    if (!user) {
      return res.status(404).send('User not found')
    }
    res.locals.foundPantry = user.pantry;
    res.render('/views/pantry/index.ejs'), {
      foundPantry: user.pantry
  }
} catch (error) {
  res.status(400).json({ msg: error.message })

}
})

router.delete('/:itemId', async (req, res) => {
  const userId = req.session.user._id;
  
try {
    const foundUser = await User.findById(userId);
    foundUser.pantry.pull(req.params.itemId);
    await foundUser.save()
    res.redirect(`/users/${userId}/foods`)
    } catch (error) {
    res.redirect('/')
}})

router.get('/:id/edit', async (req, res) => {
  try {
    const foundUser = await User.findOne({_id: req.session.user._id})
    const foundFood = foundUser.pantry.id(req.params.id)
    res.render('foods/edit.ejs', {
      item: foundFood
    })
  } catch (error) {
    res.status(400).json({msg: error.message})
  }
})

router.put('/:id', async (req, res) => {
  const userId = req.session.user._id
  const user = await User.findById(userId)
  try {
    const foodItem = user.pantry.id(req.params.id)
    // foodItem.food = req.body.food
    foodItem.set(req.body)
    await user.save()
      res.redirect(`/users/${user._id}/foods`)
  } catch (error) {
    res.status(400).json({msg: error.message})
  }
})


// router logic will go here - will be built later on in the lab

module.exports = router;
