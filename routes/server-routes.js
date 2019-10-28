const { Router } = require('express');
const router = Router();
const User = require('../models/user');


// Users //

// Get All Users
router.get('/', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); 
    res.setHeader('Access-Control-Allow-Credentials', true); 

    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Get a Single User
router.get('/:email', getUser, (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); 
    res.setHeader('Access-Control-Allow-Credentials', true); 

    res.status(200).send(res.user)
})


// Create New User
router.post('/', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); 
    res.setHeader('Access-Control-Allow-Credentials', true); 

    const user = new User({
        _id: req.body._id,
        name: req.body.name,
        email: req.body.email,
        numberOfBooks: req.body.numberOfBooks,
        books: req.body.books,
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

})


// Update User
router.patch('/:email', getUser, async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); 
    res.setHeader('Access-Control-Allow-Credentials', true); 

    if (req.body._id != res.user._id) {
        res.user._id = req.body._id
    }
    if (req.body.name != '') {
        res.user.name = req.body.name
    }
    if (req.body.email != '') {
        res.user.email = req.body.email
    }
    if (req.body.books.length != res.user.numberOfBooks) {
        req.body.books.length = res.user.numberOfBooks
    }
    if (JSON.stringify(req.body.books) != JSON.stringify(res.user.books)) {
        res.user.books = req.body.books
    }

    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

})


// Delete User
router.delete('/:email', getUser, async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); 
    res.setHeader('Access-Control-Allow-Credentials', true); 

    try {
        await res.user.remove()
        res.json({ message: 'Deleted User'})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// MIDDLEWARE | Get a User
async function getUser(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); 
    res.setHeader('Access-Control-Allow-Credentials', true); 

    try {
        user = await User.findOne({email: `${req.params.email}`}, function(err, obj) { console.log(obj); });
        if (user == null) {
            return res.status(404).json({ message: 'User cannot be found' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
        res.user = user
        next()
    }    



module.exports = router;