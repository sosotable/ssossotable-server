import { NextFunction, Request, Response } from "express";
interface ExtendedRequest extends Request {
  session: any;
}

require("dotenv").config();
const port = process.env.PORT || 3000;
const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const fileUpload = require("express-fileupload");
/** MARK: DAO 모듈
 * */
const DAO = require("../dist/modules/DAO");

/** MARK: express
 * **/
const express = require("express");
const app = express();

/** MARK: io
 * **/
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:9000",
    methods: ["GET", "POST"],
  },
});

/** MARK: routers
 * **/
const indexRouter = require("./routes/index");
const signUpAuthMailRouter = require("./routes/signUpAuthMail");
const DAORouter = require("./routes/DAO");
const fileHandlerRouter = require("./routes/fileHandler");
const userSessionHandlerRouter = require("./routes/userSessionHandler");

// view engine setup
app.set("views", path.join(process.env.BUILD_PATH, "views"));
app.set("view engine", "ejs");
app.set("trust proxy", 1);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.env.BUILD_PATH, "public")));
// ADDED: cors 사용
app.use(cors());
app.use(
  fileUpload({
    limits: {
      fileSize: 10000000, //10mb
    },
    abortOnLimit: true,
  })
);

app.use(async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  if (!req.session) {
    return next(new Error("oh no")); // handle error
  }
  next(); // otherwise continue
});

app.use("/", indexRouter);
app.use("/authMail", signUpAuthMailRouter);
app.use("/DAO", DAORouter);
app.use("/fileHandler", fileHandlerRouter);
app.use("/userSessionHandler", userSessionHandlerRouter);

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

io.on("connection", async (socket: any) => {
  console.log("a user connected");

  const mysql_dbc = require("../dist/modules/db_connection")();
  const connection = await mysql_dbc.init();
  socket.on("disconnect", () => {
    console.log("user disconnected");
    connection.end();
  });
  socket.on("INSERT", async (msg: any) => {
    try {
      /** MARK:
       *  colmumns 가 undefined 키워드 즉 입력되지 않은 경우 생략하고 모든 열에 입력됨
       * */
      if (msg.columns === undefined) {
        await connection.query(
          `INSERT INTO ` + `${msg.table} ` + `VALUES(${msg.values})`
        );
      } else {
        await connection.query(
          `INSERT INTO ` +
            `${msg.table}(${msg.columns}) ` +
            `VALUES(${msg.values})`
        );
      }
    } catch (e) {
      console.error(e);
    }
  });
  socket.on("SELECT", async (msg: any) => {
    try {
      /** MARK:
       *  where 매개변수를 입력하지 않는 경우 모든 열 검색
       * */
      if (msg.where === undefined) {
        const [rows, fields] = await connection.query(
          `SELECT ` + `${msg.columns} ` + `FROM ` + `${msg.table}`
        );
        io.emit("SELECT", {
          TAG: msg.TAG,
          returnValue: rows,
        });
      } else {
        const [rows, fields] = await connection.query(
          `SELECT ` +
            `${msg.columns} ` +
            `from ` +
            `${msg.table} ` +
            `WHERE ${msg.where}`
        );
        io.emit("SELECT", {
          TAG: msg.TAG,
          returnValue: rows,
        });
      }
    } catch (e) {
      console.error(e);
    }
  });
  socket.on("UPDATE", async (msg: any) => {
    try {
      await connection.query(
        `UPDATE ` + `${msg.table} ` + `SET ${msg.set} ` + `WHERE ${msg.where}`
      );
    } catch (e) {
      console.error(e);
    }
  });
  socket.on("DELETE", async (msg: any) => {
    try {
      await connection.query(
        `DELETE ` + `FROM ` + `${msg.table} ` + `WHERE ${msg.where}`
      );
    } catch (e) {
      console.error(e);
    }
  });
});

app.listen(port, async () => {
  await DAO.init();
});
