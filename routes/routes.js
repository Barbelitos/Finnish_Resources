const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const GMAIL_USER = process.env.GMAIL_USER
const GMAIL_PASS = process.env.GMAIL_PASS

//PAGES ROUTES
router.get('/', function(req, res){
    res.render("index", {title: 'Easy Finland - The repository of online resources on Finnish language and culture',
                        page: 'Easy Finland',
                        subpage: 'The repository of online resources on Finnish language and culture'});
});

router.get('/language', function(req, res){
    res.render("learning", {title: 'Language Learning',
                            page: 'Language',
                            subpage: ''});
});

router.get('/culture', (req, res) => {
    res.render("culture", {title: 'Finnish Culture',
                            page: 'Culture',
                            subpage: ''});
});

router.get('/useful', (req, res) => {
    res.render("useful", {title: 'Useful Links', 
                            page: 'Useful Links',
                            subpage: ''});
});

router.get('/contact', (req, res) => {
    res.render("contact", {title: 'Contact Us', 
                            page: 'Contact Us',
                            subpage: ''});
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
        from: req.body.name + ' &lt;' + req.body.email + '&gt',
        to: GMAIL_USER,
        subject: 'New message from contact form',
        text: `${req.body.name} (${req.body.email}) says: ${req.body.suggestion}`
    }
    //Send Message
    transporter.sendMail(message, (error, response) => {
        if (error) {
            res.render('contact-fail', {title: 'Message Failed', page: 'Message Failed', subpage: ''});
            response.statusCode = 500;
        } else {
            res.render('contact-success', {title: 'Message Sent', page: 'Message Sent', subpage: ''})
            response.statusCode = 200;
        }
    })
});

//ERROR CATCH ALL ROUTE
router.use((req, res, next) => {
    res.status(404).render('404', {title: 'Page Not Found',
                                    page: '404',
                                    subpage: ''});
});

module.exports = router;
