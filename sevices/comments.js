const CrudService = require("./crud");

class CommentsService extends CrudService {
    constructor(commentsRepository, usersRepository, filmsRepository, errors){
        super(commentsRepository, errors);
        this.usersRepository = usersRepository;
        this.filmsRepository = filmsRepository;
    }
    async getFilmComments(filmId){
        const film = await this.filmsRepository.findById(filmId);

        if(!film) {
            this.errors.notFound;
        }

        return await this.repository.findAll({
			where: { filmId: film.id },
			include: [
                {model: this.usersRepository, required: true}
            ]
		});
    }
   
}

module.exports = CommentsService;