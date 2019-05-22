module.exports = (Sequelize, config) => {
    const options = {
      host: config.db.host,
      dialect: "mssql",
      logging: false,
      define: {
        timestamps: true,
        paranoid: true
      }
    };

    const sequelize = new Sequelize(
      config.db.name,
      config.db.user,
      config.db.password,
      options
    );

    const Videos = require('../models/videos')(Sequelize, sequelize);
    const Films = require('../models/films')(Sequelize, sequelize);
    const Users = require('../models/users')(Sequelize, sequelize);
    const Comments = require('../models/comments')(Sequelize, sequelize);

    Videos.belongsTo(Films);
    Comments.belongsTo(Films);
    Comments.belongsTo(Users, {foreignKey: 'userId'});

    return {
      videos: Videos,
      films: Films,
      users: Users,
      comments: Comments,

      sequelize,
      Sequelize,
    };
  };
