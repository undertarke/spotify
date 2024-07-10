"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdUser = exports.VertifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const SECRET = process.env.SECRET;
function VertifyJWT(apikey, secret) {
    var decode = undefined;
    try {
        decode = jsonwebtoken_1.default.verify(apikey, secret || SECRET || "1");
    }
    catch (error) {
    }
    return decode;
}
exports.VertifyJWT = VertifyJWT;
function IdUser(p) {
}
exports.IdUser = IdUser;
