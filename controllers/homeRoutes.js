const router = require('express').Router();
const { User, Idea, Category } = require('../models');

//homepage route - return ideas for carosel
router.get('/', async (req, res) => {
    try {
        //get all ideas from db
        const existingIdeas = await Idea.findAll();
        //map json into plain text to pass to handlebars
        const ideas = existingIdeas.map((idea) => idea.get({ plain: true }));

        //render homepage.handlebars and pass in the ideas and logged_in status
        res.render('homepage', {
            ideas, 
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
})