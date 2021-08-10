const router = require('express').Router();
const { User, Idea, Category } = require('../../models');

//login route
router.post('/login', async (req, res) => {
    try {
        //check to see if user exists in DB
        const userData = await User.findOne({
            where: { email: req.body.email }
        });
        //if not found send error 409 - conflict
        if (!userData) {
            res.status(409).json({ message: 'Incorrect username and/or password.  Please try again'});
            return;
        }
        //otherwise, check password
        const validPassword = await userData.checkPassword(req.body.password);
        //if password not valid send error - 409-conflict
        if (!validPassword) {
            res.status(409).json({ message: 'Incorrect username or password, please try again.' });
            return;
        }
        //otherwise, save user details to session
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            req.session.username = userData.username;

            res.status(200).json({message: 'Your are now logged in.'});
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

//create user route
router.post('/create', async (req, res) => {
    try {    
        //check if user exists in DB
        const userNameData = await User.findOne({
            where: { username: req.body.username }
        });
        //if found, return error 409 - conflict
        if (userNameData) {
            res.status(409).json({ message: 'Username already exists.  Please try logging in or select a new username.'})
            return;
        }
        //check if email exists in DB
        const emailData = await User.findOne({
            where: { email: req.body.email}
        });
        //if found, return error 409 - conflict
        if(emailData) {
            res.status(409).json({ message: 'Email aldready exists. Please try logging in or select a new email address.'})
        }
        //otherwise create new user
        await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })
         res.status(200).json({ message: 'User account created successfully. Please login.'});
    } catch (err) {
        res.status(400).json({ error: err })
    };
});

//creat idea route
router.post('/createIdea', async (req, res) => {
    try {
        // check if idea exists in DB
        const ideaData = await Idea.findOne({
            where: { idea_name: req.body.inputtedIdea }
        });
        console.log('#####################');
        console.log(req.session.user_id);

        //if found, return error
        if (ideaData) {
            res.status(400).json({ message: 'Idea already exists.  Please try another'})
            return;
        }
        console.log('#####################');
        console.log(req.session.user_id);

        //otherwise create new user
        await Idea.create({
            idea_name: req.body.inputtedIdea,
            link_name: req.body.linkName,
            description: req.body.description,
            category_id: req.body.categoryChoice,
            user_id: req.session.user_id,
        })
         res.status(200).json({ message: 'Idea created'});

    } catch (err) {
        res.status(400).json({ error: err })
    };
});

//logout user
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    };
});

module.exports = router;