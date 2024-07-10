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
const LikedSongService_1 = __importDefault(require("../services/LikedSongService"));
const LikedSongModel_1 = __importDefault(require("../model/LikedSongModel"));
class LikedSongController {
    constructor() {
    }
    Add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var id_user_liked = req.cookies.id;
            var Id = req.body.Id;
            var temp = new LikedSongModel_1.default();
            temp.Id = Id;
            temp.id_user_liked = id_user_liked;
            var check;
            var get = yield LikedSongController.likedSongService.Get(temp);
            if (get == undefined) {
                get = temp;
                get.liked = 1;
                check = yield LikedSongController.likedSongService.Add(temp);
            }
            else {
                if (get.liked == 1) {
                    get.liked = 0;
                }
                else {
                    get.liked = 1;
                }
                check = yield LikedSongController.likedSongService.Update(get);
            }
            res.json({
                err: check == undefined,
                liked: get.liked
            });
        });
    }
    Delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var id_user_liked = req.cookies.id;
            var Id = req.body.Id;
            var temp = new LikedSongModel_1.default();
            temp.Id = Id;
            temp.id_user_liked = id_user_liked;
            var check = yield LikedSongController.likedSongService.Delete(temp);
            res.json({
                err: check == undefined
            });
        });
    }
    GetAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var id_user_liked = req.cookies.id;
            var user_id = req.params.idartise;
            var temp = new LikedSongModel_1.default();
            temp.user_id = user_id;
            temp.id_user_liked = id_user_liked;
            var check = yield LikedSongController.likedSongService.GetAll(temp);
            res.json({
                err: check.length == 0,
                ls: check
            });
        });
    }
    GetAllLikedSong(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var id_user_liked = req.cookies.id;
            var d = new LikedSongModel_1.default;
            d.id_user_liked = id_user_liked;
            var ls = yield LikedSongController.likedSongService.GetAllLikedSong(d);
            res.json({
                err: false,
                ls: ls
            });
        });
    }
}
LikedSongController.likedSongService = LikedSongService_1.default;
var likedSongController = new LikedSongController();
exports.default = likedSongController;
