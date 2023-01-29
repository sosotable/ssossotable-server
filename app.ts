import { Request, Response, NextFunction } from "express";

require("dotenv").config();

const createError = require("http-errors");
// @ts-ignore
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

/** MARK: routers
 * **/
const indexRouter = require("./routes/index");
const signUpAuthMailRouter = require("./routes/signUpAuthMail");
const DAORouter = require("./routes/DAO");
const fileHandlerRouter = require("./routes/fileHandler");
const userSessionHandlerRouter = require("./routes/userSessionHandler");
const S3Router = require("./routes/S3Router");

const app = express();

// view engine setup
app.set("views", path.join(process.env.BUILD_PATH, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.env.BUILD_PATH, "public")));
app.use(cors());

/** MARK: routers setting
 * **/
app.use("/", indexRouter);
app.use("/authMail", signUpAuthMailRouter);
app.use("/DAO", DAORouter);
app.use("/fileHandler", fileHandlerRouter);
app.use("/userSessionHandler", userSessionHandlerRouter);
app.use("/S3", S3Router);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
