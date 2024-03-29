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
const assignacionsRouter = require('./routes/assignacionsRoutes');
const missatgesRouter = require('./routes/missatgesRoutes');

// Cross-origin resource sharing (CORS)
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  next();
});

// Content Security Policy (CSP)
app.use(function (req, res, next) {
  res.setHeader('Content-Security-Policy',
    "default-src *; script-src *; style-src *; font-src *; img-src *; frame-src https://youtube.googleapis.com *; frame-ancestors https://youtube.googleapis.com *");
  next();
})

app.use('/api/users', usersRouter);
app.use('/api/videos', videosRouter);
app.use('/api/assignacions', assignacionsRouter);
app.use('/api/missatges', missatgesRouter);

db.sequelize.sync({ alter: true }).then((req) => {
  app.listen(app.get("port"), () => {
    console.log(`Listening: http://localhost:${app.get("port")}`);
  });
});
