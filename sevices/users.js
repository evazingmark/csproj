const CrudService = require("./crud");

class UsersService extends CrudService {
    constructor(usersRepository, commentsRepository, errors){
        super(usersRepository, errors);
        this.commentsRepository = commentsRepository;
    }
    async readForSpId(id) {
        const user = await this.repository.findOne({where: {id: id}});
        if (!user) {
			return null;
		}
		return user;
    }
}

module.exports = UsersService;