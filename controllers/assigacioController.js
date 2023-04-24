const uuid = require('uuid')
const sequelize = require('sequelize');
const moment = require('moment');

const { Video, AssignacioVideo } = require("../db/models");

const getAssignacionsByClient = (req, res) => {
    AssignacioVideo.findAll({
        where: {
            UsuariId: req.params.idClient
        },
        order: [
            ['dia', 'ASC']
        ],
        include: Video
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

const getAssignacionsById = (req, res) => {
    AssignacioVideo.findOne({
        where: {
            id: req.params.id,
        },
    })
        .then((assignacio) => {
            if (!assignacio) {
                res.status(404).json({ message: 'Assignacio no trobada' });
            }
            else res.status(200).json({ data: assignacio });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ message: err });
        });
};

const createAssignacions = (req, res) => {
    const assignacions = req.body.selectedDates.map((date) => {
        return {
            id: uuid.v4(),
            dia: moment(date).format('YYYY-MM-DD'),
            realitzat: false,
            UsuariId: req.body.UsuariId,
            VideoId: req.body.VideoId
        }
    })

    AssignacioVideo.bulkCreate(assignacions)
        .then((assignacions) => {
            res.status(201).json({ data: assignacions })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ messages: err });
        })
};

const updateAssignacio = (req, res) => {

};

const deleteAssignacio = (req, res) => {
    AssignacioVideo.findOne({
        where: {
            id: req.params.id,
        },
    })
        .then((assignacio) => {
            if (!assignacio) {
                res.status(404).json({ message: 'Assignacio no trobada' });
            }
            else {
                AssignacioVideo.destroy({
                    where: {
                        id: req.params.id,
                    },
                }).then(() => {
                    res.status(200).json('Assignacio eliminada');
                }).catch((err) => {
                    res.status(500).json({ message: err });
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ message: err });
        });
};

module.exports = {
    getAssignacionsByClient,
    getAssignacionsByVideo,
    getAssignacionsById,
    updateAssignacio,
    createAssignacions,
    deleteAssignacio
};