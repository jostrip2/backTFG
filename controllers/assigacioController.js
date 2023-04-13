const uuid = require('uuid')
const { AssignacioVideo } = require("../db/models");
const sequelize = require('sequelize');

const getAssignacionsByClient = (req, res) => {
    AssignacioVideo.findAll({
        where: {
            id: req.params.idClient
        }
    })
        .then((assignacions) => {
            if (!assignacions) {
                res.status(404).json({ message: 'No hi ha assignacions' });
            }
            else res.status(200).json(assignacions);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ message: err });
        });
};

const getAssignacionsByVideo = (req, res) => {
    AssignacioVideo.findAll({
        where: {
            id: req.params.idVideo
        }
    })
        .then((assignacions) => {
            if (!assignacions) {
                res.status(404).json({ message: 'No hi ha assignacions' });
            }
            else res.status(200).json(assignacions);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ message: err });
        });
};

const createAssignacio = (req, res) => {
    AssignacioVideo.create({
        id: uuid.v4(),
        dia: req.body.dia,
        realitzat: req.body.realitzat,
        UsuariId: req.body.UsuariId,
        VideoId: req.body.VideoId
    })
        .then((assignacio) => {
            res.status(201).json({ data: assignacio });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ message: err });
        });
};

const updateAssignacio = (req, res) => {

};

const deleteAssignacio = (req, res) => {

};

module.exports = {
    getAssignacionsByClient,
    getAssignacionsByVideo,
    updateAssignacio,
    createAssignacio,
    deleteAssignacio
};