import { createHash } from "crypto"
import { v4 as uuidv4 } from 'uuid';
interface InputHash {
    salt: string | undefined
    outNumber: number | undefined
    a1: string | undefined
}

interface Vertify {
    a1: string
    a2: string
    salt: string | undefined
    outNumber: number | undefined
    createTime: string | undefined
}


export class Hash {
    static CreateHas(d: InputHash) {

        d.outNumber = d.outNumber || 10
        d.salt = d.salt || "abcd1234"
        var uuid = d.a1 || uuidv4()
        var time = new Date().getTime()
        var hash = createHash("shake256", { outputLength: d.outNumber })
            .update(uuid).update(d.salt).update(time + "")
            .digest("base64url");
        return {
            a2: hash,
            time: time,
            a1: uuid
        }
    }
    static vertify(d: Vertify) {
        d.outNumber = d.outNumber ? d.outNumber : 10
        d.salt = d.salt ? d.salt : "abcd1234"
        var hash = createHash("shake256", { outputLength: d.outNumber })
            .update(d.a1).update(d.salt).update(d.createTime + "")
            .digest("base64url");

        return hash == d.a2
    }
}