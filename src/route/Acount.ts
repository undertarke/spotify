import axios from "axios";
import { Router, Response, Request } from "express";
import path from "path";
import { Hash } from "../config/Hash";
import userService from "../services/UserService";
import UserModel from "../model/UserModel";
import { v4 as uuidv4 } from 'uuid';
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"
import "dotenv/config"
import { VertifyJWT } from "../config/Helper";
interface google {
  email: string;
  name: string;
  picture: string;
}
const client_secret_si = process.env.CLIENT_SECRET_SI;
const client_id_si = process.env.CLIENT_ID_SI;


const client_secret_su = process.env.CLIENT_SECRET_SU;
const client_id_su = process.env.CLIENT_ID_SU;

const email = process.env.EMAIL
const emailpsapp = process.env.EMAILPSAPP
const secret = process.env.SECRET

const Account = Router();

Account.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "/web/auth.html"));
});
Account.post("/signin", async (req, res) => {
  const account = req.body.account
  const password = req.body.password
  var acc = await userService.GetAccountByAccAndPass(account, password)
  if (!acc) {
    res.json({
      err: true,
      mess: "Tài khoản hoặc mật khẩu không đúng"
    })
    return
  }
  SetCookie(res, acc)
  if (acc.role == "master") {
    res.redirect("/admin")
    return
  }
  res.redirect("/")
});//0k
Account.get("/github", async (req, res) => {
  var code = req.query.code;


  var url = `https://github.com/login/oauth/access_token?client_id=${client_id_si}&client_secret=${client_secret_si}&code=${code}`;

  var r = await axios.post(
    url,
    {},
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  // {
  //   "access_token": "",
  //   "token_type": "",
  //   "scope": ""
  // }
  var c;
  try {
    c = await Promise.all([
      axios.get("https://api.github.com/user/emails", {
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
          Authorization: `Bearer ${r.data.access_token}`,
          Accept: "application/vnd.github+json",
        },
      }),
      axios.get("https://api.github.com/user", {
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
          Authorization: `Bearer ${r.data.access_token}`,
          Accept: "application/vnd.github+json",
        },
      }),
    ]);
  } catch (error) {
    console.log(error);

    res.redirect("/auth");
    return
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
  var acc = await userService.GetByAccount(c[0].data[0].email)


  if (!acc) {
    res.redirect("/auth")
    return
  }

  SetCookie(res, acc)
  res.redirect("/")
});
Account.get("/githubsu", async (req, res) => {
  var code = req.query.code;
  var url = `https://github.com/login/oauth/access_token?client_id=${client_id_su}&client_secret=${client_secret_su}&code=${code}`;

  var r = await axios.post(
    url,
    {},
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
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
  var c
  try {
    c = await Promise.all([
      axios.get("https://api.github.com/user/emails", {
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
          Authorization: `Bearer ${r.data.access_token}`,
          Accept: "application/vnd.github+json",
        },
      }),
      axios.get("https://api.github.com/user", {
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
          Authorization: `Bearer ${r.data.access_token}`,
          Accept: "application/vnd.github+json",
        },
      }),
    ]);
  } catch (error) {


    res.end()
    return
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


  var hash = Hash.CreateHas({
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
  res.cookie("idgithug", c[1].data.id)
  res.cookie("type", "githug")

  res.redirect("/auth");
});
Account.post("/ggin", async (req, res) => {
  var g_csrf_token1 = req.body.g_csrf_token;
  var g_csrf_token2 = req.cookies.g_csrf_token;
  var profi: google = { email: "", name: "", picture: "" };

  if (g_csrf_token1 != g_csrf_token2) {
    res.redirect("/auth");
    return;
  }

  var s = req.body.credential as string;
  s.split(".").forEach((v, i) => {
    if (i == 1) {
      profi = JSON.parse(Buffer.from(v, "base64").toString()) as any as google;
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

  var acc = await userService.GetByAccount(profi.email)


  if (!acc) {
    res.redirect("/auth")
    return
  }

  SetCookie(res, acc)
  res.redirect("/")
});
Account.post("/ggup", (req, res) => {
  var g_csrf_token1 = req.body.g_csrf_token;
  var g_csrf_token2 = req.cookies.g_csrf_token;
  var profi: google = { email: "", name: "", picture: "" };

  if (g_csrf_token1 != g_csrf_token2) {
    res.redirect("/auth");
    return;
  }

  var s = req.body.credential as string;
  s.split(".").forEach((v, i) => {
    if (i == 1) {
      profi = JSON.parse(Buffer.from(v, "base64").toString()) as any as google;
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
  var hash = Hash.CreateHas({
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
  clearCookie(res)
  res.redirect("/auth")
})
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

  res.clearCookie("Name")
  res.clearCookie("image")
  res.clearCookie("email")
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
Account.post("/create", async (req, res) => {
  var d = new UserModel()
  d.setAll(req.body)
  d.Account = req.body.Account
  d.Password = req.body.Password

  d.id = uuidv4()
  await userService.AddAccount(d)
  res.json({
    err: false
  })
});
Account.post("/sendcode", async (req, res) => {
  var account = req.body.account
  var d = await userService.GetByAccount(account)

  if (d == undefined) {
    res.json({
      err: true,
      mess: "không tồn tại"
    })
    return
  }

  var code = new Date().getTime() % 100000
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: emailpsapp,
    },
  });
  const info = await transporter.sendMail({
    from: 'spotify@gmail.com.com',
    to: account,
    subject: "Mã Xác thực đổi mật khẩu",
    text: "Đây là mã xác thực của bạn đừng chia sẻ cho ai",
    html: `<h1>${code}</h1>`,
  });

  var hash = Hash.CreateHas({ a1: `${code} ${account}`, outNumber: 20, salt: undefined })
  hash.a1 = account
  var token = Buffer.from(JSON.stringify({
    f1: account,
    f2: hash.a2,
    timef: hash.time
  })).toString("base64")
  res.cookie("f1", account, { httpOnly: true, sameSite: "strict", secure: true })
  res.cookie("f2", hash.a2, { httpOnly: true, sameSite: "strict", secure: true })
  res.cookie("timef", hash.time, { httpOnly: true, sameSite: "strict", secure: true })
  res.json({
    err: false,
    token: token
  })
})//0k
Account.post("/vertifycode", async (req, res) => {
  var code = req.body.code
  var token = req.body.token
  if (token != undefined) {
    req.cookies = JSON.parse(Buffer.from(token, "base64").toString())
  }


  var account = req.cookies.f1
  var f2 = req.cookies.f2
  var timef = req.cookies.timef

  var verified = Hash.vertify({ a1: `${code} ${account}`, a2: f2, createTime: timef, outNumber: 20, salt: undefined })
  if ((new Date().getTime()) - parseInt(timef) > 60000) {
    res.json({
      err: true,
      mess: "Quá hạn"
    })
    return
  }


  if (verified) {
    var d = new UserModel()
    d.Account = account
    d.Password = req.body.Password

    var check = await userService.UpdatePassword(d)

    res.json({
      err: check == undefined,
      mess: "thành công"
    })
    return
  }

  res.json({
    err: true,
    mess: "Mã không chính xác"
  })
});//0k
Account.post("/apikey", async (req, res) => {
  const account = req.body.account
  const password = req.body.password
  var acc = await userService.GetAccountByAccAndPass(account, password)

  if (!acc) {
    res.json({
      err: true,
      mess: "Tài khoản hoặc mật khẩu không đúng"
    })
    return
  }
  var apikey = jwt.sign({ role: acc.role, id: acc.id }, secret || "1", { expiresIn: "2 days" })
  res.json({
    err: false,
    apikey: apikey
  })
});//0k

Account.post("/sendCodeVertifyEmail", async (req, res) => {
  var account = req.body.account
  var d = await userService.GetByAccount(account)

  if (account == undefined) {
    res.json({
      err: true,
      mess: "chưa nhập tài khoản"
    })
    return
  }
  if (d != undefined) {
    res.json({
      err: true,
      mess: "tài khoản đã tồn tại"
    })
    return
  }

  var code = new Date().getTime() % 100000
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: emailpsapp,
    },
  });


  try {
    const info = await transporter.sendMail({
      from: 'spotify@gmail.com.com',
      to: account,
      subject: "Mã Xác thực email",
      text: "Đây là mã xác thực của bạn đừng chia sẻ cho ai",
      html: `<h1>${code}</h1>`,
    });
  } catch (error) {

  }


  var token = jwt.sign({ Account: account }, code + "", {
    expiresIn: "3h"
  })
  res.json({
    err: false,
    token: token
  })
})//0k
Account.post("/createACC", async (req, res) => {
  var Account = req.body.Account
  var code = req.body.code
  var token = req.body.token


  var decode = VertifyJWT(token, code + "")
  if (decode == undefined) {
    res.json({
      err: true,
      mess: "MÃ KO ĐÚNG"
    })
    return
  }


  if (decode.Account != Account) {
    res.json({
      err: true,
      mess: "GMAIL KHÔNG ĐÚNG"
    })
    return
  }

  var u = new UserModel()
  u.setAll(req.body)
  u.Password = req.body.Password
  u.id = uuidv4()
  var check = await userService.AddAccount(u)
  res.json({
    err: check == undefined,
  })
})//0k

function SetCookie(res: Response, acc: UserModel) {
  var apikey = jwt.sign({ role: acc.role, id: acc.id }, secret || '1', { expiresIn: "2 days" })
  res.cookie("apikey", apikey, { maxAge: 900000000 })
}
function SetApiKey(res: Response, acc: UserModel) {
  var hash = Hash.CreateHas({ a1: acc.id, outNumber: undefined, salt: undefined })
  return hash
}
function clearCookie(res: Response) {
  res.clearCookie("id")
  res.clearCookie("a2")
  res.clearCookie("timeSIN")
  res.clearCookie("apikey")
}
export function VerifyCookie(req: Request) {
  var id = req.cookies.id
  var a2 = req.cookies.a2
  var timeSIN = req.cookies.timeSIN


  if (!id || !a2 || !timeSIN) {
    return false
  }


  return Hash.vertify({ a1: id, a2: a2, createTime: timeSIN, outNumber: undefined, salt: undefined })
}
export default Account;


