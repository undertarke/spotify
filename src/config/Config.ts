import mysql2 from "mysql2/promise"
import "dotenv/config"
const LOCALHOST = process.env.LOCALHOST;
const DockerDB = process.env.DockerDB;
const pool = mysql2.createPool({
    host: DockerDB || LOCALHOST,
    user: 'root',
    database: 'spotify',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
})
class Mysql2 {
    static db = pool
    public static async query(sql: string, val: any[]) {
        var rows, fields
        try {
            [rows, fields] = await Mysql2.db.query(sql, val)
        } catch (error) {
            console.log(error);
        }
        return rows
    }
    public async query2(sql: string, val: any[]) {
        var rows, fields
        try {
            [rows, fields] = await Mysql2.db.query(sql, val)
        } catch (error) {
            console.log(error);
        }
        return rows
    }
}


export default Mysql2