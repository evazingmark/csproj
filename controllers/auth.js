
const express = require("express");
const passport = require('passport');



module.exports = (userService) => {
    const router = express.Router();

    router.get('/vk', passport.authenticate('vkontakte', { failureRedirect: '/' }));

    router.get('/vk/callback', 
        passport.authenticate('vkontakte', { failureRedirect: '/' }
    ), async (req, res) => {
        const user = await userService.readForSpId(req.user.id);
        res.redirect('/');
        //res.render('index', {user});
    });
    router.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    return router;
}

