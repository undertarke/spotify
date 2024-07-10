import { Response, Request, NextFunction } from "express";
import "dotenv/config"
import { VertifyJWT } from "./Helper";
const SECRET = process.env.SECRET;
export default function ADMIN(req: Request, res: Response, next: NextFunction) {
    var apikey = req.headers.apikey as string || req.cookies.apikey
    if (!apikey) {
        res.status(403).send({
            mess: "ko có quyền "
        })
        return
    }
    var decode = VertifyJWT(apikey)
    if (decode == undefined) {
        res.status(403).send({
            mess: "ko có quyền "
        })
        return
    }
    if (decode.role == "master") {
        next()
        return
    }
    res.status(403).send({
        mess: "ko có quyền "
    })

}