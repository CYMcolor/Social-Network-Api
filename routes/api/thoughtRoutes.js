const router = require('express').Router();

const {
    createThought
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/')
    .get(getUsers)
    .post(createUser);

module.exports = router;