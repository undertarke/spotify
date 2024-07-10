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
const GenreService_1 = __importDefault(require("../services/GenreService"));
const GenreModel_1 = __importDefault(require("../model/GenreModel"));
const PlayListService_1 = __importDefault(require("../services/PlayListService"));
class GenreController {
    constructor() {
    }
    Add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var genre = new GenreModel_1.default();
            genre.setAll(req.body);
            var check = yield GenreController.service.Add(genre);
            if (check == undefined) {
                res.json({
                    err: true
                });
                return;
            }
            res.json({
                err: false
            });
        });
    }
    GetAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield GenreController.service.GetAll();
            if (check == undefined) {
                res.json({
                    err: true,
                    ls: []
                });
                return;
            }
            res.json({
                err: false,
                ls: check
            });
        });
    }
    UpdateName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var Name = req.body.Name;
            var Id = req.body.id;
            var check = yield GenreController.service.UpdateName(Name, Id);
            if (check) {
                res.json({
                    err: false
                });
                return;
            }
            res.json({
                err: true
            });
        });
    }
    Delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var id = req.body.id;
            var check = yield GenreController.service.Delete(id);
            if (check) {
                res.json({
                    err: false
                });
                return;
            }
            res.json({
                err: true
            });
        });
    }
    GetLimitFloor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield GenreController.service.GetAllByLimitFloor(2);
            if (check == undefined) {
                res.json({
                    err: true,
                    ls: []
                });
                return;
            }
            res.json({
                err: false,
                ls: check
            });
        });
    }
    GetByGenre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var idParent = req.params.idParent;
            var ls = yield Promise.all([GenreController.playlist.GetByGenre(idParent, 0, 10),
                GenreController.service.GetChildrenByIdParent(idParent)]);
            res.json({
                playlist: ls[0],
                genre: ls[1],
                err: false
            });
        });
    }
}
GenreController.service = GenreService_1.default;
GenreController.playlist = PlayListService_1.default;
var genreController = new GenreController();
exports.default = genreController;
