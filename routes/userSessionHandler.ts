import { NextFunction, Request, Response } from "express";

const express = require("express");
const router = express.Router();

interface ReturnValue {
  key: string;
  value: string | boolean;
}
interface ExtendedRequest extends Request {
  session: any;
}

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
          console.log(req.session);
        } catch (e) {
          returnValue.value = JSON.stringify(e);
        }
        break;
    }
    console.log(req.session);
    res.send(JSON.stringify(returnValue));
  });

module.exports = router;
