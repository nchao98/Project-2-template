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
router.get('/login', async(req,res) => {
    try {
        res.render('login');
    } catch (err) {
        res.status(400).json(err);
    }

})

module.exports = router;