"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const pool = promise_1.default.createPool({
    host: 'localhost',
    user: 'root',
    database: 'test',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});
class Mysql2 {
    static query(sql, val) {
        return __awaiter(this, void 0, void 0, function* () {
            var rows, fields;
            try {
                [rows, fields] = yield Mysql2.pool.query(sql, val);
            }
            catch (error) {
                console.log(error);
            }
            return rows;
        });
    }
    query2(sql, val) {
        return __awaiter(this, void 0, void 0, function* () {
            var rows, fields;
            try {
                [rows, fields] = yield Mysql2.pool.query(sql, val);
            }
            catch (error) {
                console.log(error);
            }
            return rows;
        });
    }
}
Mysql2.pool = pool;
exports.default = Mysql2;
