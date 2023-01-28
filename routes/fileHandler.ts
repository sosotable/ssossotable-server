import { NextFunction, Request, Response } from "express";

const express = require("express");
const router = express.Router();
const fs = require("fs/promises");

/* GET home page. */
router.route("/").post(async (req: Request, res: Response) => {
  const mime = JSON.stringify(req.body.file);
  const typeIdx = mime.indexOf("/");
  const base64Idx = mime.substring(typeIdx + 1).indexOf("/");
  const base64 = mime.substring(typeIdx + base64Idx + 1);
  const buffer = Buffer.from(base64.substring(0, base64.length - 1), "base64");
  await fs.writeFile(req.body.path, buffer);
  res.end();
});

module.exports = router;
