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
        .then(() => res.json('Wealth added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Wealth.findById(req.params.id)
        .then(wealth => res.json(wealth))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
    Wealth.findByIdAndDelete(req.params.id)
        .then(wealth => res.json('Wealth Deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Wealth.findById(req.params.id)
        .then(wealth => {
            wealth.username = req.body.username;
            wealth.description = req.body.description;
            wealth.save()
                .then(() => res.json('Wealth Updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;