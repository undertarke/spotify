"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importStar(require("path"));
const fs_1 = __importDefault(require("fs"));
const body_parser_1 = __importDefault(require("body-parser"));
const GenreRoute_1 = __importDefault(require("./route/GenreRoute"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const socket_io_1 = require("socket.io");
const UserRoute_1 = __importDefault(require("./route/UserRoute"));
const Song_Route_1 = __importDefault(require("./route/Song.Route"));
const Acount_1 = __importDefault(require("./route/Acount"));
const LikedSongRoute_1 = __importDefault(require("./route/LikedSongRoute"));
const RecentSongService_1 = __importDefault(require("./services/RecentSongService"));
const RecentSongRoute_1 = __importDefault(require("./route/RecentSongRoute"));
const SearchRoute_1 = __importDefault(require("./route/SearchRoute"));
const PlayListRoute_1 = __importDefault(require("./route/PlayListRoute"));
const GenreRouteAdmin_1 = __importDefault(require("./admin/GenreRouteAdmin"));
const PlayListRouteAdmin_1 = __importDefault(require("./admin/PlayListRouteAdmin"));
const ContainRouteAdmin_1 = __importDefault(require("./admin/ContainRouteAdmin"));
const DiscussRoute_1 = __importDefault(require("./route/DiscussRoute"));
const NotificationRoute_1 = __importDefault(require("./route/NotificationRoute"));
const BoxChatRoute_1 = __importDefault(require("./route/BoxChatRoute"));
const MessRoute_1 = __importDefault(require("./route/MessRoute"));
const http_1 = require("http");
const cookie_1 = require("cookie");
const FriendRoute_1 = __importDefault(require("./route/FriendRoute"));
const UserRouteAdmin_1 = __importDefault(require("./admin/UserRouteAdmin"));
const admin_1 = __importDefault(require("./config/admin"));
require("dotenv/config");
const Helper_1 = require("./config/Helper");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.SECRET || "1";
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cookie: false
});
app.use((0, cookie_parser_1.default)());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Headers', "*");
    res.setHeader('Access-Control-Allow-Methods', "*");
    var apikey = req.headers.apikey || req.cookies.apikey;
    if (apikey) {
        var cookie = (0, Helper_1.VertifyJWT)(apikey);
        if (cookie != undefined) {
            req.cookies.id = cookie.id;
        }
    }
    if (req.headers.iduser) {
        req.cookies.id = req.headers.iduser;
    }
    next();
});
app.use("/static", express_1.default.static(path_1.default.join(process.cwd(), "web", "static")));
app.use("/public", express_1.default.static(path_1.default.join(process.cwd(), "public")));
app.use("/i", express_1.default.static(path_1.default.join(process.cwd(), "public", "upload")));
app.get("/swagger", (req, res) => {
    res.sendFile((0, path_1.join)(process.cwd(), "web/swagger.html"));
});
app.use((req, res, next) => {
    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2MSIsIkhldEhhblN0cmluZyI6IjI4LzA5LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcyNzQ4MTYwMDAwMCIsIm5iZiI6MTY5ODUxMjQwMCwiZXhwIjoxNzI3NjI5MjAwfQ.uWn4XmIr3aGBNm4QCi5Q5RFxVqNTwws8-EDFxQQud_I
    var TokenCybersoft = req.headers.tokencybersoft;
    if (TokenCybersoft) {
        var now = new Date().getTime() + "";
        var decode = jsonwebtoken_1.default.decode(TokenCybersoft);
        if (decode == null || !decode.HetHanTime || decode.HetHanTime + "" < now) {
            res.status(403).send({
                "statusCode": 403,
                "message": "Không đủ quyền truy cập!",
                "content": "Token không cybersoft không hợp lệ hoặc đã hết hạn truy cập !",
                "dateTime": new Date().toISOString(),
                "messageConstants": null
            });
            return;
        }
    }
    next();
});
app.use(body_parser_1.default.urlencoded({ extended: false, limit: "500mb" }));
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    var apikey = req.headers.apikey || req.cookies.apikey;
    if ((0, Helper_1.VertifyJWT)(apikey) != undefined) {
        req.cookies.id = (0, Helper_1.VertifyJWT)(apikey).id;
    }
    res.sendFile(path_1.default.join(process.cwd(), "web/home.html"));
});
app.use("/mess", MessRoute_1.default);
app.use("/box", BoxChatRoute_1.default);
app.use("/user", UserRoute_1.default);
app.use("/song", Song_Route_1.default);
app.use("/lsong", LikedSongRoute_1.default);
app.use("/rs", RecentSongRoute_1.default);
app.use("/search", SearchRoute_1.default);
app.use("/discuss", DiscussRoute_1.default);
app.use("/notification", NotificationRoute_1.default);
app.use("/friend", FriendRoute_1.default);
app.get("/dashboard", (req, res) => {
    res.sendFile(path_1.default.join(process.cwd(), "web/dashboard.html"));
});
app.use("/auth", Acount_1.default);
app.get("/idSong", (req, res) => {
    var _a;
    var start = (_a = req.headers.range) === null || _a === void 0 ? void 0 : _a.replace("bytes=", "").split("-");
    var music = req.cookies.music;
    var idSong = req.query.idSong;
    var id = req.cookies.id;
    if (idSong == undefined) {
        res.end();
        return;
    }
    res.cookie("music", idSong, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 365 });
    if (!music && music != idSong && id != undefined) {
        RecentSongService_1.default.Add(id, idSong);
    }
    try {
        var pathg = path_1.default.join(process.cwd(), "public/music", idSong);
        var s = fs_1.default.createReadStream(pathg);
        s.on("error", (err) => {
        });
        fs_1.default.stat(pathg, (err, stats) => {
            if (err) {
                console.log(err);
                res.end();
                return;
            }
            res.setHeader("Content-Range", `bytes 0 -${stats.size}/${stats.size}`);
            res.setHeader("Content-Length", stats.size);
            res.setHeader("Content-Type", "audio/mp3");
            res.setHeader("Accept-Ranges", "bytes");
            s.pipe(res);
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            err: true
        });
    }
});
app.get("/s", (req, res) => {
    var _a;
    var start = (_a = req.headers.range) === null || _a === void 0 ? void 0 : _a.replace("bytes=", "").split("-");
    var namestrong = req.query.id;
    try {
        var pathg = path_1.default.join(process.cwd(), "public/music", namestrong);
        var s = fs_1.default.createReadStream(pathg);
        s.on("error", (err) => {
        });
        fs_1.default.stat(pathg, (err, stats) => {
            if (err) {
                console.log(err);
                res.end();
                return;
            }
            res.setHeader("Content-Range", `bytes 0 -${stats.size}/${stats.size}`);
            res.setHeader("Content-Length", stats.size);
            res.setHeader("Content-Type", "audio/mp3");
            res.setHeader("Accept-Ranges", "bytes");
            s.pipe(res);
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            err: true
        });
    }
});
app.use("/genre", GenreRoute_1.default);
app.use("/playlist", PlayListRoute_1.default);
//admin
app.use("/genre", admin_1.default, GenreRouteAdmin_1.default);
app.use("/playlist", admin_1.default, PlayListRouteAdmin_1.default);
app.use("/contain", admin_1.default, ContainRouteAdmin_1.default);
app.use("/admin/UserRouteAdmin", admin_1.default, UserRouteAdmin_1.default);
app.get("/admin", admin_1.default, (req, res) => {
    res.sendFile((0, path_1.join)(process.cwd(), "web/admin.html"));
});
httpServer.listen(8000, () => {
    console.log("http://localhost:8000/");
    console.log("http://localhost:8000/swagger");
    console.log("http://localhost:8000/gg");
    console.log("http://localhost:8000/auth");
    console.log("http://localhost:8000/admin");
    console.log("http://localhost:8000/dashboard");
    console.log("http://localhost:8000/auth/forgot");
});
io.on("connection", (socket) => {
    var cookie = (0, cookie_1.parse)(socket.handshake.headers.cookie || "");
    var id = "";
    var decode = (0, Helper_1.VertifyJWT)(cookie.apikey);
    if (decode) {
        id = decode.id;
    }
    socket.join(id);
    socket.on("disconnect", () => {
        io.socketsLeave("");
    });
});
exports.default = io;
