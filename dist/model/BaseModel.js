"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseModel {
    constructor() {
        this.createtime = "";
    }
    setAll(d) {
        for (const key in this) {
            if (d[key] != undefined) {
                this[key] = d[key];
            }
        }
    }
    json() {
        var s = {};
        for (const key in this) {
            const element = this[key];
            if (element != undefined) {
                s[key] = element;
            }
        }
        return s;
    }
    swagger() {
        var s = {};
        for (const key in this) {
            const element = this[key];
            if (element != undefined) {
                s[key] = {
                    "type": "string"
                };
            }
        }
        return s;
    }
}
exports.default = BaseModel;
