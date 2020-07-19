var express = require('express');
var router = express.Router();

//PAGES ROUTES
router.get('/', function(req, res){
    res.render("index", {title: 'Home Page',
                        page: 'Finnish Resources'});
});

router.get('/language', function(req, res){
    res.render("learning", {title: 'Language Learning',
                            page: 'Language'});
});

router.get('/culture', (req, res) => {
    res.render("culture", {title: 'Finnish Culture',
                            page: 'Culture'});
});

router.get('/useful', (req, res) => {
    res.render("useful", {title: 'Useful Links', 
                            page: 'Useful Links'});
});

router.get('/contact', (req, res) => {
    res.render("contact", {title: 'Contact Us', 
                            page: 'Contact Us'});
});

//ERROR ROUTE
router.use((req, res, next) => {
    res.status(404).render('404', {title: 'Page Not Found',
                                    page: '404'});
});

module.exports = router;
