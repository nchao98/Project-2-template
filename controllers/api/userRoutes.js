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

            res.status(200).json({message: 'Your are not logged in.'});
        });
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;