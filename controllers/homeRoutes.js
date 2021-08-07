const router = require('express').Router();
const { User, Idea, Category } = require('../models');

//homepage route - return ideas for carosel
router.get('/', async (req, res) => {
    try {
        //get all ideas from db
        const existingIdeas = await Idea.findAll();
        //map json into plain text to pass to handlebars
        const ideas = existingIdeas.map((idea) => idea.get({ plain: true }));
        console.log(ideas);
        //render homepage.handlebars and pass in the ideas and logged_in status
        res.render('homepage', {
            ideas, 
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

//login route - return login page
router.get('/login', async(req, res) => {
    try {
        res.render('login');
    } catch (err) {
        res.status(400).json(err);
    }
})

//register route - return register page
router.get('/register', async(req, res) => {
    try {
        res.render('register');
    } catch (err) {
        res.status(400).json(err);
    }
})

//recover password route - return password page
router.get('/password',async(req, res) => {
    try {
        res.render('password');
    } catch (err) {
        res.status(400).json(err);
    }
})

//logout route - return logout page
router.get('/logout', async(req, res) => {
    try {
        res.render('logout');
    } catch (err) {
        res.status(400).json(err);
    }
})

//create Idea route
router.get('/createIdea', async(req, res) => {
    try {
        res.render('createIdea');
    } catch (err) {
        res.status(400).json(err);
    }
})

//render 401
router.get('/401', async(req, res) => {
    try {
        res.render('401');
    } catch (err) {
        res.render('500');
    }
})

//render 404
router.get('/404', async(req, res) => {
    try {
        res.render('404');
    } catch (err) {
        res.render('500');
    }
})

//render 500
router.get('/500', async(req, res) => {
    try {
        res.render('500');
    } catch (err) {
        res.status(500).json(err);;
    }
})


module.exports = router;