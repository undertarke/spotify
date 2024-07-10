import React from "react";

interface Time {
  time: string;
}
export default function Time(d: Time) {
  if (d.time.length <= 0) {
    return (
      <div className="text-[12px] ">
        1 giây trước
      </div>
    );
  }
  var now = Date.now();
  var time = new Date(d.time).getTime();
  var t = now - time;
  var level: any = {
    giây: 1000,
    phút: 60,
    giờ: 60,
    ngày: 24,
    Năm: 365,
  };
  var type: string = "";
  for (const key in level) {
    const element = level[key];
    if (t > element) {
      t = Math.floor(t / element);
      type = key;
    } else {
      break;
    }
  }
  return (
    <div className="text-[12px] ">
      {t} {type} trước
    </div>
  );
}
