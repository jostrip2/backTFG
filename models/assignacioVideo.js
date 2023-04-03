const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class AssignacioVideo extends Model {
        static associate(models) {
            this.belongsTo(models.Usuari);
            this.belongsTo(models.Video);
        }
    }

    AssignacioVideo.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        dia: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'AssignacioVideo'
    })

    return AssignacioVideo;
}
