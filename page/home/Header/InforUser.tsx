import React, { useState } from "react";

interface onClick {
  Set(type: "page" | "scroll", va: any): void;
}
export default function InforUser(d: onClick) {
  const [show, SetShow] = useState(false);
  return (
    <div>
      <div className="flex items-center space-x-2">
        <div className="text-sm font-bold bg-white text-black rounded-3xl px-2 py-1">
          Khám phá Premium
        </div>
        <div className="text-sm font-bold bg-black text-white rounded-3xl px-2 py-1">
          Cài đặt ứng dụng
        </div>
        <div className="">
          <div
            onClick={() => {
              SetShow(!show);
            }}
            className="rounded-full relative cursor-pointer flex justify-center items-center text-[14px] size-[28px] font-bold bg-[#19e68c] "
          >
            K
          </div>
          {show ? (
            <div className="absolute top-full z-20 right-0 w-max bg-black">
              <div className="hover:bg-[#3E3E3E] cursor-pointer p-2 text-white">
                Hồ sơ cá nhân
              </div>
              <div
                onClick={() => {
                  d.Set("page", "playlist");
                }}
                className="hover:bg-[#3E3E3E] cursor-pointer p-2 text-white"
              >
                Sơn tùng MTP
              </div>
              <div className="hover:bg-[#3E3E3E] cursor-pointer p-2 text-white">
                Phan mạnh Quỳnh
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
