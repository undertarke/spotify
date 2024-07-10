export default class BaseModel {
    createtime: string
    constructor() {
        this.createtime = ""
    }
    setAll(d: any) {
        for (const key in this) {
            if (d[key] != undefined) {
                this[key] = d[key];
            }

        }
    }
    json() {
        var s: any = {};
        for (const key in this) {
            const element = this[key];
            if (element != undefined) {
                s[key] = element;
            }
        }
        return s;
    }
    swagger(){
        var s: any = {};
        for (const key in this) {
            const element = this[key];
            if (element != undefined) {
                s[key] ={
                    "type": "string"
                  }
            }
        }
        return s;
    }
}