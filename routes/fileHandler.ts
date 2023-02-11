import { NextFunction, Request, Response } from "express";

const express = require("express");
const router = express.Router();
const fs = require("fs/promises");

router.route("/").post(async (req: Request, res: Response) => {
  // MARK: html mime형식 데이터 지정
  const mime = req.body.file;
  // MARK: html mime -> base64로 변환
  const base64Idx = mime.indexOf(",");
  const base64 = mime.substring(base64Idx + 1);
  // MARK: 파일 저장을 위해 base64를 buffer로 변환
  const buffer = Buffer.from(base64, "base64");
  try {
    await fs.writeFile(req.body.path, buffer);
  } catch (e) {
    res.end(e);
  }
  res.end();
});

module.exports = router;
