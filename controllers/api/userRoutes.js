const router = require('express').Router();
const { User } = require('../../models');

//login route
router.post('/login', async (req, res) => {
    try {
        //check to see if user exists in DB
        const userData = await User.findOne({
            where: { username: req.body.username }
        });
        //if not found send error
        if (!userData) {
            res.status(400).json({ message: 'Incorrect username and/or password.  Please try again'});
            return;
        }
        //otherwise, check password
        const validPassword = await userData.checkPassword(req.body.password);
        //if password not valid send error
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password, please try again.' });
            return;
        }
        //otherwise, save user details to session
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

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
        const userData = await User.findOne({
            where: { username: req.body.username }
        });
        //if found, return error
        if (userData) {
            res.status(400).json({ message: 'Username already exists.  Please try logging in or select a new username.'})
            return;
        }
        //otherwise create new user
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })
        res.status(200).json({ message: 'User account created successfully. Please login.'});
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
    };
});

module.exports = router;