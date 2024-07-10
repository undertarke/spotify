import React, { useEffect, useState } from "react";
import { Duration, get, post } from "../config/req";
import { KeyObject } from "crypto";
import { useDispatch, useSelector } from "react-redux";
import { Navi, RootNaviRedux, SongEidt } from "./NaviRedux";
export default function SongList() {
  const [Songs, SetSongs] = useState<Song[]>([]);

  useEffect(() => {
    post("/song/SongList", {}, (v: any) => {
      SetSongs(v.songs);
    });
  }, []);
  var i = 0;
  var l = Songs.map((v) => {
    i += 1;
    return (
      <Song
        sst={i}
        status={v.status}
        type="mp3"
        key={i}
        SongName={v.SongName}
        Duration={v.Duration}
        Id={v.Id}
        Viewer={v.Viewer}
        SongImage={v.SongImage}
      />
    );
  });
  return (
    <div className="w-[96%] mx-auto  space-y-8 py-[72px]  text-left px-[42px] text-[14px]">
      <div className="text-[48px] font-bold ">Các bài hát</div>
      <div className="text-[14px] text-[#6C6C6C] w-full font-bold p-4 hover:bg-[#F2F2F2]">
        <div className="grid grid-cols-10 px-1 cursor-pointer ">
          <div className="">Ảnh</div>
          <div className="font-bold text-[16px] col-span-4 ">Tên bài hát</div>
          <div>Trạng thái</div>
          <div className="text-[14px]">Định dạng </div>
          <div>Thời lượng</div>
          <div>Lượt phát</div>
        </div>
      </div>
      {l}
    </div>
  );
}
interface Song {
  SongImage: string;
  SongName: string;
  status: string;
  type: string;
  Duration: string;
  Viewer: string;
  Id: string;
  sst: number;
}
// description: '',
// [2]     Id: '1896bc62-4d97-406f-8d47-35bfc563c4a5',
// [2]     Duration: 0,
// [2]     Genre_id: undefined,
// [2]     PublicTime: Invalid Date,
// [2]     Singer: 'Sơn Tùng M-TP',
// [2]     SongName: '',
// [2]     Viewer: 0,
// [2]     User_id: undefined
//SongImage
function Song(d: Song) {
  const idSong = useSelector((state: RootNaviRedux) => state.navi.idSong);
  const dispatch = useDispatch();
  return (
    <div className="relative text-[14px] text-[#6C6C6C] w-full font-bold p-4 hover:bg-[#F2F2F2]">
      <div className="grid grid-cols-10 items-center cursor-pointer">
        <img
          src={d.SongImage}
          alt=""
          srcSet=""
          className="size-[50px] rounded-lg "
        />

        <div className="font-bold text-[16px] col-span-4 ">{d.SongName}</div>

        <Toggle status={d.status} idSong={d.Id} />

        <div className="text-[14px]">{d.type}</div>
        <Duration Duration={d.Duration} />
        <div>{d.Viewer}</div>
        <div
          onClick={() => {
            console.log("đá");
            if (idSong == d.Id) {
              dispatch(SongEidt(""));
            } else {
              dispatch(SongEidt(d.Id));
              console.log(d.Id);
            }
          }}
        >
          <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-6"
          >
            <path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path>
          </svg>
        </div>
      </div>
      {idSong == d.Id ? (
        <div className="absolute  right-0 z-10 top-full">
          <div className="w-max bg-white rounded-lg cursor-pointer shadow-2xl px-3 py-2">
            <div
              className="mt-2"
              onClick={() => {
                dispatch(Navi("songedit"));
              }}
            >
              Xem chi tiết bài hát
            </div>
            <div className="mt-2">Sửa</div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
interface Toggle {
  status: string;
  idSong: string;
}
function Toggle(d: Toggle) {
  const [show, SetShow] = useState(d.status == "1" ? true : false);

  function Han() {
    post(
      "/song/upStatus",
      {
        idSong: d.idSong,
        status: show ? 0 : 1,
      },
      (v: any) => {
        if (!v.err) {
          SetShow(!show);
        }
      }
    );
  }
  return (
    <div className="flex flex-col cursor-pointer">
      <div
        onClick={Han}
        className={`h-10 p-2 w-[60%] rounded-full ${
          show ? "bg-green-700" : "bg-black"
        }`}
      >
        {show ? (
          <div className="size-6  float-right bg-white rounded-full"></div>
        ) : (
          <div className="size-6 float-left bg-white rounded-full"></div>
        )}{" "}
      </div>
    </div>
  );
}
