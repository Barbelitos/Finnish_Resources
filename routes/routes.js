const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const MAIL_USER = process.env.MAIL_USER
const MAIL_PASS = process.env.MAIL_PASS

//PAGES ROUTES
router.get('/', (req, res) => {
    res.render("index", {title: 'Easy Finland - The repository of online resources on Finnish language and culture',
                        description: 'Finnish language learning repository with resources for learning the language and the culture of this beautiful country.',
                        page: 'Easy Finland',
                        subpage: 'The repository of online resources on Finnish language and culture'});
});

router.get('/language', (req, res) => {
    res.render("learning", {title: 'Language Learning',
                            description: 'Find links and tools for learning the Finnish language.',
                            page: 'Language',
                            subpage: ''});
});

router.get('/culture', (req, res) => {
    res.render("culture", {title: 'Finnish Culture',
                            description: 'Finland has a very unique culture, shaped by its difficult history. Here you can find resources to learn about the culture of this beautiful country.',
                            page: 'Culture',
                            subpage: ''});
});

router.get('/useful', (req, res) => {
    res.render("useful", {title: 'Useful Info',
                            description: 'Find information about the practicalities of moving to and living in Finland.',
                            page: 'Useful Info',
                            subpage: ''});
});

router.get('/foreigners', (req, res) => {
    res.render("foreigners", {title: 'Finland by foreigners',
                            description: 'Check out some inspiring stories and projects of foreigners in Finland who are proud to be who they are and believe in putting their strengths out there for the common good.',
                            page: ' Finland By Foreigners',
                            subpage: ''});
});

router.get('/contact', (req, res) => {
    res.render("contact", { title: 'About us',
                            description: '',
                            page: 'About Us',
                            subpage: ''});
});

//Form POST route
router.post('/contact', (req, res) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.privateemail.com',
        port: 465,
        secure: true,
        auth: {
            user: MAIL_USER,
            pass: MAIL_PASS
        }
    })
    //How the message presents
    const message = {
        from: MAIL_USER,
        to: MAIL_USER,
        subject: 'New message from EasyFinland contact form',
        text: `FROM: ${req.body.name}; EMAIL: (${req.body.email}); MESSAGE: ${req.body.suggestion}`
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

//CATCH ALL ROUTE
router.use((req, res, next) => {
    res.status(404).render('404', {title: 'Page Not Found',
                                    page: '404',
                                    subpage: ''});
});

module.exports = router;
