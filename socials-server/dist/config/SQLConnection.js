"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
var SQLConfig_1 = __importDefault(require("./SQLConfig"));
var connection = mysql_1.default.createConnection(SQLConfig_1.default);
connection.connect();
function query(sql) {
    return new Promise(function (resolve, reject) {
        connection.query(sql, function (error, results) {
            if (error)
                reject(error);
            resolve(results);
        });
    });
}
exports.default = query;
