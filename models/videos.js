module.exports = (Sequelize, sequelize) => {
    return sequelize.define("videos", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        link: Sequelize.STRING,
        preview_path: Sequelize.STRING,
        preview_text: Sequelize.STRING,
    });
};