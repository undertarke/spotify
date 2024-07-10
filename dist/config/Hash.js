"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hash = void 0;
const crypto_1 = require("crypto");
const uuid_1 = require("uuid");
class Hash {
    static CreateHas(d) {
        d.outNumber = d.outNumber || 10;
        d.salt = d.salt || "abcd1234";
        var uuid = d.a1 || (0, uuid_1.v4)();
        var time = new Date().getTime();
        var hash = (0, crypto_1.createHash)("shake256", { outputLength: d.outNumber })
            .update(uuid).update(d.salt).update(time + "")
            .digest("base64url");
        return {
            a2: hash,
            time: time,
            a1: uuid
        };
    }
    static vertify(d) {
        d.outNumber = d.outNumber ? d.outNumber : 10;
        d.salt = d.salt ? d.salt : "abcd1234";
        var hash = (0, crypto_1.createHash)("shake256", { outputLength: d.outNumber })
            .update(d.a1).update(d.salt).update(d.createTime + "")
            .digest("base64url");
        return hash == d.a2;
    }
}
exports.Hash = Hash;
