import React, { useEffect, useRef, useState } from "react";
import { RootHome, SetdeleteDiscuss, ShowRecentList } from "../RootRedux";
import { useDispatch, useSelector } from "react-redux";
import { post } from "../../config/req";
import Time from "../../config/hepler";

interface MainDiscuss {
  Discuss_Id: string;
  Replay_quality: number;
  Content: string;
  Name: string;
  pathImage: string;
  User_Id: string;
  createtime: string;
}
interface Replay {
  Parent_discuss_Id: string;
  Content: string;
  Discuss_Id: string;
  Name: string;
  pathImage: string;
  User_Id: string;
  createtime: string;
  SetReplay(d: any): void;
}

interface Discuss {
  idsong: string;
}
export default function Discuss(data: Discuss) {
  const delateDiscuss = useSelector(
    (state: RootHome) => state.rootHome.DeleteDiscuss
  );

  const [mainDiscussList, SetMainDiscussList] = useState<MainDiscuss[]>([]);
  const idsong = useSelector((state: RootHome) => state.rootHome.idSong);
  const [dicussquality, SetDicussQuality] = useState(0);
  const [content, SetContent] = useState("");

  useEffect(() => {
    post("/discuss/", { SongId: idsong }, (v: any) => {
      SetMainDiscussList(v.ls);
      SetDicussQuality(v.song.dicussquality);
      localStorage.setItem("id", v.id);
    });
  }, [idsong]);

  useEffect(() => {
    if (delateDiscuss != "") {
    }
    SetMainDiscussList([
      ...mainDiscussList.filter((v) => {
        return v.Discuss_Id != delateDiscuss;
      }),
    ]);
  }, [delateDiscuss]);

  return (
    <div className="bg-[#121212] space-y-4 h-full w-[400px]">
      <div className="text-white rounded-lg h-[90%] overflow-y-scroll">
        <HeaderDiscuss num={dicussquality}></HeaderDiscuss>
        <MainDiscussList list={mainDiscussList} />
      </div>
      <div className=" bg-black py-2 px-1 w-full flex justify-between">
        <div className="overflow-y-hidden w-[70%]">
          <textarea
            onChange={(v) => {
              if (v.currentTarget.value.length > 200) {
                return;
              }
              SetContent(v.currentTarget.value);
            }}
            className="w-full text-white over bg-black p-3 focus:outline-none border-b border-white"
            id=""
            cols={30}
            rows={1}
            value={content}
          ></textarea>
        </div>
        <button
          onClick={() => {
            var song = localStorage.getItem("song");
            if (!song) {
              return;
            }
            if (content.length <= 0) {
              alert("chưa nhập ");
              return;
            }
            post(
              "/discuss/add",
              { Song_Id: idsong, Content: content },
              (v: any) => {
                if (!v.err) {
                  SetMainDiscussList([...mainDiscussList, v.discuss]);
                  SetContent("");
                }
              }
            );
          }}
          className={`${
            content.length <= 0 ? "bg-black" : "bg-[#1FDF64]"
          }  px-2  rounded-3xl`}
        >
          Bình luận
        </button>
      </div>
    </div>
  );
}
function MainDiscuss(d: MainDiscuss) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [clamped, SetClamped] = useState(false);
  const [isExpand, SetIsExpand] = useState(false);
  const [replay, SetReplay] = useState(true);
  const [showReplay, SetShowReplay] = useState(false);
  const [content, SetContent] = useState("");
  const [replaylist, SetReplayList] = useState<Replay[]>([]);
  const [avatar, SetAvatar] = useState("");
  const idsong = useSelector((state: RootHome) => state.rootHome.idSong);
  const delateDiscuss = useSelector(
    (state: RootHome) => state.rootHome.DeleteDiscuss
  );

  useEffect(() => {
    SetReplayList([
      ...replaylist.filter((v) => {
        return v.Discuss_Id != delateDiscuss;
      }),
    ]);
  }, [delateDiscuss]);
  function Set(v: any) {
    SetReplayList([...replaylist, v]);
  }

  function HandleSetShowOrtherDiscuss() {
    SetShowReplay(!showReplay);
  }
  useEffect(() => {
    async function handle() {
      if (contentRef && contentRef.current) {
        SetClamped(
          contentRef.current.scrollHeight > contentRef.current.clientHeight
        );
        SetAvatar(
          JSON.parse(localStorage.getItem("userinfor") as any).pathImage
        );
      }
    }
    handle();
  }, []);
  return (
    <div className="grid grid-cols-12  text-[16px] mt-4">
      <img
        src={d.pathImage}
        alt=""
        className="col-span-2 size-[50px] rounded-full"
        srcSet=""
      />
      <div className=" space-y-2 col-span-8">
        <div className=" flex ">
          <div className="text-[13px] mr-2 font-bold">{d.Name}</div>{" "}
          <Time time={d.createtime} />
        </div>
        <div
          ref={contentRef}
          className={`${!isExpand ? "line-clamp-2" : ""} text-[14px]`}
        >
          {d.Content}
        </div>
        <div className="xem them neu cos">
          {clamped ? (
            <>
              {isExpand ? (
                <strong
                  className="cursor-pointer"
                  onClick={() => {
                    SetIsExpand(!isExpand);
                  }}
                >
                  ẩn bớt
                </strong>
              ) : (
                <strong
                  className="cursor-pointer"
                  onClick={() => {
                    SetIsExpand(!isExpand);
                  }}
                >
                  xem thêm
                </strong>
              )}
            </>
          ) : (
            <></>
          )}
        </div>

        {replay ? (
          <div
            onClick={() => {
              SetReplay(!replay);
            }}
            className="text-[12px] text-[#1FDF64]  hover:text-white cursor-pointer rounded-full w-max px-2 py-2 hover:border-1 border border-black hover:border-white"
          >
            Phản hồi
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="col-span-2 relative self-start">
        <Action Discuss_id={d.Discuss_Id} User_id={d.User_Id} />
      </div>

      {!replay ? (
        <div className="input replay col-span-full my-1">
          <div className="grid grid-cols-8 text-[16px] mt-1">
            <div className="col-span-1"></div>
            <img
              src={avatar}
              alt=""
              className="col-span-1 size-[25px] rounded-full"
              srcSet=""
            />
            <div className=" space-y-2 col-span-6">
              <textarea
                onChange={(e) => {
                  SetContent(e.currentTarget.value);
                  if (
                    e.currentTarget.scrollHeight > e.currentTarget.clientHeight
                  ) {
                    e.currentTarget.rows += 1;
                  }
                }}
                name=""
                id=""
                value={content}
                cols={30}
                rows={1}
                className="bg-[#121212] focus:outline-none w-full py-2 text-white border-b border-white"
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end items-center space-x-2 px-2">
            <div
              onClick={() => {
                SetReplay(!replay);
              }}
              className="text-[#ef506d] cursor-pointer hover:text-white"
            >
              Hủy
            </div>
            <div
              onClick={() => {
                post(
                  "/discuss/replay",
                  {
                    Replay_Discuss_Id: d.Discuss_Id,
                    Parent_discuss_Id: d.Discuss_Id,
                    Content: content,
                    Song_Id: idsong,
                  },
                  (v: any) => {
                    if (!v.err) {
                      Set(v.discuss);
                      SetContent("");
                      d.Replay_quality += 1;
                    } else {
                      alert("tb");
                    }
                  }
                );
              }}
              className="text-[#1FDF64] cursor-pointer hover:text-white"
            >
              Bình luận
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      {replaylist.length == 0 && d.Replay_quality == 0 ? (
        <></>
      ) : (
        <>
          <div className="col-span-2"></div>
          <div className="col-span-8">
            {showReplay ? (
              <div
                onClick={() => {
                  HandleSetShowOrtherDiscuss();
                }}
                className="text-[#1FDF64]  hover:text-white col-span-2 w-max cursor-pointer"
              >
                ẩn phản hồi
              </div>
            ) : (
              <div
                onClick={() => {
                  HandleSetShowOrtherDiscuss();
                  post(
                    "/discuss/ReplayList",
                    { ParentId: d.Discuss_Id },
                    (v: any) => {
                      SetReplayList(v.ls);
                    }
                  );
                }}
                className="text-[#1FDF64]  hover:text-white col-span-2 w-max cursor-pointer"
              >
                {d.Replay_quality} phản hồi
              </div>
            )}
          </div>
          <div className="col-span-2"></div>
        </>
      )}

      {showReplay ? <ReplayList SetReplay={Set} list={replaylist} /> : <></>}
    </div>
  );
}
interface MainDiscussList {
  list: MainDiscuss[];
}
export function MainDiscussList(d: MainDiscussList) {
  return (
    <>
      {d.list.map((v) => {
        return (
          <MainDiscuss
            createtime={v.createtime}
            User_Id={v.User_Id}
            Content={v.Content}
            Discuss_Id={v.Discuss_Id}
            Name={v.Name}
            Replay_quality={v.Replay_quality}
            pathImage={v.pathImage}
            key={v.Discuss_Id}
          />
        );
      })}
    </>
  );
}
interface HeaderDiscuss {
  num: number;
}
function HeaderDiscuss(d: HeaderDiscuss) {
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between items-center p-3">
      <div className="text-[20px]">{d.num} Thảo luận</div>
      <div
        onClick={() => {
          dispatch(ShowRecentList(false));
        }}
        className=" cursor-pointer font-bold w-max text-white flex justify-end text-[14px]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          className="size-7"
          viewBox="0 0 16 16"
        >
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
        </svg>
      </div>
    </div>
  );
}
interface ReplayList {
  list: Replay[];
  SetReplay(d: any): void;
}
function Replay(d: Replay) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [replay, SetReplay] = useState(false);
  const [clamped, SetClamped] = useState(false);
  const [avatar, SetAvatar] = useState("");
  const [content, SetContent] = useState("");
  const [isExpand, SetIsExpand] = useState(false);
  const idsong = useSelector((state: RootHome) => state.rootHome.idSong);
  async function handle() {
    if (contentRef && contentRef.current) {
      SetClamped(
        contentRef.current.scrollHeight > contentRef.current.clientHeight
      );
      SetAvatar(JSON.parse(localStorage.getItem("userinfor") as any).pathImage);
    }
  }
  useEffect(() => {
    handle();
  }, []);
  return (
    <>
      <div className="col-span-2"></div>
      <img
        src={d.pathImage}
        alt=""
        className="col-span-1 size-[25px] rounded-full"
        srcSet=""
      />
      <div className=" space-y-2 col-span-7">
        <div className=" flex p-2">
          <div className="text-[13px] mr-2 font-bold">{d.Name}</div>{" "}
          <Time time={d.createtime} />
        </div>
        <div ref={contentRef} className={`${!isExpand ? "line-clamp-2" : ""}`}>
          {d.Content}
        </div>

        {clamped ? (
          <div>
            {isExpand ? (
              <strong
                className="cursor-pointer"
                onClick={() => {
                  SetIsExpand(!isExpand);
                }}
              >
                ẩn bớt
              </strong>
            ) : (
              <strong
                className="cursor-pointer"
                onClick={() => {
                  SetIsExpand(!isExpand);
                }}
              >
                xem thêm
              </strong>
            )}
          </div>
        ) : (
          <></>
        )}

        {!replay ? (
          <div
            onClick={() => {
              SetReplay(true);
            }}
            className="text-[12px] cursor-pointer border-black rounded-full w-max px-2 py-2 hover:border-1 hover:border-white border "
          >
            Phản hồi
          </div>
        ) : (
          <></>
        )}
        {replay ? (
          <div className="input replay col-span-full my-1">
            <div className="grid grid-cols-8 text-[16px] mt-1">
              <img
                src={avatar}
                alt=""
                className="col-span-1 size-[25px] rounded-full"
                srcSet=""
              />
              <div className=" space-y-2 col-span-7">
                <textarea
                  wrap="on"
                  onChange={(e) => {
                    SetContent(e.currentTarget.value);
                    if (
                      e.currentTarget.scrollHeight >
                      e.currentTarget.clientHeight
                    ) {
                      e.currentTarget.rows += 1;
                    }
                  }}
                  name=""
                  id=""
                  cols={30}
                  rows={1}
                  value={content}
                  className="bg-[#121212] focus:outline-none w-full py-2 text-white border-b border-white"
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end items-center space-x-2 px-2">
              <div
                onClick={() => {
                  SetReplay(!replay);
                }}
                className="text-[#ef506d] cursor-pointer hover:text-white"
              >
                Hủy
              </div>
              <div
                onClick={() => {
                  if (content == "") {
                    return;
                  }
                  post(
                    "/discuss/replay",
                    {
                      Replay_Discuss_Id: d.Discuss_Id,
                      Parent_discuss_Id: d.Parent_discuss_Id,
                      Content: content,
                      Song_Id: idsong,
                    },
                    (v: any) => {
                      if (v.err) {
                        alert("thaats baij");
                      } else {
                        alert("thanh cong");
                        d.SetReplay(v.discuss);
                        SetContent("");
                      }
                    }
                  );
                }}
                className={`${
                  content.length == 0 ? "text-black" : "text-[#1FDF64]"
                } cursor-pointer hover:text-white`}
              >
                Bình luận
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="col-span-1 relative self-start">
        <Action Discuss_id={d.Discuss_Id} User_id={d.User_Id} />
      </div>
    </>
  );
}
interface Action {
  Discuss_id: string;
  User_id: String;
}
function Action(d: Action) {
  const [show, Setshow] = useState(false);
  const [id, SetId] = useState(localStorage.getItem("id"));
  var dispatch = useDispatch();
  return (
    <>
      <svg
        onClick={() => {
          Setshow(!show);
        }}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="white"
        className="fill-white hover:fill-[#1FDF64]"
        viewBox="0 0 16 16"
      >
        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
      </svg>
      {show ? (
        <>
          {id != d.User_id ? (
            <div className="absolute cursor-pointer top-full right-full bg-[#2A2A2A] px-3 py-2 rounded-2xl">
              <div className="flex justify-center items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-flag"
                  viewBox="0 0 16 16"
                >
                  <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12 12 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A20 20 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a20 20 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21 21 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21 21 0 0 0 14 7.655V1.222z" />
                </svg>
                <div className="text-[14px] w-max">Báo vi phạm</div>
              </div>
            </div>
          ) : (
            <div className="absolute cursor-pointer top-full right-full bg-[#2A2A2A] px-3 py-2 rounded-2xl">
              <div
                onClick={() => {
                  post("discuss/delete", { id: d.Discuss_id }, (v: any) => {
                    if (!v.err) {
                      dispatch(SetdeleteDiscuss(d.Discuss_id));
                    }
                  });
                }}
                className="flex justify-center items-center space-x-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="white"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
                <span>xóa</span>
              </div>
            </div>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
function ReplayList(d: ReplayList) {
  return (
    <>
      {d.list.map((v) => {
        return (
          <Replay
            createtime={v.createtime}
            User_Id={v.User_Id}
            SetReplay={d.SetReplay}
            Content={v.Content}
            Discuss_Id={v.Discuss_Id}
            Name={v.Name}
            pathImage={v.pathImage}
            key={v.Discuss_Id}
            Parent_discuss_Id={v.Parent_discuss_Id}
          />
        );
      })}
    </>
  );
}
