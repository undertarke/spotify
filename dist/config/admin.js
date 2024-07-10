"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const Helper_1 = require("./Helper");
const SECRET = process.env.SECRET;
function ADMIN(req, res, next) {
    var apikey = req.headers.apikey || req.cookies.apikey;
    if (!apikey) {
        res.status(403).send({
            mess: "ko có quyền "
        });
        return;
    }
    var decode = (0, Helper_1.VertifyJWT)(apikey);
    if (decode == undefined) {
        res.status(403).send({
            mess: "ko có quyền "
        });
        return;
    }
    if (decode.role == "master") {
        next();
        return;
    }
    res.status(403).send({
        mess: "ko có quyền "
    });
}
exports.default = ADMIN;
