import BaseModel from "./BaseModel";

export default class MessModel extends BaseModel {
    idBox: string;
    idUser: string;
    content: string;
    type: string;
    idMess: string;
    ngay: string;
    constructor() {
        super()
        this.idBox = ""
        this.idUser = ""
        this.content = ""
        this.type = "Mess"
        this.idMess = "0"
        this.ngay = ""
    }

}