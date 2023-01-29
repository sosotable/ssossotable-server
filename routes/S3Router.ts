import { NextFunction, Request, Response } from "express";
// Import required AWS SDK clients and commands for Node.js.
import { PutObjectCommand, PutObjectCommandInput} from "@aws-sdk/client-s3";
import {s3Client} from "../libs/s3Client.js"; // Helper function that creates an Amazon S3 service client module.

const express = require("express");
const router = express.Router();
const fs = require("fs/promises");

let bucketParams: PutObjectCommandInput;
export default bucketParams = {
    Bucket: "ssossotable",
    // Specify the name of the new object. For example, 'index.html'.
    // To create a directory for the object, use '/'. For example, 'myApp/package.json'.
    Key: "OBJECT_NAME",
    // Content of the new object.
    Body: "BODY",
};

// Create and upload the object to the S3 bucket.
const run = async () => {
    try {
        const data = await s3Client.send(new PutObjectCommand(bucketParams));
        return data; // For unit tests.
        console.log(
            "Successfully uploaded object: " +
            bucketParams.Bucket +
            "/" +
            bucketParams.Key
        );
    } catch (err) {
        console.log("Error", err);
    }
};
/* GET home page. */
router.route("/")
    .post(async (req: Request, res: Response) => {
        bucketParams.Key = req.body.key
        bucketParams.Body = req.body.body
        await run()
        res.end();
});

module.exports = router;