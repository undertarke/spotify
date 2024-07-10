"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PlayListController_1 = __importDefault(require("../controller/PlayListController"));
const multer_1 = __importDefault(require("multer"));
const path_1 = require("path");
const PlayListRouteAdmin = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, (0, path_1.join)(process.cwd(), "/public/playlist"));
    },
    filename: function (req, file, cb) {
        var f = file.mimetype.split('/')[1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `playlist-${file.fieldname}-${uniqueSuffix}.${f}`);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
PlayListRouteAdmin.post("/AddNewPlayList", upload.single("avatar"), PlayListController_1.default.AddPlayListByAdmin); //0k
PlayListRouteAdmin.get("/playListDetailAdmin/:idplaylist", PlayListController_1.default.PlayListDetailAdmin); //0k
PlayListRouteAdmin.post("/UpdatePlayList", upload.single("avatar"), PlayListController_1.default.UpdatePlayListDetailAdmin); //0k
exports.default = PlayListRouteAdmin;
