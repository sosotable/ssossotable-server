import { NextFunction, Request, Response } from "express";
import { ReturnValue, ExtendedRequest } from "../interface/models";

const express = require("express");
const router = express.Router();

router
  .route("/:method")
  .get((req: ExtendedRequest, res: Response, next: NextFunction) => {
    const method = req.params.method;
    let returnValue: ReturnValue = {
      key: "key",
      value: "value",
    };
    switch (method) {
      case "get":
        req.session.user_key === undefined
          ? (returnValue.value = false)
          : (returnValue.value = req.session.user_key);
        break;
    }
    res.send(JSON.stringify(returnValue));
  })
  .post(async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const method = req.params.method;
    let returnValue: ReturnValue = {
      key: "key",
      value: "value",
    };
    let key: string = "";
    let value: string = "";
    switch (method) {
      case "isKey":
        key = req.body.key;
        req.session.user_key === undefined
          ? (returnValue.value = false)
          : (returnValue.value = true);
        break;
      case "set":
        try {
          value = req.body.value;
          returnValue.value = true;
          req.session.user_key = value;
        } catch (e) {
          returnValue.value = JSON.stringify(e);
        }
        break;
    }
    res.send(JSON.stringify(returnValue));
  });

module.exports = router;
