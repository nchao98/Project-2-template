const router = require('express').Router();
const withAuth = require('../utils/auth.js');
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
            username: req.session.username
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

//login route - return login page
router.get('/login', async(req, res) => {
    try {
        res.render('login', {
            logged_in: req.session.logged_in,
            username: req.session.username
        });
    } catch (err) {
        res.status(400).json(err);
    }
})

//profile route - user porfile
router.get('/profile', withAuth, async(req, res) => {
    try {
        //get user details
        const userProfile = await User.findOne({
            where: {username: req.session.username},
            attributes: { exclude: ['password']},
            include: [
              {
                model: Idea, 
                include: [
                    {model: Category
                    }
                ]
              },
            ],
        });

        const user = userProfile.get({ plain: true });
          console.log(user);
          console.log(user.Idea);
        
        res.render('profile', {
            user,
            logged_in: req.session.logged_in,
            username: req.session.username
        });
    } catch (err) {
        res.status(400).json(err);
    }
})

//register route - return register page
router.get('/register', async(req, res) => {
    try {
        res.render('register', {
            logged_in: req.session.logged_in,
            username: req.session.username
        });
    } catch (err) {
        res.status(400).json(err);
    }
})

//routes to view categories
router.get('/categories/:id', async(req, res) => {
    try{
        const categoryData = await Category.findByPk(req.params.id, {
            include: [
              {
                model: Idea, 
                include: [
                    {model: User, 
                        attributes: { exclude: ['password']},
                    }
                ]
              },
            ],
          });
          const categories = categoryData.get({ plain: true });
          console.log(categories);
          console.log(categories.Idea);
          res.render('categories', {
            categories, 
            logged_in: req.session.logged_in, 
            username: req.session.username
        });

    } catch (err) {
        res.status(400).json(err);
    }

});

//routes to view ideas
router.get('/idea/:id', async(req, res) => {
    try {
        const ideaData = await Idea.findByPk(req.params.id);
           
        const ideas = ideaData.get({plain: true});

        res.render('idea', {
            ideas,
            logged_in: req.session.logged_in,
            username: req.session.username
            
        });
    } catch (err) {
        res.status(400).json(err);
    }
})
//recover password route - return password page
router.get('/password',async(req, res) => {
    try {
        res.render('password', {
            logged_in: req.session.logged_in,
            username: req.session.username
        });
    } catch (err) {
        res.status(400).json(err);
    }
})

//logout route - return logout page
router.get('/logout', async(req, res) => {
    try {
        res.render('logout', {
            logged_in: req.session.logged_in,
            username: req.session.username
        });
    } catch (err) {
        res.status(400).json(err);
    }
})

//create Idea route
router.get('/createIdea', withAuth, async(req, res) => {
    try {
        res.render('createIdea', {
            logged_in: req.session.logged_in,
            username: req.session.username
        });
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