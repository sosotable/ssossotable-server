import { NextFunction, Response, Request } from "express";

const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.render("index", { title: "소소식탁" });
});

module.exports = router;
