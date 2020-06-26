var express = require ('express');

var router = express.Router();
var burger = require('../mopdels/burger.js');

// get rout -> index
router.get('/', function(req, res) {
    res.redirect('/burgers');
});

router.get('/burgers', function (req, res) {
    // express callback response by calling burger.selectAllBurger
    burger.all(function(burgerData) {
        res.render('index', { burger_data: burgerData});
    });
});

// post route -> back to index
router.post('/burgers/create', function(req, res) {
    // takes request object using it as imput for burger.addBurger
    burger.create(req.body.burger_name, function(result) {
        // wrapper for orm.js that using MySQL insert callback will return a log to console,
        // render back to index with handle
        console.log(result);
        res.redirect('/');
    });
});

// put route -> back to index
router.put('burgers/:id', function(req, res) {
    burger.update(req.params.id, function(result) {
        // wrapper for orm.js that using MySQL update callback will return a log ot console,
        // render back to index with handle
        console.log(result);
        // Send back response and let page reload from .then in Ajax
        res.sendStatus(200);
    });
});

module.exports = {router};