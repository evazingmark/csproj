const Sequelize = require("sequelize");
const config = require("../config.json");
const db = require("../context")(Sequelize, config);

const {
    expect
} = require('chai');


const errors = require('../helpers/errors');
const VideosService = require('../sevices/videos');
const FilmsService = require('../sevices/films');
const UsersService = require('../sevices/users');
const CommentsService = require('../sevices/comments');

const videosService = new VideosService(db.videos, db.films, errors);
const filmService = new FilmsService(db.films, db.videos, errors);
const usersService = new UsersService(db.users, db.comments, errors);
const commentsService = new CommentsService(db.comments, db.users, db.films, errors);

describe('video testing', () => {
    it('create new video', async () => {
        const data = {
            filmId: 24,
            link:"https://www.youtube.com/embed/3s5zsFm3VgA",
            preview_text:"трейлер 2"
        };
        const video = await videosService.create(data);
        expect(video.link).to.equal('https://www.youtube.com/embed/3s5zsFm3VgA');
        expect(video.preview_text).to.equal('трейлер 2');
        expect(video.filmId).to.equal(24)
    });

    it('shows info about video #9', async () => {
        const video = await videosService.read(9);
        expect(video.link).to.equal('https://www.youtube.com/embed/taQW31SVPCk');
    });

    it('update video', async () => {
        const data = {
            link: '4444'
        };
        const video = await videosService.update(1, data);
        expect(video.link).to.equal('4444');
    });


});


describe('film testing', () => {
    it('create new film', async () => {
        const data = {
            name: "testLALA",
            genre: "триллер, фантастика",
            country: "Великобритания",
            age_limit: 18,
            plot: "test",
            release_date: "2017-03-09T21:00:00.000Z",
            release_bel: "2017-05-09T21:00:00.000Z",
            release_rus: "2017-05-09T21:00:00.000Z",
            in_roles: "Райан Гослинг, Харрисон Форд, Ана де Армас, Сильвия Хукс",
            director: "Дени Вильнёв",
        };
        const film = await filmService.create(data);
        expect(film.name).to.equal('testLALA');
        expect(film.age_limit).to.equal(18);
        expect(film.country).to.equal("Великобритания")
    });

    it('shows info about video #9', async () => {
        const film = await filmService.read(24);
        expect(film.name).to.equal('Бегущий по лезвию 2049');
    });

    it('update video', async () => {
        const data = {
            name: 'testTEST'
        };
        const film = await filmService.update(23, data);
        expect(film.name).to.equal('testTEST');
    });


});

