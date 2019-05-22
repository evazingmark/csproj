const CrudService = require("./crud");
const fs = require("fs");

const rootPath = require('app-root-path')
const pathFolder = `${rootPath}\\views\\images\\videos\\`;

class VideosService extends CrudService {
    constructor(videosRepository, filmsRepository, errors){
        super(videosRepository, errors);
        this.filmsRepository = filmsRepository;
    }
    async bindVideo(id, filmId) {
        const videoBeforeUpdate = await super.read(id);
        const film = await this.filmsRepository.findById(filmId, {raw: true});

        if(!videoBeforeUpdate || !film) {
            this.errors.notFound;
        }

        return await super.update(id, {
			...videoBeforeUpdate,
			filmId: filmId
		});
    }
    async unbindVideo(id) {
        const videoBeforeUpdate = await super.read(id);
        if(!videoBeforeUpdate) {
            this.errors.notFound;
        }
        return await super.update(id, {
            ...videoBeforeUpdate,
            filmId: null
        })
    }
}

module.exports = VideosService;