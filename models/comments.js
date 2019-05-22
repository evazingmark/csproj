module.exports = (Sequelize, sequelize) => {
    return sequelize.define("comments", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      message: Sequelize.TEXT,
    });
  };