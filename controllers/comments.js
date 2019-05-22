const CrudController = require("./crud");

class CommentsController extends CrudController{
    constructor(commentsService, commentsShema){
        super(commentsService, commentsShema);

        this.readComments = this.readComments.bind(this);
        this.routes = {
            
            "/film/:id/": [
                { method: "get", cb: this.readComments, schema: this.schema.read }
            ],
            ...this.routes,
        }
        this.registerRoutes();
    }

    async readComments(req, res) {
        res.send(await this.service.getFilmComments(req.params.id));
    }
    async create(req, resp) {
        if(req.ability === 'anon'){
            resp.send('anon user access denied');
            return;
        }
        resp.send(await this.service.create(req.body));
    }
}

module.exports = (commentsService, commentsShema) => {
    const commentsController = new CommentsController(commentsService, commentsShema);
  
    return commentsController.router;
};