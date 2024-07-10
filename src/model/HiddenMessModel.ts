import BaseModel from "./BaseModel";

export default class HiddenMessModel extends BaseModel {
    idUser: string;
    idMess: string;

    constructor() {
        super();
        this.idUser = ""
        this.idMess = ""
    }
}