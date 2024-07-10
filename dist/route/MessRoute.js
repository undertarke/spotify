"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MessController_1 = __importDefault(require("../controller/MessController"));
const multer_1 = __importDefault(require("multer"));
const path_1 = require("path");
const sharp_1 = __importDefault(require("sharp"));
sharp_1.default.cache(false);
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, (0, path_1.join)(process.cwd(), '/public/upload'));
    },
    filename: function (req, file, cb) {
        var f = file.mimetype.split('/')[1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}.${f}`);
    }
});
const mutil = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 10000000000
    },
    fileFilter(req, file, callback) {
        callback(null, true);
    },
}).array("image", 9);
const MessRoute = (0, express_1.Router)();
MessRoute.post("/GetAllMessInbox", MessController_1.default.GetAllMessInbox); //0k
MessRoute.post("/send", MessController_1.default.SendMess); //0k
MessRoute.post("/hiddenMess", MessController_1.default.HiddenMess); //0k
MessRoute.post("/remove", MessController_1.default.Remove); //0k
MessRoute.post("/image", mutil, MessController_1.default.Image); //0k
MessRoute.post("/NextMessList", MessController_1.default.NextMessList); //0k
exports.default = MessRoute;
