import BaseModel from "./BaseModel"

export default class BoxModel extends BaseModel {
    idBox: string
    idUser: string
    Name: string
    pathImage: string
    imagebox: string
    boxtype: number
    id: string
    content: string
    messType: string
    status: number
    constructor() {
        super()
        this.idBox = ""
        this.imagebox = ""
        this.boxtype = 0
        this.idUser = ""
        this.Name = ""
        this.pathImage = ""
        this.id = ""
        this.content = ""
        this.messType = "mess"
        this.status = 1
    }
}