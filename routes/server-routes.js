const { Router } = require('express');
const router = Router();
const User = require('../models/user');
// const userList = require('../sample-data/sampleData');
// const url = `http://localhost:8080`;
// const Book = require('../models/book');
// const Page = require('../models/page');
// const shortid = require('shortid');


// Users //

// Get All Users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Get a Single User
router.get('/:id', getUser, (req, res) => {
    res.send(res.user)
})


// Create New User
router.post('/', async (req, res) => {
    const user = new User({
        _id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        numberOfBooks: 1,
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

})


// Update User
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name
    }
    if (req.body.email != null) {
        res.user.email = req.body.email
    }
    if (req.body.numberOfBooks != null) {
        res.user.numberOfBooks = req.body.numberOfBooks
    }
    if (req.body.books != res.user.books) {
        res.user.books = req.body.books
    }
    if (req.body.pages != res.user.pages) {
        res.user.pages = req.body.pages
    }

    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

})


// Delete User
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({ message: 'Deleted Subscriber'})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// MIDDLEWARE | Get a User
async function getUser(req, res, next) {

    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: 'User cannot be found' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
        res.user = user
        next()
    }    




// Books //




// Pages //



module.exports = router;