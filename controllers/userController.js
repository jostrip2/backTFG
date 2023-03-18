const bcrypt = require('bcrypt');
const uuid = require('uuid')
const { Usuari } = require("../models");
const authService = require('../services/authService')

const getAllUsers = (req, res) => {
  Usuari.findAll()
    .then((usuaris) => {
      if (!usuaris) {
        res.status(404).json({ message: 'Usuaris no trobats' });
      }
      else res.status(200).json({ data: usuaris });
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
          Usuari.create({
            id: uuid.v4(),
            username: req.body.username,
            password: hash,
            email: req.body.email,
            numMobil: req.body.numMobil,
            rol: req.body.rol,
          })
            .then((usuari) => {
              res.status(200).json({ data: usuari });
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
  User.update(
    {
      username: req.body.username,
      password: req.body.password,
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

const deleteOneUser = (req, res) => {
  User.destroy({
    where: {
      username: req.params.username,
    },
  });
  res.status(200).json({ message: 'Usuari no trobat' });
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
          if (result) res.status(200).json({ data: authService.createToken(usuari) });
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
