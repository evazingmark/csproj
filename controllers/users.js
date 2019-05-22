const CrudController = require("./crud");

class UsersController extends CrudController{
    constructor(usersService, usersShema){
        super(usersService, usersShema);
        this.registerRoutes();
    }
}

module.exports = (usersService, usersShema) => {
    const usersController = new UsersController(usersService, usersShema);
  
    return usersController.router;
};