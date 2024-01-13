import "dotenv/config";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import http from "http";
import Builder from "./builder";
import VirtualRouter from "./builder/virtualRouter";

class FireApi {
  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(cors());
    this.app.use(express.json());
    this.server = http.createServer(this.app);
  }

  createRoute = (method, middlewareParams = {}) => {
    return {
      method: method,
      data: middlewareParams,
    };
  };

  fire = ({} = {}) => {
    const builder = new Builder({
      app: this.app,
      server: this.server,
    });
    return { createRoute: this.createRoute, builder, VirtualRouter };
  };
}

export default new FireApi().fire;
