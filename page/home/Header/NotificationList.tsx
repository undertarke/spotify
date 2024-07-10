import { useEffect, useState } from "react";
import { post } from "../../config/req";
import React from "react";
import Time from "../../config/hepler";
import { useDispatch, useSelector } from "react-redux";
import {
  RootHome,
  SetNotificationPage,
  SetNotificationPageIdSong,
} from "../RootRedux";
import Discuss, { MainDiscussList } from "../Right/Discuss";

interface Notification {
  Discuss_Id: string;
  Parent_discuss_Id: string;
  Content: string;
  Song_Id: string;
  Name: string;
  pathImage: string;
  receiver_id: string;
  SongImage: string; //ảnh
  createtime: string;
  set(v: any): void;
}
function Notification(d: Notification) {
  const dispathch = useDispatch();
  function Delete() {
    post("/notification/delete", { id: d.Discuss_Id }, (v: any) => {
      if (v.err) {
      } else {
        d.set(d.Discuss_Id);
      }
    });
  }
  function Replay() {
    dispathch(SetNotificationPage("discuss"));
    dispathch(SetNotificationPageIdSong(d.Song_Id));
  }

  return (
    <>
      <div className="grid grid-cols-12 grid-rows-1 gap-1 py-2">
        {d.Content.length == 0 ? (
          <div onClick={Delete} className="col-span-full text-[16] text-center">
            Không tồn tại
          </div>
        ) : (
          <>
            <img
              src={d.pathImage}
              alt=""
              className=" col-span-2 rounded-full row-span-full"
            />
            <div
              onClick={Replay}
              className="size-5 col-span-7 h-full w-full row-span-full"
            >
              <div className="w-full text-[14px] h-full">
                {d.Name} đã trả lời : "{d.Content}"
              </div>
              <div className="w-full ">
                <Time time={d.createtime}></Time>
              </div>
            </div>
            <img src={d.SongImage} alt="" className=" col-span-2" />
            <div className="col-span-1 " onClick={Delete}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                className="fill-black hover:fill-[#1FDF64]"
                viewBox="0 0 16 16"
              >
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
              </svg>
            </div>
          </>
        )}
      </div>
    </>
  );
}
export function NotificationList() {
  const [notificationList, SetNotificationList] = useState<Notification[]>([]);

  useEffect(() => {
    post("/notification/all", {}, (v: any) => {
      if (!v.err) {
        SetNotificationList(v.ls);
      }
    });
  }, []);
  function set(d: any) {
    SetNotificationList([
      ...notificationList.filter((v) => {
        return v.Discuss_Id != d;
      }),
    ]);
  }
  return (
    <>
      <div className="w-[450px] text-white h-[400px] rounded-lg p-1 bg-[#3E3E3E] absolute pb-3 px-1 overflow-y-scroll top-full right-0">
        <div className="pb-2 border-b-bg-[#3E3E3E] sticky top-0 left-0">
          thông báo
        </div>
        {notificationList.map((v) => {
          return (
            <Notification
              key={v.Discuss_Id}
              set={set}
              Content={v.Content}
              Discuss_Id={v.Discuss_Id}
              Name={v.Name}
              Parent_discuss_Id=""
              Song_Id={v.Song_Id}
              createtime={v.createtime}
              SongImage={v.SongImage}
              pathImage={v.pathImage}
              receiver_id=""
            />
          );
        })}
      </div>
    </>
  );
}

export default function NotificationPage() {
  const NotificationPageIdSong = useSelector(
    (state: RootHome) => state.rootHome.NotificationPageIdSong
  );
  const NotificationPage = useSelector(
    (state: RootHome) => state.rootHome.NotificationPage
  );
  var child: React.JSX.Element;

  switch (NotificationPage) {
    case "discuss":
      child = <NotificationDiscuss Songid={NotificationPageIdSong} />;
      break;
    default:
      child = <NotificationList />;
      break;
  }
  return <>{child}</>;
}
interface NotificationDiscuss {
  Songid: string;
}
interface MainDiscuss {
  Discuss_Id: string;
  Replay_quality: number;
  Content: string;
  Name: string;
  pathImage: string;
  User_Id: string;
  createtime: string;
}
interface Song {
  SongName: string;
  SongImage: string;
}
function NotificationDiscuss(d: NotificationDiscuss) {
  const [mainDiscussList, SetMainDiscussList] = useState<MainDiscuss[]>([]);
  const [song, SetSong] = useState<Song>({
    SongImage: "",
    SongName: "",
  });
  useEffect(() => {
    post("/discuss/", { SongId: d.Songid }, (v: any) => {
      SetMainDiscussList(v.ls);
      SetSong(v.song);
    });
  }, [d.Songid]);
  return (
    <div className="w-[450px] text-white h-[400px] rounded-lg p-1 bg-[#3E3E3E] absolute pb-3 px-1 overflow-y-scroll top-full right-0">
      <div className="w-full grid z-[2000] grid-cols-12 bg-black p-5 border-b-bg-[#3E3E3E] sticky top-0 left-0 ">
        <div className="col-span-9">{song.SongName}</div>
        <div className="col-span-2">
          <img className="" src={song.SongImage} alt="" srcSet="" />
        </div>
      </div>
      <MainDiscussList list={mainDiscussList} />
    </div>
  );
}
