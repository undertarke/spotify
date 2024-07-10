import NotificationDatase from "../database/NotificationDatase"
import { NotificationModel } from "../model/NotificationModel"

export class NotificationService {
    data: NotificationDatase
    constructor(i: NotificationDatase) {
        this.data = i
    }
    async Add(d: NotificationModel) {
        var chech = await this.data.Add(d)
        return chech
    }
    async GetAllByUserid(receiver_id: string) {
        var ls = await this.data.GetAllByUserid(receiver_id)
        return this.Setls(ls)
    }
    async Delete(discuss_id: string, receiver_id: string) {
        var c = await this.data.Delete(discuss_id, receiver_id)
        return c
    }
    Setls(ls: any) {
        if (ls == undefined) {
            return []
        }
        var list: NotificationModel[] = []
        for (let i = 0; i < ls.length; i++) {
            const element = ls[i];
            var tem = new NotificationModel()
            tem.setAll(element)
            list.push(tem)
        }
        return list
    }
}


var notificationService = new NotificationService(new NotificationDatase)

export default notificationService