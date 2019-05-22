module.exports = (Sequelize, sequelize) => {
    return sequelize.define("users", {
      dbId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id: Sequelize.INTEGER,
      first_name: Sequelize.STRING,
      last_name: Sequelize.STRING,
      type: Sequelize.STRING,
      photo: Sequelize.STRING
    });
  };