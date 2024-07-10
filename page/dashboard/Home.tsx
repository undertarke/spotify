import React, { useEffect, useState } from "react";
import { Avatar, RootNaviRedux } from "./NaviRedux";
import { useDispatch, useSelector } from "react-redux";
import { get } from "../config/req";
interface Tit {
  title: string;
  count: string;
}
interface Infor {
  Name: string;
  id: string;
  Nationality: string;
  ChanalName: string;
  description: string;
  pathImage: string;
}
function Tit(d: Tit) {
  return (
    <div className="space-y-4">
      <div className="text-[14px] font-bold">{d.title}</div>
      <div className="text-[32px] font-bold">{d.count}</div>
    </div>
  );
}

export default function Home() {
  const dispatch = useDispatch();
  const [u, SetU] = useState<Infor>({
    ChanalName: "",
    description: "",
    id: "",
    Name: "",
    Nationality: "",
    pathImage: "",
  });
  useEffect(() => {
    get("/user/", (v: any) => {
      SetU(v.u);
      dispatch(Avatar(v.u.pathImage))
    });
  }, []);
  return (
    <div className="w-[96%] mx-auto space-y-8 py-[72px] px-[42px] text-[14px]">
      <div className="flex space-x-4 font-bold">
        <div>
          <img src={u.pathImage} className="size-[200px] rounded-lg" alt="" />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <div className="">Nhạc sĩ</div>
            <div className="text-[32px]">{u.ChanalName}</div>
            <div>Tổng bài hát: 0</div>
          </div>
          <div className="rounded-full px-2 py-1 border-2 w-max">Chia sẻ</div>
        </div>
      </div>
      <div className="w-full mt-7 ">
        <div className=" text-[24px] font-bold">Tổng quát</div>
        <div className="border-2 border-black p-5 rounded-lg text-[14px] font-bold w-full grid grid-cols-3 gap-3 ">
          <Tit count="0" title="Lượt phát" />
          <Tit count="0" title="Lượt theo dõi" />
          <Tit count="0" title="Lượt phát hàng tuần" />
        </div>
      </div>
      <div className="bg-[#26008D] flex rounded-lg px-2 py-10 ">
        <div className="flex justify-around flex-col">
          <div className="text-[40px] font-bold text-white ">
            Tìm hiểu cách mọi người khám phá nội dung của bạn
          </div>
          <div className="bg-white text-[16px] font-bold w-max px-4 py-2 rounded-full">
            Xem số liệu phân tích về lượt hiển thị
          </div>
        </div>
        <div>
          <img src="../public/banner.svg" alt="" />
        </div>
      </div>
    </div>
  );
}
