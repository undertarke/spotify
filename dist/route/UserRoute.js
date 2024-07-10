"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controller/UserController"));
const multer_1 = __importDefault(require("multer"));
const path_1 = require("path");
const UserRoute = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, (0, path_1.join)(process.cwd(), "/public/avatar"));
    },
    filename: function (req, file, cb) {
        var f = file.mimetype.split('/')[1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}.${f}`);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
UserRoute.get("/signin", UserController_1.default.SignIn);
UserRoute.get("/", UserController_1.default.Get); //0k
UserRoute.get("/artist", (req, res) => {
    UserController_1.default.getAllArtist(req, res);
}); //0k
UserRoute.get("/artisepage/:artisepage", UserController_1.default.getArtisePage); //0k
UserRoute.post("/update", upload.single("avatar"), UserController_1.default.update);
exports.default = UserRoute;
