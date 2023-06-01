const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Usuari extends Model {
        static associate(models) {
            this.belongsTo(this, { foreignKey: { allowNull: true }, as: "Fisioterapeuta" })
            this.hasMany(models.AssignacioVideo, { as: "Assignacio" })
        }
    }

    Usuari.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cognoms: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nomComplet: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.nom} ${this.cognoms}`;
            }
        },
        email: {
            type: DataTypes.STRING,
        },
        numMobil: {
            type: DataTypes.STRING(9),
            isNumeric: true,
        },
        rol: {
            type: DataTypes.STRING
        }
    },
        {
            sequelize,
            modelName: 'Usuari'
        })

    return Usuari;
}

