import React, { useEffect, useState } from "react";
import { post } from "../../config/req";
import { useDispatch, useSelector } from "react-redux";
import { RootHome, SetBoxList } from "../RootRedux";
import TypeFriend from "./TypeFriend";
interface user {
  Name: string;
  pathImage: string;
  id: string;
  IsFriend: number;
}

function User(d: user) {
  const dcp = useDispatch();
  return (
    <>
      <div className="px-2 h-18 py-2 flex hover:bg-[#2A2A2A] cursor-pointer content-center">
        <div className="w-14 h-14 overflow-hidden">
          <img
            className="rounded-full w-full h-auto"
            src={d.pathImage}
            alt=""
            srcSet=""
          />
        </div>
        <div className="ml-4">
          <div className="w-full px-3 font-sans">
            <div className="">{d.Name}</div>
            <div className="flex  items-center space-x-1">
              <TypeFriend idFriend={d.id} type={d.IsFriend + ""} />
              <div
                className="hover:bg-[#1FDD63] bg-[#2A2A2A] p-2 rounded-full w-max"
                onClick={() => {
                  post("box/chat", { idFriend: d.id }, (data: any) => {
                    dcp(SetBoxList(data.idbox));
                  });
                }}
              > 
                Nhắn tin
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
function UserRespond(d: user) {
  const dcp = useDispatch();
  const [type, SetType] = useState("");
  return (
    <>
      <div className="px-2 h-18 py-2 flex hover:bg-[#2A2A2A] cursor-pointer content-center">
        <div className="w-14 h-14 overflow-hidden">
          <img
            onClick={() => {
              post("box/chat", { idFriend: d.id }, (data: any) => {
                dcp(SetBoxList(data.idbox));
              });
            }}
            className="rounded-full w-full h-auto"
            src={d.pathImage}
            alt=""
            srcSet=""
          />
        </div>
        <div className="ml-4">
          <div className="w-full px-3 font-sans">
            <div className="">{d.Name}</div>
            <div className="flex justify-around">
              <>
                {type == "" ? (
                  <>
                    <div
                      onClick={() => {
                        post("friend/Accept", { id: d.id }, (v: any) => {
                          if (!v.err) {
                            SetType("Chấp nhận");
                          }
                        });
                      }}
                      className="bg-[#2A2A2A] hover:bg-[#1ED760] p-2 rounded-full"
                    >
                      Chấp nhận
                    </div>
                    <div
                      onClick={() => {
                        post("friend/Cancenl", { idFriend: d.id }, (v: any) => {
                          if (!v.err) {
                            SetType("Từ Chối");
                          }
                        });
                      }}
                      className="bg-[#2A2A2A] hover:bg-[#1ED760] p-2 rounded-full"
                    >
                      Từ chối
                    </div>
                  </>
                ) : (
                  <>{type} thành công</>
                )}
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default function UserSearchList() {
  const [friend, SetFriend] = useState<user[]>([]);
  const [orther, SetOrther] = useState<user[]>([]);
  const SearchName = useSelector(
    (state: RootHome) => state.rootHome.SearchName
  );
  useEffect(() => {
    post("/search/user", { name: SearchName }, (v: any) => {
     if (!v.err) {
      SetFriend(v.friend);
      SetOrther(v.orther);
     }
    });
  }, [SearchName]);

  return (
    <>
      <Title n={friend.length} title="Bạn bè" />
      {friend
        .filter((v) => {
          return v.IsFriend == 2;
        })
        .map((v) => {
          return (
            <User
              IsFriend={v.IsFriend}
              Name={v.Name}
              id={v.id}
              pathImage={v.pathImage}
              key={v.id}
            />
          );
        })}
      <Title n={orther.length} title="Người khác" />

      {orther
        .filter((v) => {
          return v.IsFriend != 2;
        })
        .map((v) => {
          return (
            <User
              IsFriend={v.IsFriend}
              Name={v.Name}
              id={v.id}
              pathImage={v.pathImage}
              key={v.id}
            />
          );
        })}
    </>
  );
}

export function UsersRespond() {
  const [user, SetUser] = useState<user[]>([]);

  useEffect(() => {
    post("/friend/Reponse", {}, (v: any) => {
      if (!v.err) {
        SetUser(v.ls);
      }
    });
  }, []);

  return (
    <>
      {user.map((v) => {
        return (
          <UserRespond
            IsFriend={0}
            Name={v.Name}
            id={v.id}
            pathImage={v.pathImage}
            key={v.id}
          />
        );
      })}
    </>
  );
}
export function Users() {
  const [user, SetUser] = useState<user[]>([]);

  useEffect(() => {
    post("/friend/", {}, (v: any) => {
      SetUser(v.ls);
    });
  }, []);

  return (
    <>
      {user.map((v) => {
        return (
          <User
            IsFriend={v.IsFriend}
            Name={v.Name}
            id={v.id}
            pathImage={v.pathImage}
            key={v.id}
          />
        );
      })}
    </>
  );
}

interface Title {
  n: number;
  title: string;
}
function Title(p: Title) {
  switch (p.n) {
    case 0:
      return <></>;
    default:
      return <div className="py-2">{p.title}</div>;
  }
}
