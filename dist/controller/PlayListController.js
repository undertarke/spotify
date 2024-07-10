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
exports.PlayListController = void 0;
const path_1 = require("path");
const ContainModel_1 = __importDefault(require("../model/ContainModel"));
const PlayListModel_1 = require("../model/PlayListModel");
const ContainService_1 = __importDefault(require("../services/ContainService"));
const PlayListService_1 = __importDefault(require("../services/PlayListService"));
const uuid_1 = require("uuid");
const GenreService_1 = __importDefault(require("../services/GenreService"));
const promises_1 = require("fs/promises");
const LikedSongService_1 = __importDefault(require("../services/LikedSongService"));
class PlayListController {
    AddPlayListByAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            var file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
            var playlistmodel = new PlayListModel_1.PlayListModel();
            playlistmodel.setAll(req.body);
            playlistmodel.id = (0, uuid_1.v4)();
            playlistmodel.User_id = req.cookies.id;
            playlistmodel.Type = 1;
            playlistmodel.Songs = req.body.ls.length;
            playlistmodel.ImagePath = (0, path_1.join)("public/playlist", file);
            var check = yield PlayListService_1.default.Add(playlistmodel);
            var ls = req.body.ls;
            var list = ls.map((Song_id) => __awaiter(this, void 0, void 0, function* () {
                var temp = new ContainModel_1.default();
                temp.PlayList_id = playlistmodel.id;
                temp.Song_id = Song_id;
                return yield PlayListController.contain.Add(temp);
            }));
            var checkls = yield Promise.all(list);
            res.json({
                err: false
            });
        });
    }
    GetByGenreAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var Genre_ID = req.body.Genre_ID;
            var ls = yield PlayListController.playlist.GetByGenre(Genre_ID, 0, 10);
            res.json({
                ls: ls, err: true
            });
        });
    }
    PlayListDetailAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var idplaylist = req.params.idplaylist;
            var ls = yield Promise.all([PlayListController.playlist.Get(idplaylist),
                PlayListController.contain.GetAllByPlayList(idplaylist), PlayListController.
                    genre.GetIdParentByIdplaylist(idplaylist)]);
            res.json({
                err: ls[0] == undefined,
                playlist: ls[0],
                songs: ls[1],
                genre: ls[2]
            });
        });
    }
    UpdatePlayListDetailAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var oldplaylist = yield PlayListController.playlist.Get(req.body.id);
            if (!oldplaylist) {
                res.json({
                    err: true
                });
                return;
            }
            var playlistmodel = new PlayListModel_1.PlayListModel();
            playlistmodel.setAll(req.body);
            if (req.file) {
                playlistmodel.ImagePath = (0, path_1.join)("public/playlist", req.file.filename);
                try {
                    yield (0, promises_1.unlink)((0, path_1.join)(process.cwd(), oldplaylist.ImagePath));
                }
                catch (error) {
                    console.log(error);
                }
            }
            playlistmodel.id = oldplaylist.id;
            playlistmodel.User_id = req.cookies.id;
            playlistmodel.Type = 1;
            if (req.body.ls) {
                playlistmodel.Songs = req.body.ls.length + oldplaylist.Songs;
                var ls = req.body.ls;
                var list = ls.map((Song_id) => __awaiter(this, void 0, void 0, function* () {
                    var temp = new ContainModel_1.default();
                    temp.PlayList_id = playlistmodel.id;
                    temp.Song_id = Song_id;
                    return yield PlayListController.contain.Add(temp);
                }));
                var checkls = yield Promise.all(list);
            }
            var check = yield PlayListService_1.default.Update(playlistmodel);
            res.json({
                err: check == undefined
            });
        });
    }
    GetPlayListById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var id_playlist = req.params.idplaylist;
            var id = req.cookies.id;
            var ls = yield Promise.all([PlayListController.playlist.Get(id_playlist),
                PlayListController.likedSong.GetAllByIdPlayList(id, id_playlist)]);
            res.json({
                playlist: ls[0],
                songs: ls[1],
                err: ls[0] == undefined
            });
        });
    }
}
exports.PlayListController = PlayListController;
PlayListController.playlist = PlayListService_1.default;
PlayListController.contain = ContainService_1.default;
PlayListController.genre = GenreService_1.default;
PlayListController.likedSong = LikedSongService_1.default;
var playListController = new PlayListController();
exports.default = playListController;
