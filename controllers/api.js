const express = require("express");

module.exports = (
    videosService,
    filmsService,
    usersService,
    commentsService,

    videosShema,
    filmsShema,
    usersShema,
    commentsShema
) => {
    const router = express.Router();

    const videosController = require('./videos')(videosService, videosShema);
    const usersController = require('./users')(usersService, usersShema);
    const filmsController = require('./films')(filmsService, filmsShema, usersService);
    const commentsController = require('./comments')(commentsService, commentsShema);

    router.use("/videos", videosController);
    router.use('/films', filmsController);
    router.use('/users', usersController);
    router.use('/comments', commentsController);

    return router;
}
