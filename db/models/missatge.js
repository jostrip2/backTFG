const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Missatge extends Model {
        static associate(models) {
            this.belongsTo(models.Usuari, { as: "emissor" });
            this.belongsTo(models.Usuari, { as: "receptor" });
        }
    }

    Missatge.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        titol: {
            type: DataTypes.STRING,
            allowNull: false
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

