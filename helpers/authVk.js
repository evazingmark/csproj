
const passport = require('passport');
const VKStrategy = require('passport-vkontakte').Strategy;
const config = require('../config.json');


module.exports = (userService) => {
    this.userService = userService;
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    
    passport.use(new VKStrategy({
        clientID: config.vk.key,
        clientSecret: config.vk.secret,
        callbackURL: `${config.uri}auth/vk/callback`
    },
    async function(accessToken, refreshToken, params, profile, done){
        //console.log(profile);
        const user = await userService.readForSpId(profile.id);
        if(!user){
            let data = {
                id: profile._json.id,
                first_name: profile._json.first_name,
                last_name: profile._json.last_name,
                photo: profile._json.photo,
                type: 'user'
            }
            await userService.create(data);
        }
        return done(null, profile)
    }));

    return passport;
}

