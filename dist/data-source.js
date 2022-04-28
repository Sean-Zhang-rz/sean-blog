"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppDataSource = void 0;

require("reflect-metadata");

var _typeorm = require("typeorm");

var _User = require("./entity/User");

var AppDataSource = new _typeorm.DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "blog",
  password: "",
  database: "blog_development",
  synchronize: true,
  logging: false,
  entities: [_User.User],
  // entities: [
  //     "dist/entity/**/*.ts"
  // ],
  migrations: [],
  subscribers: []
});
exports.AppDataSource = AppDataSource;