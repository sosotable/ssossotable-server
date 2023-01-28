import { Request, Response } from "express";

const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req: Request, res: Response) => {
  res.send(
    `<h1 ><a style="color: black;" href="https://github.com/sosotable">ssosso.table</a></h1>
                <h3 style="color: black;">2022 - </h3>
                <ul style="list-style: none;">
                    <li><a style="color: black; text-decoration: none; onMouseOver="this.style.color='grey' onMouseOut="this.style.color='black'" 
                    href="https://github.com/Ujin28">이유진 2022 - </a></li>
                    <li><a style="color: black; text-decoration: none; onMouseOver="this.style.color='grey' onMouseOut="this.style.color='black'" 
                    href="https://github.com/hyunjo01">윤현조 2022 - </a></li>
                    <li><a style="color: black; text-decoration: none; onMouseOver="this.style.color='grey' onMouseOut="this.style.color='black'" 
                    href="https://github.com/hyewoniiiii">장혜원 2022 - </a></li>
                    <li><a style="color: black; text-decoration: none; onMouseOver="this.style.color='grey' onMouseOut="this.style.color='black'" 
                    href="https://github.com/bear-frog">유동선 2022 - </a></li>
                </ul>
        `
  );
});

module.exports = router;
