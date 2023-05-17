const uuid = require('uuid')
const { Missatge } = require("../db/models");
const sequelize = require('sequelize');

const getMissatgeById = (req, res) => {
    Missatge.findOne({
        where: {
            id: req.params.id,
        },
        include: "emissor",
        include: "receptor"
    }).then((missatge) => {
        if (!missatge) {
            res.status(404).json({ message: 'Missatges no trobats' });
        }
        else res.status(200).json(missatge);
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ message: err });
    });
};

const getMissatgesByEmissor = (req, res) => {
    Missatge.findAll({
        where: {
            emissorId: req.params.id
        },
        include: "emissor",
        include: "receptor"
    }).then((missatges) => {
        if (!missatges) {
            res.status(404).json({ message: 'Missatges no trobats' });
        }
        else res.status(200).json(missatges);
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ message: err });
    });
};

const getMissatgesByReceptor = (req, res) => {
    Missatge.findAll({
        where: {
            receptorId: req.params.id
        },
        include: "emissor",
        include: "receptor"
    }).then((missatges) => {
        if (!missatges) {
            res.status(404).json({ message: 'Missatges no trobats' });
        }
        else res.status(200).json(missatges);
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ message: err });
    });
};

const createMissatge = (req, res) => {
    Missatge.create({
        id: uuid.v4(),
        titol: req.body.titol,
        missatge: req.body.missatge,
        data: new Date(),
        llegit: false,
        emissorId: req.body.emissor,
        receptorId: req.body.receptor
    }).then((missatge) => {
        res.status(201).json({ data: missatge });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ message: err });
    });
};

const deleteMissatge = (req, res) => {
    Missatge.findOne({
        where: {
            id: req.params.id
        },
    }).then((missatge) => {
        if (!missatge) {
            res.status(404).json({ message: 'Missatge no trobat' });
        }
        else {
            Usuari.destroy({
                where: {
                    id: req.params.id
                },
            }).then(() => {
                res.status(200).json('Missatge eliminat');
            }).catch((err) => {
                res.status(500).json({ message: err });
            });
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ message: err });
    });

};

const marcarLlegit = (req, res) => {
    Missatge.update({ llegit: req.body.llegit },
        {
            where: {
                id: req.body.id
            }
        }).then(() => {
            res.status(200);
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ message: err });
        });
};

module.exports = {
    getMissatgeById,
    getMissatgesByEmissor,
    getMissatgesByReceptor,
    createMissatge,
    deleteMissatge,
    marcarLlegit
};