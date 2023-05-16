const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Missatge extends Model {
        static associate(models) {
            this.belongsTo(models.Usuari, { as: "emisorId" });
            this.belongsTo(models.Usuari, { as: "receptorId" });
        }
    }

    Missatge.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        missatge: {
            type: DataTypes.STRING,
            allowNull: false
        },
        data: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        llegit: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
        {
            sequelize,
            modelName: 'Missatge'
        })

    return Missatge;
}
