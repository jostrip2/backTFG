const { Usuari } = require("../models");

const getAllUsers = (req, res) => {
  Usuari.findAll()
    .then((usuaris) => {
      res.status(200).json({ data: usuaris });
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
};

const getOneUser = (req, res) => {
  Usuari.findOne({
    where: {
      username: req.params.username,
    },
  })
    .then((usuari) => {
      res.status(200).json({ data: usuari });
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
};

const createNewUser = (req, res) => {
  Usuari.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    numMobil: req.body.numMobil,
    rol: req.body.rol,
  })
    .then((usuari) => {
      res.status(200).json({ data: usuari });
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
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
      if (usuari == null) {
        res.status(404).send();
      }
      else res.status(200).json({ data: usuari });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send();
    });
};

const deleteOneUser = (req, res) => {
  User.destroy({
    where: {
      username: req.params.username,
    },
  });
  res.status(200).send();
};

const login = (req, res) => {
  Usuari.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((usuari) => {
      if (usuari == null) {
        res.status(404).send();
      }
      else if (req.body.password == usuari.password) {
        res.status(200).json({ data: true });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send();
    });
};

module.exports = {
  getAllUsers,
  getOneUser,
  createNewUser,
  updateOneUser,
  deleteOneUser,
  login
};
