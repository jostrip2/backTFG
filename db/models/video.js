const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Video extends Model {
        static associate(models) {
            this.hasMany(models.AssignacioVideo, { as: "Assignacio" })
        }
    }

    Video.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        codi: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcio: {
            type: DataTypes.STRING,
            allowNull: true
        },
        areaExercici: {
            type: DataTypes.ENUM,
            values: ['Braços', 'Tronc', 'Cames', 'Coll']
        }
    }, {
        sequelize,
        modelName: 'Video'
    })

    return Video;
}

