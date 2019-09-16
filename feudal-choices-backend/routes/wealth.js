const router = require('express').Router();
let Wealth = require('../models/wealth.model');

router.route('/').get((req, res) => {
    Wealth.find()
        .then(wealth => res.json(wealth))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;

    const newWealth = new Wealth({
        username,
        description,
    });

    newWealth.save()
        .then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;