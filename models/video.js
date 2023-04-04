const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Video extends Model {
        static associate(models) {
            this.belongsToMany(models.Usuari, { through: models.AssignacioVideo })
            this.hasMany(models.AssignacioVideo, { as: "Assignacio" })
        }
    }

    Video.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        link: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        descripcio: {
            type: DataTypes.STRING,
            allowNull: true
        },
        areaExercici: {
            type: DataTypes.ENUM,
            values: ['Bracos', 'Tronc', 'Cames', 'Coll']
        }
    }, {
        sequelize,
        modelName: 'Video'
    })

    return Video;
}

