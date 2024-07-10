import React, { useEffect, useState } from "react";
import SingleMess, { singleMess } from "../Mess/SingleMess";
import { post } from "../../config/req";
import { useDispatch, useSelector } from "react-redux";
import { NaviPage, RemoveBoxList, RootHome, SetMess } from "../RootRedux";

interface BoxInfor {
  idbox: string;
}
interface boxChat {
  pathImage: string;
  Name: string;
  idBox: string;
  id: string; // id người gửi cuối
  type: string;
  permission: number;
  idUser: string; //id bạn của bạn
}
interface SendMessData {
  idbox: string;
}

function useChatBox(boxInfor: BoxInfor) {
  const dcp = useDispatch();
  const [listMess, SetListMess] = useState<singleMess[]>([]);
  const [boxChatData, SetBoxChatData] = useState<boxChat>({
    idBox: boxInfor.idbox,
    id: "",
    Name: "",
    pathImage: "",
    permission: 0,
    type: "",
    idUser: "",
  });
  const [scroll, SetScroll] = useState(0);
  const [scrollStatus, SetScrollStatus] = useState<"up" | "down">("down");
  const [load, SetLoad] = useState(false);
  const [now, SetNow] = useState("");
  const mess = useSelector((state: RootHome) => state.rootHome.mess);

  useEffect(() => {
    var url = "mess/GetAllMessInbox";
    post(url, { idBox: boxInfor.idbox }, (v: any) => {
      SetBoxChatData(v.infor);
      SetListMess([...(v.mess as []).reverse()]);
      SetNow(v.now);
    });
  }, []);

  useEffect(() => {
    if (
      mess.idBox == boxChatData.idBox &&
      mess.idBox != "" &&
      mess.content != ""
    ) {
      SetListMess([...listMess, mess as any]);
      SetScrollStatus("down");
      // data.idUser  là bạn bè
      dcp(
        SetMess({
          idBox: "",
          content: "",
          idMess: "",
          idUser: "",
          ngay: "",
          type: "",
        })
      );
    }
  }, [listMess, mess]);
  function SetParamester() {
    post(
      "mess/NextMessList",
      { idFriend: boxChatData.id, idBox: boxChatData.idBox, now: now },
      (v: any) => {
        SetListMess([...(v.ls as []).reverse(), ...listMess]);
        SetNow(v.now);
        SetLoad(false);
        SetScrollStatus("up");
      }
    );
    SetLoad(true);
  }

  return {
    listMess,
    boxChatData,
    now,
    load,
    scroll,
    scrollStatus,
    mess,
    SetParamester,
    SetScroll,
    SetScrollStatus,
    SetListMess,
  };
}

function SendMess(data: SendMessData) {
  const dispatch = useDispatch();
  const [text, SetText] = useState("");
  return (
    <div className="chat">
      <div className="flex p-2 ">
        <input
          onClick={() => {
            dispatch(
              SetMess({
                content: "",
                idBox: data.idbox,
                idMess: "",
                idUser: "",
                ngay: "",
                type: "",
              })
            );
          }}
          type="text"
          placeholder="Aa"
          className="focus:outline-none  mess w-11/12 bg-black rounded-lg border-0 "
          value={text}
          onChange={(inputData) => {
            SetText(inputData.currentTarget.value);
          }}
        />
        <button
          className="bg-white rounded-full p-1"
          onClick={() => {
            if (text.length <= 0) {
              return;
            }
            //         idBox: string;
            // idUser: string;
            // content: string;

            post(
              "/mess/send",
              {
                idBox: data.idbox,
                content: text,
              },
              (v: any) => {
                SetText("");
              }
            );
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 h-6 fill-black hover:fill-blue-600"
          >
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function HeadChatBox(data: boxChat) {
  const dispatch = useDispatch();
  return (
    <div className="pl-2 h-[44px] py-2 flex bg-black cursor-pointer items-center justify-between">
      <div
        onClick={() => {
          dispatch(NaviPage({ page: "artise", param: data.id }));
        }}
        className="flex items-center"
      >
        <div className="overflow-hidden size-[32px] rounded-full mr-3">
          <img className="" src={data.pathImage} alt="" srcSet="" />
        </div>
        <div className="w-max px-3 font-sans">
          <div className="">{data.Name}</div>
        </div>
      </div>
      <div
        onClick={() => {
          dispatch(RemoveBoxList(data.idBox));
        }}
      >
        Xóa
      </div>
    </div>
  );
}

export default function ChatBox(boxInfor: BoxInfor) {
  //mess/getAllContent

  const {
    SetParamester,
    SetScroll,
    listMess,
    boxChatData,
    load,
    now,
    scroll,
    scrollStatus,
  } = useChatBox(boxInfor);
  async function SetList() {
    var f = document.querySelector(
      `.boxscroll${boxChatData.idBox}`
    ) as HTMLElement;

    if (f) {
      var y1 = scroll;
      var y2 = f.scrollHeight;

      if (scrollStatus == "up") {
        f.scrollTo({
          behavior: "auto",
          top: y2 - y1,
        });
      } else {
        f.scrollTo({
          behavior: "auto",
          top: y2,
        });
      }
      SetScroll(f.scrollHeight);
    }
  }
  useEffect(() => {
    SetList();
  }, [listMess]);

  var idFuture;  
  var id = "";
  if (boxChatData.id.length > 0) {
    id = boxChatData.id;
  }

  var list = listMess.map((v, i) => {
    idFuture = listMess[i + 1] ? listMess[i + 1].idUser : undefined;
    var s = (
      <SingleMess
        avatar={boxChatData.pathImage}
        content={v.content}
        idFuture={idFuture}
        ngay={v.ngay}
        type={v.type}
        idMess={v.idMess}
        idUser={v.idUser}
        idUser2={boxChatData.idUser} // my id
        key={v.idMess}
      />
    );
    return s;
  });

  return boxInfor.idbox != "-1" ? (
    <div
      title={boxInfor.idbox}
      className=" boxchat w-[300px] rounded-lg h-[400px] border border-white"
    >
      {boxChatData ? (
        <>
          <HeadChatBox
            idUser=""
            pathImage={boxChatData.pathImage}
            Name={boxChatData.Name}
            idBox={boxChatData.idBox}
            id={boxChatData.id}
            type={boxChatData.type}
            permission={boxChatData.permission}
          />
          <div className=" bg-black  h-[300px] w-full border-y-2 grid grid-cols-1 content-end py-2">
            <div
              className={`overflow-x-hidden  overflow-y-scroll boxscroll${boxChatData.idBox}`}
              onScroll={(r) => {
                if (load) {
                  return;
                }

                if (r.currentTarget.scrollTop == 0) {
                  if (now == "-1") {
                    return;
                  }
                  SetParamester();
                }
              }}
            >
              {list}
            </div>
            <div className="p-2">
              <label htmlFor={`file${boxChatData.idBox}`}>
                <input
                  multiple
                  onChange={(v) => {
                    var files = v.currentTarget.files;
                    if (files == undefined) {
                      return;
                    }
                    var fo = new FormData();
                    for (let i = 0; i < files.length; i++) {
                      const element = files[i];
                      fo.append("image", element);
                    }
                    fo.set("idbox", boxInfor.idbox);
                    post("mess/image", fo, () => {});
                  }}
                  type="file"
                  className="hidden"
                  id={`file${boxChatData.idBox}`}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-[20px] cursor-pointer fill-white hover:fill-[#1FDF64]"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div>
          </div>
          <SendMess idbox={boxChatData.idBox} />
        </>
      ) : (
        <></>
      )}
    </div>
  ) : (
    <></>
  );
}
