const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");

const app = express();

dotenv.config();
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 2);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// DB
const db = require("./models")

// Routes
const usersRouter = require('./routes/users');

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);

db.sequelize.sync().then((req) => {
  app.listen(app.get("port"), () => {
    console.log(`Listening: http://localhost:${app.get("port")}/api`);
  });
});
