import BaseModel from "./BaseModel"


export default class HaveListBoxChat extends BaseModel {
    idUser: string
    idBox: string
    admin: string
    pathImage: string
    Name: string
    constructor() {
        super()
        this.admin = ""
        this.idBox = " -2"
        this.idUser = "0"
        this.pathImage = ""
        this.Name = ""
    }
}