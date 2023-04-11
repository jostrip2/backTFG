const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const cors = require('cors');

const app = express();

dotenv.config();
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 2);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// DB
const db = require("./db/models")

// Routes
const usersRouter = require('./routes/usersRoutes');
const videosRouter = require('./routes/videosRoutes');

// CORS
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  next();
});

app.use('/api/users', usersRouter);
app.use('/api/videos', videosRouter);

db.sequelize.sync({ alter: true }).then((req) => {
  app.listen(app.get("port"), () => {
    console.log(`Listening: http://localhost:${app.get("port")}`);
  });
});
