import { NextFunction, Request, Response } from "express";

const express = require("express");
const router = express.Router();
const fs = require("fs/promises");

/* GET home page. */
router.route("/").post(async (req: Request, res: Response) => {
  const mime = req.body.file
  const base64Idx = mime.indexOf(",");
  const base64 = mime.substring(base64Idx + 1);
  const buffer = Buffer.from(base64, "base64");
  await fs.writeFile(req.body.path, buffer);
  res.end();
});

module.exports = router;
