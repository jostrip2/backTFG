const uuid = require('uuid')
const { Usuari } = require("../db/models");
const authService = require('../services/authService')
const bcryptService = require('../services/bcryptService')
const sequelize = require('sequelize');

const getUsers = (req, res) => {
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

const getUser = (req, res) => {
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

const createUser = (req, res) => {
  Usuari.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((usuari) => {
      if (!usuari) {
        const password = bcryptService.hashPassword(req.body.password);
        const id = uuid.v4()
        const fisioId = (req.body.fisio == 'null') ? id : req.body.fisio.id
        Usuari.create({
          id: id,
          username: req.body.username,
          password: password,
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
      else res.status(200).json({ data: usuari, code: 1 });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err });
    });

};

const updateUser = (req, res) => {
  Usuari.update(
    {
      nom: req.body.nom,
      cognoms: req.body.cognoms,
      email: req.body.email,
      numMobil: req.body.numMobil,
      FisioterapeutaId: req.body.FisioterapeutaId
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

const updatePassword = (req, res) => {
  const password = bcryptService.hashPassword(req.body.password);
  User.update(
    {
      password: password,
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

const deleteUser = (req, res) => {
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
          res.status(200).json('Usuari eliminat');
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
    include: "Fisioterapeuta"
  })
    .then((usuari) => {
      if (!usuari) {
        res.status(404).json({ message: 'Usuari no trobat' });
      }
      else {
        let esIgual = bcryptService.comparePassword(req.body.password, usuari.password);
        if (esIgual) {
          res.status(200).json({ id: usuari.id, token: authService.createToken(usuari), rol: usuari.rol, fisio: usuari.Fisioterapeuta });
        }
        else {
          res.status(500).send({ message: err })
        }
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updatePassword,
  deleteUser,
  signIn
};
