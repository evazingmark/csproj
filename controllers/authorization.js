
const express = require("express");

module.exports = (userServices) => {
    const router = express.Router();

    async function setRole(req, res, next){
        if(!req.user){
            req.ability = 'anon';
            next();
        }
        else{
            const user = await userServices.readForSpId(req.user.id);
            req.ability = user.type;
            next();
        }
        
    }

    router.use(setRole);

    return router;
}