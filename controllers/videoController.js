const uuid = require('uuid')
const { Video } = require("../db/models");
const sequelize = require('sequelize');

const getVideos = (req, res) => {
  Video.findAll({ order: sequelize.col('nom') })
    .then((videos) => {
      if (!videos) {
        res.status(404).json({ message: 'Videos no trobats' });
      }
      else res.status(200).json(videos);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err });
    });
};

const getVideo = (req, res) => {
  Video.findOne({
    where: {
      id: req.params.id
    }
  })
    .then((video) => {
      if (!video) {
        res.status(404).json({ message: 'Video no trobat' });
      }
      else res.status(200).json({ data: video });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err });
    });
};

const createVideo = (req, res) => {
  Video.findOne({
    where: {
      codi: req.body.codi,
    },
  })
    .then((video) => {
      if (!video) {
        Video.create({
          id: uuid.v4(),
          nom: req.body.nom,
          codi: req.body.codi,
          descripcio: req.body.descripcio,
          areaExercici: req.body.areaExercici
        })
          .then((video) => {
            res.status(201).json({ data: video });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send({ message: err });
          });
      }
      else {
        res.status(200).json({ data: video, code: 1 });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err });
    });
};

const updateVideo = (req, res) => {
  Video.update(
    {
      nom: req.body.nom,
      link: req.body.link,
      descripcio: req.body.descripcio,
      area: req.body.area
    },
    {
      where: {
        id: req.body.id,
      },
    }
  )
    .then((video) => {
      if (!video) {
        res.status(404).json({ message: 'Video no trobat' });
      }
      else res.status(200).json({ data: video });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err });
    });
};

const deleteVideo = (req, res) => {
  Video.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((video) => {
      if (!video) {
        res.status(404).json({ message: 'Video no trobat' });
      }
      else {
        Video.destroy({
          where: {
            id: req.params.id,
          },
        }).then(() => {
          res.status(200).json('Video eliminat');
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
  getVideos,
  getVideo,
  createVideo,
  updateVideo,
  deleteVideo
};
