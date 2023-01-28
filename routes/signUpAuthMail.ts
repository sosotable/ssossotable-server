import { NextFunction, Request, Response } from "express";

const express = require("express");
const router = express.Router();

// MARK: naver cloud mailer api 이용 인증 메일 전송 라우터
router.route("/").post(async (req: Request, res: Response) => {
  const naverCloudApi = require("../modules/naver_cloud_api");
  const sendData = JSON.parse(req.body.sendData);
  const mail_body = require("../models/mail_body.js").body(sendData.body);
  await naverCloudApi.mailer({
    senderAddress: sendData.senderAddress,
    title: sendData.title,
    body: mail_body,
    recipients: {
      address: sendData.recipients.address,
      type: sendData.recipients.type,
    },
  });
  res.end();
});

module.exports = router;
