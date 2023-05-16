const uuid = require('uuid')
const { Missatge } = require("../db/models");
const sequelize = require('sequelize');

const getMissatgeById = (req, res) => {
    Missatge.findOne({
        where: {
            id: req.params.id,
        },
        include: "emisorId",
        include: "receptorId"
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

const getMissatgesByEmisor = (req, res) => {
    Missatge.findOne({
        where: {
            emisorId: req.params.emisorId
        },
        include: "emisorId",
        include: "receptorId"
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
    Missatge.findOne({
        where: {
            receptorId: req.params.receptorId
        },
        include: "emisorId",
        include: "receptorId"
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
        id: req.body.id,
        missatge: req.body.missatge,
        data: new Date(),
        llegit: false,
        emisorId: req.body.emisorId,
        receptorId: req.body.receptorId
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

module.exports = {
    getMissatgeById,
    getMissatgesByEmisor,
    getMissatgesByReceptor,
    createMissatge,
    deleteMissatge
};