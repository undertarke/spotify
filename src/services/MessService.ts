import MessDatabase from "../database/MessDatabase";
import MessModel from "../model/MessModel";

export class MessService {
    data: MessDatabase
    constructor(i: MessDatabase) {
        this.data = i
    }
    async GetAllContentByidBox(idBox: string, idUser: string, day?: string) {
        var today = new Date(day || Date.now());
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        var check = await this.data.GetAllContentByidBox(idBox, idUser, dateTime)
        return this.setlsMess(check)
    }

    private setlsMess(any: any) {
        if (any == undefined) {
            return []
        }
        let ls: MessModel[] = []
        for (let i = 0; i < any.length; i++) {
            const element = any[i];
            var mess = new MessModel();
            mess.setAll(element);
            ls.push(mess.json());
        }
        return ls
    }
    async InsertContentIn(d: MessModel) {
        var check = await this.data.InsertContentIn(d)
        return check;
    }
    async GetMessById(idMess: string) {
        var mess: MessModel | undefined

        var l = await this.data.GetMessById(idMess) as []
        for (let i = 0; i < l.length; i++) {
            const e = l[i];
            mess = new MessModel()
            mess.setAll(e)
            break
        }
        return mess
    }
    async DelMessById(idMess: string, idUser: string) {
        var check = await this.data.DelMessById(idMess, idUser) as []
        return check
    }
}

var messService = new MessService(new MessDatabase())

export default messService
