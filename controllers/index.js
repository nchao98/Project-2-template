const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = requiqre('./homeRoutes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

module.exports = router;