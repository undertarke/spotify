import HiddenMessDatabase from "../database/HiddenMessDatabase"
import HiddenMessModel from "../model/HiddenMessModel"

export class HiddenMessService {
    data: HiddenMessDatabase
    constructor(i: HiddenMessDatabase) {
        this.data = i
    }
    async InsertHiddenmess(idMess: string, idUser: string) {
        var check = await this.data.InsertHiddenmess(idMess, idUser)
        return check
    }
    async DelHiddenMess(idMess: string) {
        var check = await this.data.DelHiddenmess(idMess)
        return check
    }
    async GetHiddenMessByidMessidUser(idMess: string, idUser: string) {
        var f
        var l = await this.data.GetHiddenMessByidMessidUser(idMess, idUser) as []
        for (let i = 0; i < l.length; i++) {
            const element = l[i];
            f = new HiddenMessModel()
            f.setAll(element)
        }
        return f
    }
}


var hiddenMessService = new HiddenMessService(new HiddenMessDatabase())

export default hiddenMessService