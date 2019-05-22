const CrudController = require("./crud");
const imgMulter = require("../helpers/image")('films');
const sharp = require("sharp");
//const rootPath = require('app-root-path');

class FilmsController extends CrudController{
    
    constructor(filmsService, filmsShema, usersService){
        super(filmsService, filmsShema);

        this.usersService = usersService;
        this.readVideos = this.readVideos.bind(this);
        this.uploadImg = this.uploadImg.bind(this);
        this.find = this.find.bind(this);
        
        let oldRoutes = this.routes;

        this.routes = {
            "/find": [
                {method: "get", cb: this.find, schema: this.schema.find}
            ],
            "/:id/videos": [
                { method: "get", cb: this.readVideos, schema: this.schema.read }
            ],
            ...oldRoutes
        }

        this.routes["/"].unshift({ method: "post", img: imgMulter, cb: this.uploadImg, schema: this.schema.create});
        this.routes["/:id"].unshift({ method: "post", img: imgMulter, cb: this.uploadImg, schema: this.schema.update});
        
        this.registerRoutes();
    }

    async readVideos(req, res) {
        const id = req.params.id;
        const film = await this.service.read(id);
        const videos = await this.service.readVideos(id);

        if(req.user) {
            const user = await this.usersService.readForSpId(req.user.id);
            res.render('film', {
                film, 
                videos: videos.data,
                user
            });
        }
        else { 
            res.render('film', {
                film, 
                videos: videos.data,
                user: {type: 'anon'}
            });
        }    
    }
    async uploadImg(req, res, next){
        req.body.preview_path = req.file.filename;

        // await sharp(`${rootPath}/views/images/films/${req.file.filename}`)
        //     .resize(300, 200);
            // .crop(sharp.strategy.entropy)
            // .toFile(`../views/images/films/${req.file.filename}`);

        res.send(await this.service.create(req.body));
    }
    async find(req, res){
        res.send(await this.service.find(req.query.name));
    }
}

module.exports = (filmsService, filmsShema, usersService) => {
    const filmsController = new FilmsController(filmsService, filmsShema, usersService);
  
    return filmsController.router;
};

