import HaveListBoxChatDatabase from "../database/HaveListBoxChatDatabase"
import BoxModel from "../model/BoxModel";


export enum statusBox {
    Hidden = "0",
    Seen = "1",
    Unread = "2"
}
export enum menberType {
    notMenber = "-1",
    Menber = "0",
    extraAdmin = "2"
}
export class HaveListBoxChatService {
    data: HaveListBoxChatDatabase
    constructor(i: HaveListBoxChatDatabase) {
        this.data = i
    }
    async HiddenBoxChat(idUser: string, idBox: string) {
        var s = await this.data.UpdateStatusBox(idUser, idBox, statusBox.Hidden);
        return s;
    }
    async GetIdBoxbyIdUserAndIdFriend(idUser: string, idFriend: string) {
        var ls = await this.data.GetIdBoxbyIdUserAndIdFriend(idUser, idFriend)
        return this.setlsBox(ls);
    }
    private setlsBox(any: any) {
        if (any == undefined) {
            return []
        }
        var list: BoxModel[] = []

        for (let i = 0; i < any.length; i++) {
            const element = any[i];
            let box: BoxModel = new BoxModel();
            box.setAll(element);
            list.push(box)
        }
        return list
    }
    async InsertIdToNewBox(idUser: string, idBox: string, idFriend: string, admin?: string) {
        idFriend = idFriend || idUser
        admin = admin || "0"
        var check = await this.data.InsertIdToNewBox(idUser, idBox, idFriend, admin)
        return check;
    }
    async visualBoxChat(idUser: string, idBox: string) {
        var check = await this.data.UpdateStatusBox(idUser, idBox, statusBox.Seen)
        return check;
    }
    async GetIdUserInBox(idUser: string, idBox: string) {
        var check = await this.data.GetIdUserInBox(idBox, idUser)
        return this.setlsBox(check);
    }
    async IsIdUserInBox(idUser: string, idBox: string) {
        var check = await this.data.IsIdUserInBox(idUser, idBox)
        return check;
    }
    async SetNotSeenInBox(idUser: string, idBox: string) {
        var check = await this.data.SetNotSeenInBox(idUser, idBox)
        return check
    }
    async GetHaveListidBoxByIdUser(idUser: string, idBox: string) {
        var check = await this.data.GetHaveListidBoxByIdUser(idUser, idBox) as []
        return this.setlsBox(check)
    }
    async GetInforBoxByidUserAndIdBox(idUser: string, IdBox: string) {
        var ls = await this.data.GetInforBoxByidUserAndIdBox(idUser, IdBox)
        return this.setlsBox(ls)[0];
    }
}

var haveListBoxChatService = new HaveListBoxChatService(new HaveListBoxChatDatabase())

export default haveListBoxChatService