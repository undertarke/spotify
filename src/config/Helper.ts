import jwt from "jsonwebtoken"
import "dotenv/config"
const SECRET = process.env.SECRET;
export interface limit {
    start: number
    end: number
}

export function VertifyJWT(apikey: string, secret?: string) {
    var decode: jwt.JwtPayload | undefined = undefined
    try {
        decode = jwt.verify(apikey, secret || SECRET || "1") as jwt.JwtPayload
    } catch (error) {

    }
    return decode
}

export function IdUser(p: Request) {

}