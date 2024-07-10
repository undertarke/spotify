import React, { useEffect, useMemo, useState } from "react";
import { post } from "../../config/req";
import { useDispatch, useSelector } from "react-redux";
import { RootHome, SetBoxList, SetMess } from "../RootRedux";
interface lastmess {
  type: string;
  idMess: string;
  content: string;
  idBox: string;
  idUser: string;
}
interface handle {
  idBox: string;
  mess: string;
  curIdbox: string;
}
interface Button {
  onClick(): void;
  text: string;
  children: React.JSX.Element;
}
interface BoxButton {
  show: boolean;
  idBox: string;
  SetShow(d: boolean): void;
}
interface boxdata {
  idBox: string;
  idUser: string; //id của bạn bè
  Name: string;
  pathImage: string;
  imagebox: string;
  boxtype: number;
  id: string; // id của người gửi tin nhắn cuối cuối
  content: string;
  messType: string;
  status: number;
}

function useBoxList() {
  const [data, SetData] = useState<boxdata[]>([]);
  useEffect(() => {
    post("box/", {}, (v: any) => {
      SetData(v.ls);
    });
  }, []);

  return {
    data,
  };
}

function Button(d: Button) {
  return (
    <div
      className="w-full flex bg-black hover:bg-[#2A2A2A] font-mono p-2 justify-around cursor-pointer"
      onClick={d.onClick}
    >
      {d.children}
      <div>{d.text}</div>
    </div>
  );
}
function BoxButton(params: BoxButton) {
  switch (params.show) {
    case true:
      return (
        <div className="flex flex-col absolute top-1/3 min-w-[70%] right-8">
          <div className=" bg-black z-10 p-3 rounded-lg flex flex-col">
            <Button onClick={() => {}} text="Ẩn thông báo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>
            </Button>
            <Button
              text="Xóa hộp thoại"
              onClick={() => {
                post(
                  "/box/remove",
                  {
                    idBox: params.idBox,
                  },
                  (n: any) => {
                    alert(n.mess);
                    params.SetShow(false);
                  }
                );
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </Button>
          </div>
        </div>
      );
    default:
      return <></>;
  }
}

function useBoxData() {
  const [show, SetShow] = useState(false);

  return { show, SetShow };
}

function BoxData(data: boxdata) {
  const mess = useSelector((state: RootHome) => state.rootHome.mess);
  const va = useBoxData();
  const [bubble, SetBudbble] = useState(false);
  const [watch, SetWatch] = useState(true);
  const [lastMess, SetLastMess] = useState<lastmess>({
    content: data.content,
    idBox: data.idBox,
    idMess: "",
    idUser: data.idUser,
    type: data.messType,
  });
  const dispatch = useDispatch();
  var status = ["", "", "font-bold"];
  useEffect(() => {
    if (data.status == 2) {
      SetWatch(false);
    }
  }, []);
  useEffect(() => {
    if (mess.idBox == "") {
      return;
    }

    if (mess.idBox == data.idBox) {
      if (mess.content.length > 0) {
        SetLastMess(mess);
      }
      if (mess.idUser == data.idUser) {
        SetWatch(false);
      } else {
        SetWatch(true);
      }
      
    }
  }, [mess, watch]);
  return (
    <div
      onMouseEnter={() => {
        SetBudbble(true);
      }}
      onMouseLeave={() => {
        SetBudbble(false);
      }}
      className={`relative BOX${data.idBox}`}
    >
      <div
        onClick={() => {
          dispatch(SetBoxList(data.idBox));
          dispatch(
            SetMess({
              idBox: data.idBox,
              content: "",
              idMess: "",
              idUser: "",
              ngay: "",
              type: "",
            })
          );
        }}
        className="px-2 h-18 py-3 flex items-center hover:bg-[#2A2A2A] cursor-pointer"
      >
        <input type="hidden" id="avatar" value="<%=element.avatar %>" />
        <input type="hidden" id="name" value="<%=element.nameUser %>" />
        <div className="overflow-hidden w-14 h-14 rounded-full mr-3">
          <img src={data.pathImage} alt="" />
        </div>
        <div className="w-3/5 px-3 font-sans">
          <div className="">{data.Name}</div>
          <div
            className={`text-xs line-clamp-1 flex space-x-3 ${
              status[data.status]
            }`}
          >
            {lastMess.idUser == data.idUser ? " " : <div>Bạn</div>}
            <TypeMess content={lastMess.content} type={lastMess.type} />
          </div>
        </div>
        {watch == false ? (
          <span className="relative flex size-6 justify-center items-center">
            <span className="animate-ping absolute h-full w-full rounded-full bg-[#1ED760] opacity-75"></span>
            <span className=" rounded-full h-3 w-3 bg-[#1ED760]"></span>
          </span>
        ) : (
          <></>
        )}
      </div>
      <div
        className={`absolute right-2 top-1/3  p-2 rounded-full ${
          bubble ? "bg-black" : ""
        }`}
        onClick={() => {
          va.SetShow(!va.show);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          className="fill-white cursor-pointer"
          viewBox="0 0 16 16"
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
        </svg>
      </div>
      <BoxButton idBox={data.idBox} show={va.show} SetShow={va.SetShow} />
    </div>
  );
}
export default function BoxListData(p: handle) {
  const { data } = useBoxList();

  var list = data.map((v, i) => {
    return (
      <BoxData
        imagebox=""
        messType={v.messType}
        status={v.status}
        pathImage={v.pathImage}
        boxtype={v.boxtype}
        content={v.content}
        id={v.id}
        idUser={v.idUser}
        Name={v.Name}
        key={v.idBox}
        idBox={v.idBox}
      />
    );
  });

  return <>{list}</>;
}

interface TypeMess {
  type: string;
  content: string;
}
function TypeMess(params: TypeMess) {
  switch (params.type) {
    case "Image":
      return (
        <>
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
        </>
      );
    default:
      return <div>{params.content}</div>;
  }
}
