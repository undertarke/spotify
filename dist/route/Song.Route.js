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
const express_1 = require("express");
const SongController_1 = __importDefault(require("../controller/SongController"));
const SongRoute = (0, express_1.Router)();
const multer_1 = __importDefault(require("multer"));
const path_1 = require("path");
const uuid_1 = require("uuid");
const UserService_1 = __importDefault(require("../services/UserService"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, (0, path_1.join)(process.cwd(), "/public/image"));
    },
    filename: function (req, file, cb) {
        var f = file.mimetype.split('/')[1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}.${f}`);
    }
});
const storageSongFile = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, (0, path_1.join)(process.cwd(), "/public/music"));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = (0, uuid_1.v4)();
        cb(null, `music-${uniqueSuffix}`);
    }
});
function isArtist(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var s = yield UserService_1.default.Get(req.cookies.id);
        if (s == undefined || s.Vertify == 0) {
            res.json({
                err: true,
                mess: "bạn không phải nghệ sĩ"
            });
            return;
        }
        next();
    });
}
const upload = (0, multer_1.default)({ storage: storage });
SongRoute.post("/Update", upload.single("avatar"), SongController_1.default.Update); //0k
SongRoute.post("/Upload", isArtist, SongController_1.default.Upload); //0k
const uploadSongFile = (0, multer_1.default)({ storage: storageSongFile });
SongRoute.post("/FileSong", isArtist, uploadSongFile.single("songfile"), SongController_1.default.FileSong); //0k
SongRoute.post("/SongList", SongController_1.default.SongList); //0k
SongRoute.post("/get", SongController_1.default.GetSong); //0k
SongRoute.post("/NewUpdate", upload.single("avatar"), SongController_1.default.NewUpdate); //0k
SongRoute.post("/newupload", SongController_1.default.NewUpload);
SongRoute.post("/upStatus", SongController_1.default.UpStatus); //0k
SongRoute.get("/valisong/:idpage", SongController_1.default.GetValidateAll);
SongRoute.post("/NextSong", SongController_1.default.NextSong);
//admin
SongRoute.post("/GetSongByGenre", SongController_1.default.GetSongByGenre); //0k
exports.default = SongRoute;
