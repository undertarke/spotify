import express from "express"
import path, { join } from "path"
import fs, { createWriteStream, writeFile } from "fs"
import bodyParser from "body-parser"
import { v4 as uuidv4 } from 'uuid';
import GenreRoute from "./route/GenreRoute";
import cookieParser from "cookie-parser";
import { Server } from "socket.io"
import UserRoute from "./route/UserRoute";
import SongRoute from "./route/Song.Route";
import Account, { VerifyCookie } from "./route/Acount";
import LikedSongRoute from "./route/LikedSongRoute";
import recentSongService, { RecentSongService } from "./services/RecentSongService";
import RecentSongRoute from "./route/RecentSongRoute";
import SearchRoute from "./route/SearchRoute";
import PlayListRoute from "./route/PlayListRoute";
import GenreRouteAdmin from "./admin/GenreRouteAdmin";
import PlayListRouteAdmin from "./admin/PlayListRouteAdmin";
import ContainRouteAdmin from "./admin/ContainRouteAdmin";
import DiscussRoute from "./route/DiscussRoute";
import NotificationRoute from "./route/NotificationRoute";
import BoxChatRoute from "./route/BoxChatRoute";
import MessRoute from "./route/MessRoute";
import { createServer } from "http";
import { parse } from "cookie";
import FriendRoute from "./route/FriendRoute";
import UserRouteAdmin from "./admin/UserRouteAdmin";
import ADMIN from "./config/admin";
import "dotenv/config"
import { VertifyJWT } from "./config/Helper";
import jwt, { JwtPayload } from "jsonwebtoken"
const secret = process.env.SECRET || "1"
const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cookie: false
})
app.use(cookieParser())
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Headers', "*");
    res.setHeader('Access-Control-Allow-Methods', "*");
    var apikey = (req.headers.apikey as any) || req.cookies.apikey


    if (apikey) {
        var cookie = VertifyJWT(apikey)
        if (cookie != undefined) {
            req.cookies.id = cookie.id
        }

    }
    if (req.headers.iduser) {
        req.cookies.id = req.headers.iduser
    }
    next();
});
app.use("/static", express.static(path.join(process.cwd(), "web", "static")))
app.use("/public", express.static(path.join(process.cwd(), "public")))
app.use("/i", express.static(path.join(process.cwd(), "public", "upload")))
app.get("/swagger", (req, res) => {
    res.sendFile(join(process.cwd(), "web/swagger.html"))
})

app.use((req, res, next) => {
    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2MSIsIkhldEhhblN0cmluZyI6IjI4LzA5LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcyNzQ4MTYwMDAwMCIsIm5iZiI6MTY5ODUxMjQwMCwiZXhwIjoxNzI3NjI5MjAwfQ.uWn4XmIr3aGBNm4QCi5Q5RFxVqNTwws8-EDFxQQud_I
    var TokenCybersoft = req.headers.tokencybersoft as string

    if (TokenCybersoft) {
        var now = new Date().getTime() + ""
        var decode = jwt.decode(TokenCybersoft) as jwt.JwtPayload
        if (decode == null || !decode.HetHanTime || decode.HetHanTime + "" < now) {
            res.status(403).send({
                "statusCode": 403,
                "message": "Không đủ quyền truy cập!",
                "content": "Token không cybersoft không hợp lệ hoặc đã hết hạn truy cập !",
                "dateTime": new Date().toISOString(),
                "messageConstants": null
            })
            return
        }
    }
    next()
})
app.use(bodyParser.urlencoded({ extended: false, limit: "500mb" }))
app.use(bodyParser.json())



app.get("/", (req, res) => {
    var apikey = (req.headers.apikey as any) || req.cookies.apikey
    if (VertifyJWT(apikey) != undefined) {
        req.cookies.id = (VertifyJWT(apikey) as JwtPayload).id
    }
    res.sendFile(path.join(process.cwd(), "web/home.html"))
})
app.use("/mess", MessRoute)
app.use("/box", BoxChatRoute)
app.use("/user", UserRoute)
app.use("/song", SongRoute)
app.use("/lsong", LikedSongRoute)
app.use("/rs", RecentSongRoute)
app.use("/search", SearchRoute)
app.use("/discuss", DiscussRoute)
app.use("/notification", NotificationRoute)
app.use("/friend", FriendRoute)
app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(process.cwd(), "web/dashboard.html"))
})

app.use("/auth", Account)
app.get("/idSong", (req, res) => {
    var start = req.headers.range?.replace("bytes=", "").split("-")
    var music = req.cookies.music
    var idSong = req.query.idSong as string



    var id = req.cookies.id
    if (idSong == undefined) {
        res.end()
        return
    }
    res.cookie("music", idSong, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 365 })

    if (!music && music != idSong && id != undefined) {
        recentSongService.Add(id, idSong)
    }
    try {
        var pathg = path.join(process.cwd(), "public/music", idSong)

        var s = fs.createReadStream(pathg)
        s.on("error", (err) => {
        })
        fs.stat(pathg, (err, stats) => {
            if (err) {
                console.log(err);
                res.end()
                return
            }
            res.setHeader("Content-Range", `bytes 0 -${stats.size}/${stats.size}`)
            res.setHeader("Content-Length", stats.size)
            res.setHeader("Content-Type", "audio/mp3")
            res.setHeader("Accept-Ranges", "bytes")
            s.pipe(res)

        })
    } catch (error) {
        console.log(error);

        res.json({
            err: true
        })
    }
})
app.get("/s", (req, res) => {
    var start = req.headers.range?.replace("bytes=", "").split("-")
    var namestrong = req.query.id as string
    try {
        var pathg = path.join(process.cwd(), "public/music", namestrong)

        var s = fs.createReadStream(pathg)
        s.on("error", (err) => {
        })
        fs.stat(pathg, (err, stats) => {
            if (err) {
                console.log(err);
                res.end()
                return
            }
            res.setHeader("Content-Range", `bytes 0 -${stats.size}/${stats.size}`)
            res.setHeader("Content-Length", stats.size)
            res.setHeader("Content-Type", "audio/mp3")
            res.setHeader("Accept-Ranges", "bytes")
            s.pipe(res)

        })
    } catch (error) {
        console.log(error);

        res.json({
            err: true
        })
    }


})

app.use("/genre", GenreRoute)
app.use("/playlist", PlayListRoute)
//admin
app.use("/genre", ADMIN, GenreRouteAdmin)
app.use("/playlist", ADMIN, PlayListRouteAdmin)
app.use("/contain", ADMIN, ContainRouteAdmin)
app.use("/admin/UserRouteAdmin", ADMIN, UserRouteAdmin)
app.get("/admin", ADMIN, (req, res) => {
    res.sendFile(join(process.cwd(), "web/admin.html"))
})

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
    var cookie = parse(socket.handshake.headers.cookie || "")
    var id = ""

    var decode = VertifyJWT(cookie.apikey)
    if (decode) {
        id = decode.id
    }

    socket.join(id)
    socket.on("disconnect", () => {
        io.socketsLeave("")
    })

});
export default io