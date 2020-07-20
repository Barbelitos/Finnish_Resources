const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const GMAIL_USER = process.env.GMAIL_USER
const GMAIL_PASS = process.env.GMAIL_PASS

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

//Form POST route
router.post('/contact', (req, res) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: GMAIL_USER,
            pass: GMAIL_PASS
        }
    })
    //How the message presents
    const message = {
        from: 'Sender',
        to: GMAIL_USER,
        subject: 'New message from contact form',
        text: `${req.body.name} (${req.body.email}) says: ${req.body.suggestion}`
    }
    //Send the email
    transporter.sendMail(message, (error, response) => {
        if (error) {
            res.render('contact-fail', {title: 'Message Failed', page: 'Message Failed'});
            response.statusCode = 500;
        } else {
            res.render('contact-success', {title: 'Message Sent', page: 'Message Sent'})
            response.statusCode = 200;
        }
    })
})

//ERROR ROUTE
router.use((req, res, next) => {
    res.status(404).render('404', {title: 'Page Not Found',
                                    page: '404'});
});

module.exports = router;
