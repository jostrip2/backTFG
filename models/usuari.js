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

    return Usuari;
}

