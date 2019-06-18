"use strict";
import express, { Router, Request, Response, NextFunction } from "express";
import { Handler } from "../types/handler";
const controllers = require("../controllers");

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response: Handler = await controllers.usersController.getMany(
      req,
      res
    );

    res.status(200).send({
      code: 200,
      status: "success",
      message: null,
      data: response
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
