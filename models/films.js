module.exports = (Sequelize, sequelize) => {
    return sequelize.define("films", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: Sequelize.STRING,
      name_original: Sequelize.STRING,
      genre: Sequelize.TEXT,
      country: Sequelize.STRING,
      age_limit: Sequelize.TINYINT,
      plot: Sequelize.TEXT,
      release_date: Sequelize.DATE,
      release_bel: Sequelize.DATE,
      release_rus: Sequelize.DATE,
      in_roles: Sequelize.TEXT,
      director: Sequelize.STRING,
      film_script: Sequelize.STRING,
      music: Sequelize.STRING,
      operator: Sequelize.STRING,
      producer: Sequelize.STRING,
      company: Sequelize.STRING,
      preview_path: Sequelize.STRING,
    });
  };