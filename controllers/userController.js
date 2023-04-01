const bcrypt = require('bcrypt');
const uuid = require('uuid')
const { Usuari } = require("../models");
const authService = require('../services/authService')
const sequelize = require('sequelize');

const getAllUsers = (req, res) => {
  Usuari.findAll({ order: sequelize.col('username'), include: "Fisioterapeuta" })
    .then((usuaris) => {
      if (!usuaris) {
        res.status(404).json({ message: 'Usuaris no trobats' });
      }
      else res.status(200).json(usuaris);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err });
    });
};

const getOneUser = (req, res) => {
  Usuari.findOne({
    where: {
      username: req.params.username,
    },
  })
    .then((usuari) => {
      if (!usuari) {
        res.status(404).json({ message: 'Usuari no trobat' });
      }
      else res.status(200).json({ data: usuari });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err });
    });
};

const createNewUser = (req, res) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (!err) {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (!err) {
          const id = uuid.v4()
          const fisioId = (req.body.fisio == 'null') ? id : req.body.fisio.id
          Usuari.create({
            id: id,
            username: req.body.username,
            password: hash,
            email: req.body.email,
            numMobil: req.body.numMobil,
            rol: req.body.rol,
            nom: req.body.nom,
            cognoms: req.body.cognoms,
            FisioterapeutaId: fisioId
          })
            .then((usuari) => {
              res.status(201).json({ data: usuari });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).send({ message: err });
            });
        }
      })
    }
  })
};

const updateOneUser = (req, res) => {
  Usuari.update(
    {
      username: req.body.username,
      email: req.body.email,
      numMobil: req.body.numMobil,
      rol: req.body.rol,
    },
    {
      where: {
        username: req.body.username,
      },
    }
  )
    .then((usuari) => {
      console.log('Updated')
      if (!usuari) {
        res.status(404).json({ message: 'Usuari no trobat' });
      }
      else res.status(200).json({ data: usuari });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err });
    });
};

const updatePassword = (req, res) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (!err) {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (!err) {
          User.update(
            {
              password: hash,
            },
            {
              where: {
                username: req.body.username,
              },
            }
          )
            .then((usuari) => {
              if (!usuari) {
                res.status(404).json({ message: 'Usuari no trobat' });
              }
              else res.status(200).json({ data: usuari });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).send({ message: err });
            });
        }
      })
    }
  })
}

const deleteOneUser = (req, res) => {
  Usuari.findOne({
    where: {
      username: req.params.username,
    },
  })
    .then((usuari) => {
      if (!usuari) {
        res.status(404).json({ message: 'Usuari no trobat' });
      }
      else {
        Usuari.destroy({
          where: {
            username: req.params.username,
          },
        }).then(() => {
          res.status(200).json('User deleted');
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

const signIn = (req, res) => {
  Usuari.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((usuari) => {
      if (!usuari) {
        res.status(404).json({ message: 'Usuari no trobat' });
      }
      else {
        bcrypt.compare(req.body.password, usuari.password, (err, result) => {
          if (result) res.status(200).json({ token: authService.createToken(usuari), rol: usuari.rol });
          else res.status(500).send({ message: err })
        })
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err });
    });
};

module.exports = {
  getAllUsers,
  getOneUser,
  createNewUser,
  updateOneUser,
  deleteOneUser,
  signIn
};
