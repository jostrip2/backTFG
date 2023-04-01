module.exports = (sequelize, DataTypes) => {
    const Usuari = sequelize.define("Usuari", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
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
    });

    Usuari.belongsTo(Usuari, { foreignKey: { allowNull: true }, as: "Fisioterapeuta" });

    return Usuari;
}

