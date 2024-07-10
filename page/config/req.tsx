import axios from "axios";
import React from "react";

export function post(url: string, body: any, cb: any) {
  axios
    .post(url, body,{
      headers:{
        "type":"web"
      }
    })
    .then((v) => {
      cb(v.data);
    })
    .catch((v) => {
      cb(null);
    });
}

export function get(url: string, cb: any) {
  axios
    .get(url)
    .then((v) => {
      cb(v.data);
    })
    .catch((v) => {
      console.log(v);

      cb(null);
    });
}
interface Duration {
  Duration: string;
}
export function Duration(d: Duration) {
  var da = parseInt(d.Duration + "");
  var minutes = Math.floor(da / 60);
  var second = da % 60;
  return (
    <div className="px-2">
      {minutes}:{second}
    </div>
  );
}
