import { NextFunction, Request, Response } from "express";

const express = require("express");
const router = express.Router();

// MAKR: static DAO 객체 지정
const DAO = require("../libs/dao/DAO");
router.post(
  /**MARK: dynamic route로 DAO option 지정
   * INSERT/SELECT/UPDATE/DELETE
   * **/
  "/:DML",
  async (req: Request, res: Response, next: NextFunction) => {
    // MARK: 소문자로 들어오더라도 사용 가능하도록 예외처리
    const DML = req.params.DML.toUpperCase();
    const body = req.body;
    let returnValue: Array<{}> | any = [];
    switch (DML) {
      case "INSERT":
        try {
          await DAO.insert(body.table, body.columns, body.values);
        } catch (e) {
          returnValue = e;
        } finally {
          break;
        }
      case "SELECT":
        try {
          returnValue = await DAO.select(body.columns, body.table, body.where);
        } catch (e) {
          returnValue = e;
        } finally {
          break;
        }
      case "UPDATE":
        try {
          await DAO.update(body.table, body.set, body.where);
        } catch (e) {
          returnValue = e;
        } finally {
          break;
        }
      case "DELETE":
        try {
          await DAO.delete(body.table, body.where);
        } catch (e) {
          returnValue = e;
        } finally {
          break;
        }
      // MARK: 올바른 DML이 아닌 경우
      default:
        returnValue = [false];
        break;
    }
    res.send(returnValue);
  }
);

module.exports = router;
