"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyCookie = void 0;
const axios_1 = __importDefault(require("axios"));
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const Hash_1 = require("../config/Hash");
const UserService_1 = __importDefault(require("../services/UserService"));
const UserModel_1 = __importDefault(require("../model/UserModel"));
const uuid_1 = require("uuid");
const nodemailer_1 = __importDefault(require("nodemailer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const Helper_1 = require("../config/Helper");
const client_secret_si = process.env.CLIENT_SECRET_SI;
const client_id_si = process.env.CLIENT_ID_SI;
const client_secret_su = process.env.CLIENT_SECRET_SU;
const client_id_su = process.env.CLIENT_ID_SU;
const email = process.env.EMAIL;
const emailpsapp = process.env.EMAILPSAPP;
const secret = process.env.SECRET;
const Account = (0, express_1.Router)();
Account.get("/", (req, res) => {
    res.sendFile(path_1.default.join(process.cwd(), "/web/auth.html"));
});
Account.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const account = req.body.account;
    const password = req.body.password;
    var acc = yield UserService_1.default.GetAccountByAccAndPass(account, password);
    if (!acc) {
        res.json({
            err: true,
            mess: "Tài khoản hoặc mật khẩu không đúng"
        });
        return;
    }
    SetCookie(res, acc);
    if (acc.role == "master") {
        res.redirect("/admin");
        return;
    }
    res.redirect("/");
})); //0k
Account.get("/github", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var code = req.query.code;
    var url = `https://github.com/login/oauth/access_token?client_id=${client_id_si}&client_secret=${client_secret_si}&code=${code}`;
    var r = yield axios_1.default.post(url, {}, {
        headers: {
            Accept: "application/json",
        },
    });
    // {
    //   "access_token": "",
    //   "token_type": "",
    //   "scope": ""
    // }
    var c;
    try {
        c = yield Promise.all([
            axios_1.default.get("https://api.github.com/user/emails", {
                headers: {
                    "X-GitHub-Api-Version": "2022-11-28",
                    Authorization: `Bearer ${r.data.access_token}`,
                    Accept: "application/vnd.github+json",
                },
            }),
            axios_1.default.get("https://api.github.com/user", {
                headers: {
                    "X-GitHub-Api-Version": "2022-11-28",
                    Authorization: `Bearer ${r.data.access_token}`,
                    Accept: "application/vnd.github+json",
                },
            }),
        ]);
    }
    catch (error) {
        console.log(error);
        res.redirect("/auth");
        return;
    }
    // [
    //   {
    //     email: "huy91027@gmail.com",
    //     primary: true,
    //     verified: true,
    //     visibility: "private",
    //   },
    //   {
    //     email: "71593544+crong964@users.noreply.github.com",
    //     primary: false,
    //     verified: true,
    //     visibility: null,
    //   },
    // ];
    //avatar_url: 'https://avatars.githubusercontent.com/u/71593544?v=4'
    var acc = yield UserService_1.default.GetByAccount(c[0].data[0].email);
    if (!acc) {
        res.redirect("/auth");
        return;
    }
    SetCookie(res, acc);
    res.redirect("/");
}));
Account.get("/githubsu", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var code = req.query.code;
    var url = `https://github.com/login/oauth/access_token?client_id=${client_id_su}&client_secret=${client_secret_su}&code=${code}`;
    var r = yield axios_1.default.post(url, {}, {
        headers: {
            Accept: "application/json",
        },
    });
    // {
    //   "access_token": "",
    //   "token_type": "",
    //   "scope": ""
    // }
    // {
    //      login: 'crong964',
    //      id: 71593544,
    //      node_id: 'MDQ6VXNlcjcxNTkzNTQ0',
    //      avatar_url: 'https://avatars.githubusercontent.com/u/71593544?v=4',
    //      gravatar_id: '',
    //      url: 'https://api.github.com/users/crong964',
    //      html_url: 'https://github.com/crong964',
    //      followers_url: 'https://api.github.com/users/crong964/followers',
    //      following_url: 'https://api.github.com/users/crong964/following{/other_user}',
    //      gists_url: 'https://api.github.com/users/crong964/gists{/gist_id}',
    //      starred_url: 'https://api.github.com/users/crong964/starred{/owner}{/repo}',
    //      subscriptions_url: 'https://api.github.com/users/crong964/subscriptions',
    //      organizations_url: 'https://api.github.com/users/crong964/orgs',
    //      repos_url: 'https://api.github.com/users/crong964/repos',
    //      events_url: 'https://api.github.com/users/crong964/events{/privacy}',
    //      received_events_url: 'https://api.github.com/users/crong964/received_events',
    //      type: 'User',
    //      site_admin: false,
    //      name: null,
    //      company: null,
    //      blog: '',
    //      location: null,
    //      email: null,
    //      hireable: null,
    //      bio: null,
    //      twitter_username: null,
    //      public_repos: 16,
    //      public_gists: 0,
    //      followers: 0,
    //      following: 0,
    //      created_at: '2020-09-20T12:19:07Z',
    //      updated_at: '2024-03-30T02:12:41Z'
    //    }
    var c;
    try {
        c = yield Promise.all([
            axios_1.default.get("https://api.github.com/user/emails", {
                headers: {
                    "X-GitHub-Api-Version": "2022-11-28",
                    Authorization: `Bearer ${r.data.access_token}`,
                    Accept: "application/vnd.github+json",
                },
            }),
            axios_1.default.get("https://api.github.com/user", {
                headers: {
                    "X-GitHub-Api-Version": "2022-11-28",
                    Authorization: `Bearer ${r.data.access_token}`,
                    Accept: "application/vnd.github+json",
                },
            }),
        ]);
    }
    catch (error) {
        res.end();
        return;
    }
    // [
    //   {
    //     email: "huy91027@gmail.com",
    //     primary: true,
    //     verified: true,
    //     visibility: "private",
    //   },
    //   {
    //     email: "71593544+crong964@users.noreply.github.com",
    //     primary: false,
    //     verified: true,
    //     visibility: null,
    //   },
    // ];
    //avatar_url: 'https://avatars.githubusercontent.com/u/71593544?v=4'
    var hash = Hash_1.Hash.CreateHas({
        outNumber: undefined,
        salt: undefined,
        a1: c[0].data[0].email,
    });
    res.cookie("a1", hash.a1);
    res.cookie("a2", hash.a2);
    res.cookie("time", hash.time);
    res.cookie("email", c[0].data[0].email);
    res.cookie("image", c[1].data.avatar_url);
    res.cookie("name", "");
    res.cookie("idgithug", c[1].data.id);
    res.cookie("type", "githug");
    res.redirect("/auth");
}));
Account.post("/ggin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var g_csrf_token1 = req.body.g_csrf_token;
    var g_csrf_token2 = req.cookies.g_csrf_token;
    var profi = { email: "", name: "", picture: "" };
    if (g_csrf_token1 != g_csrf_token2) {
        res.redirect("/auth");
        return;
    }
    var s = req.body.credential;
    s.split(".").forEach((v, i) => {
        if (i == 1) {
            profi = JSON.parse(Buffer.from(v, "base64").toString());
        }
    });
    // {
    //      iss: 'https://accounts.google.com',
    //      azp: '814286348049-ehu28te266lohvbgsgu6mcgroe3qihcr.apps.googleusercontent.com',
    //      aud: '814286348049-ehu28te266lohvbgsgu6mcgroe3qihcr.apps.googleusercontent.com',
    //      sub: '104614040852490738418',
    //      email: 'huy91027@gmail.com',
    //      email_verified: true,
    //      nbf: 1711446780,
    //      name: 'Huy Nguyễn',
    //      picture: 'https://lh3.googleusercontent.com/a/ACg8ocLNfMWE2gocEli3yYxs-95uRjnX_8PeHAtb3gtpFr8S_g=s96-c',
    //      given_name: 'Huy',
    //      family_name: 'Nguyễn',
    //      iat: 1711447080,
    //      exp: 1711450680,
    //      jti: 'e17866e1397730421a8823d244726469f9ea63bd'
    //    }
    var acc = yield UserService_1.default.GetByAccount(profi.email);
    if (!acc) {
        res.redirect("/auth");
        return;
    }
    SetCookie(res, acc);
    res.redirect("/");
}));
Account.post("/ggup", (req, res) => {
    var g_csrf_token1 = req.body.g_csrf_token;
    var g_csrf_token2 = req.cookies.g_csrf_token;
    var profi = { email: "", name: "", picture: "" };
    if (g_csrf_token1 != g_csrf_token2) {
        res.redirect("/auth");
        return;
    }
    var s = req.body.credential;
    s.split(".").forEach((v, i) => {
        if (i == 1) {
            profi = JSON.parse(Buffer.from(v, "base64").toString());
        }
    });
    // {
    //      iss: 'https://accounts.google.com',
    //      azp: '814286348049-ehu28te266lohvbgsgu6mcgroe3qihcr.apps.googleusercontent.com',
    //      aud: '814286348049-ehu28te266lohvbgsgu6mcgroe3qihcr.apps.googleusercontent.com',
    //      sub: '104614040852490738418',
    //      email: 'huy91027@gmail.com',
    //      email_verified: true,
    //      nbf: 1711446780,
    //      name: 'Huy Nguyễn',
    //      picture: 'https://lh3.googleusercontent.com/a/ACg8ocLNfMWE2gocEli3yYxs-95uRjnX_8PeHAtb3gtpFr8S_g=s96-c',
    //      given_name: 'Huy',
    //      family_name: 'Nguyễn',
    //      iat: 1711447080,
    //      exp: 1711450680,
    //      jti: 'e17866e1397730421a8823d244726469f9ea63bd'
    //    }
    var hash = Hash_1.Hash.CreateHas({
        outNumber: undefined,
        salt: undefined,
        a1: profi.email,
    });
    res.cookie("a1", hash.a1);
    res.cookie("a2", hash.a2);
    res.cookie("time", hash.time);
    res.cookie("email", profi.email);
    res.cookie("image", profi.picture);
    res.cookie("name", profi.name);
    res.redirect("/auth");
});
Account.get("/logout", (req, res) => {
    clearCookie(res);
    res.redirect("/auth");
});
Account.post("/getdata", (req, res) => {
    if (req.cookies.name == undefined) {
        res.json({
            err: true,
        });
        return;
    }
    var time = parseInt(req.cookies.time);
    var time1 = new Date().getTime();
    if (time1 - time > 60000) {
        res.json({
            err: true,
        });
        return;
    }
    res.clearCookie("Name");
    res.clearCookie("image");
    res.clearCookie("email");
    res.json({
        err: false,
        page: "signup",
        Name: req.cookies.name,
        pathImage: req.cookies.image,
        Account: req.cookies.email,
        idgithug: req.cookies.idgithug,
        type: req.cookies.githug
    });
});
Account.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var d = new UserModel_1.default();
    d.setAll(req.body);
    d.Account = req.body.Account;
    d.Password = req.body.Password;
    d.id = (0, uuid_1.v4)();
    yield UserService_1.default.AddAccount(d);
    res.json({
        err: false
    });
}));
Account.post("/sendcode", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var account = req.body.account;
    var d = yield UserService_1.default.GetByAccount(account);
    if (d == undefined) {
        res.json({
            err: true,
            mess: "không tồn tại"
        });
        return;
    }
    var code = new Date().getTime() % 100000;
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: email,
            pass: emailpsapp,
        },
    });
    const info = yield transporter.sendMail({
        from: 'spotify@gmail.com.com',
        to: account,
        subject: "Mã Xác thực đổi mật khẩu",
        text: "Đây là mã xác thực của bạn đừng chia sẻ cho ai",
        html: `<h1>${code}</h1>`,
    });
    var hash = Hash_1.Hash.CreateHas({ a1: `${code} ${account}`, outNumber: 20, salt: undefined });
    hash.a1 = account;
    var token = Buffer.from(JSON.stringify({
        f1: account,
        f2: hash.a2,
        timef: hash.time
    })).toString("base64");
    res.cookie("f1", account, { httpOnly: true, sameSite: "strict", secure: true });
    res.cookie("f2", hash.a2, { httpOnly: true, sameSite: "strict", secure: true });
    res.cookie("timef", hash.time, { httpOnly: true, sameSite: "strict", secure: true });
    res.json({
        err: false,
        token: token
    });
})); //0k
Account.post("/vertifycode", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var code = req.body.code;
    var token = req.body.token;
    if (token != undefined) {
        req.cookies = JSON.parse(Buffer.from(token, "base64").toString());
    }
    var account = req.cookies.f1;
    var f2 = req.cookies.f2;
    var timef = req.cookies.timef;
    var verified = Hash_1.Hash.vertify({ a1: `${code} ${account}`, a2: f2, createTime: timef, outNumber: 20, salt: undefined });
    if ((new Date().getTime()) - parseInt(timef) > 60000) {
        res.json({
            err: true,
            mess: "Quá hạn"
        });
        return;
    }
    if (verified) {
        var d = new UserModel_1.default();
        d.Account = account;
        d.Password = req.body.Password;
        var check = yield UserService_1.default.UpdatePassword(d);
        res.json({
            err: check == undefined,
            mess: "thành công"
        });
        return;
    }
    res.json({
        err: true,
        mess: "Mã không chính xác"
    });
})); //0k
Account.post("/apikey", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const account = req.body.account;
    const password = req.body.password;
    var acc = yield UserService_1.default.GetAccountByAccAndPass(account, password);
    if (!acc) {
        res.json({
            err: true,
            mess: "Tài khoản hoặc mật khẩu không đúng"
        });
        return;
    }
    var apikey = jsonwebtoken_1.default.sign({ role: acc.role, id: acc.id }, secret || "1", { expiresIn: "2 days" });
    res.json({
        err: false,
        apikey: apikey
    });
})); //0k
Account.post("/sendCodeVertifyEmail", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var account = req.body.account;
    var d = yield UserService_1.default.GetByAccount(account);
    if (account == undefined) {
        res.json({
            err: true,
            mess: "chưa nhập tài khoản"
        });
        return;
    }
    if (d != undefined) {
        res.json({
            err: true,
            mess: "tài khoản đã tồn tại"
        });
        return;
    }
    var code = new Date().getTime() % 100000;
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: email,
            pass: emailpsapp,
        },
    });
    try {
        const info = yield transporter.sendMail({
            from: 'spotify@gmail.com.com',
            to: account,
            subject: "Mã Xác thực email",
            text: "Đây là mã xác thực của bạn đừng chia sẻ cho ai",
            html: `<h1>${code}</h1>`,
        });
    }
    catch (error) {
    }
    var token = jsonwebtoken_1.default.sign({ Account: account }, code + "", {
        expiresIn: "3h"
    });
    res.json({
        err: false,
        token: token
    });
})); //0k
Account.post("/createACC", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var Account = req.body.Account;
    var code = req.body.code;
    var token = req.body.token;
    var decode = (0, Helper_1.VertifyJWT)(token, code + "");
    if (decode == undefined) {
        res.json({
            err: true,
            mess: "MÃ KO ĐÚNG"
        });
        return;
    }
    if (decode.Account != Account) {
        res.json({
            err: true,
            mess: "GMAIL KHÔNG ĐÚNG"
        });
        return;
    }
    var u = new UserModel_1.default();
    u.setAll(req.body);
    u.Password = req.body.Password;
    u.id = (0, uuid_1.v4)();
    var check = yield UserService_1.default.AddAccount(u);
    res.json({
        err: check == undefined,
    });
})); //0k
function SetCookie(res, acc) {
    var apikey = jsonwebtoken_1.default.sign({ role: acc.role, id: acc.id }, secret || '1', { expiresIn: "2 days" });
    res.cookie("apikey", apikey, { maxAge: 900000000 });
}
function SetApiKey(res, acc) {
    var hash = Hash_1.Hash.CreateHas({ a1: acc.id, outNumber: undefined, salt: undefined });
    return hash;
}
function clearCookie(res) {
    res.clearCookie("id");
    res.clearCookie("a2");
    res.clearCookie("timeSIN");
    res.clearCookie("apikey");
}
function VerifyCookie(req) {
    var id = req.cookies.id;
    var a2 = req.cookies.a2;
    var timeSIN = req.cookies.timeSIN;
    if (!id || !a2 || !timeSIN) {
        return false;
    }
    return Hash_1.Hash.vertify({ a1: id, a2: a2, createTime: timeSIN, outNumber: undefined, salt: undefined });
}
exports.VerifyCookie = VerifyCookie;
exports.default = Account;
