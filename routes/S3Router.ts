import { Request, Response } from "express";
// Import required AWS SDK clients and commands for Node.js.
import { PutObjectCommandInput } from "@aws-sdk/client-s3";

const bucketParams: PutObjectCommandInput = require("../libs/s3/config/bucketParams");
const s3Client = require("../libs/s3/s3-client");

const express = require("express");
const router = express.Router();
const fs = require("fs/promises");

/* GET home page. */
router.route("/").post(async (req: Request, res: Response) => {
  bucketParams.Key = req.body.key;
  bucketParams.Body = req.body.body;
  await s3Client.run();
  res.end();
});

module.exports = router;
