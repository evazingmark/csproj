const CrudController = require("./crud");
//const imgMulter = require("../helpers/image")('videos');

class VideosController extends CrudController{
    constructor(videosService, videosShema){
        super(videosService, videosShema);

        this.bindVideo = this.bindVideo.bind(this);
        this.unbindVideo = this.unbindVideo.bind(this);
        //this.uploadImg = this.uploadImg.bind(this);

        this.routes = {
            ...this.routes,
            "/:id/film/:filmId": [
                { method: "get", cb: this.bindVideo }
            ],
            "/:id/unbind": [
                { method: "delete", cb: this.unbindVideo }
            ]
        };
        // this.routes["/"].unshift({ method: "post", img: imgMulter, cb: this.uploadImg, schema: this.schema.create});
        // this.routes["/:id"].unshift({ method: "post", img: imgMulter, cb: this.uploadImg, schema: this.schema.update});

        this.registerRoutes();
    }

    async bindVideo(req, resp) {
        if(req.ability !== 'admin'){
            resp.send('access denied');
            return;
        }
        const filmId = req.params.filmId;
        const id = req.params.id;
        resp.send(await this.service.bindVideo(id, filmId));
    }
    
    async unbindVideo(req, resp) {
        if(req.ability !== 'admin'){
            resp.send('access denied');
            return;
        }
        const id = req.params.id;
        resp.send(await this.service.unbindVideo(id));
    }

    // async uploadImg(req, res, next){      
    //     req.body.preview_path = req.file.filename || ''
    //     res.send(await this.service.create(req.body));
    // }
}

module.exports = (videosService, videosShema) => {
    const videosController = new VideosController(videosService, videosShema);
  
    return videosController.router;
};