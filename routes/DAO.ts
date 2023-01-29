import { NextFunction, Request, Response } from "express";

const express = require("express");
const router = express.Router();

// MAKR: static 객체 지정
const DAO = require("../libs/dao/DAO");
/* GET home page. */
router.post(
  "/:DML",
  async (req: Request, res: Response, next: NextFunction) => {
    const DML = req.params.DML.toUpperCase();
    const body = req.body;
    let returnValue: Array<{}> = [];
    switch (DML) {
      case "INSERT":
        await DAO.insert(body.table, body.columns, body.values);
        break;
      case "SELECT":
        returnValue = await DAO.select(body.columns, body.table, body.where);
        break;
      case "UPDATE":
        await DAO.update(body.table, body.set, body.where);
        break;
      case "DELETE":
        await DAO.delete(body.table, body.where);
        break;
    }
    res.send(returnValue);
  }
);

module.exports = router;
