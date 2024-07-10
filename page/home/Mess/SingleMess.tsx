import React, { useRef, useState } from "react";
import { post } from "../../config/req";
export interface singleMess {
  idUser2: string;
  idFuture: string | undefined;
  avatar: string;
  idUser: string;
  content: string;
  type: string;
  idMess: string;
  ngay: string;
}

interface MessId {
  messId: string;
  controll: boolean;
  type: string;
  className: string;
}
interface ControlMessButton {
  onClick(): void;
  children: React.JSX.Element;
  text: string;
}

function ControlMessButton(data: ControlMessButton) {
  return (
    <button
      className="p-2 hover:bg-[#2A2A2A] w-full font-mono flex items-center justify-around"
      onClick={data.onClick}
    >
      {data.children}
      <div>{data.text}</div>
    </button>
  );
}
function ControlMess(data: MessId) {
  switch (data.controll) {
    case false:
      return <></>;
    case true:
      return (
        <div className={data.className}>
          <div className="p-2 min-w-[100px] rounded-lg shadow-[0_1px_2px_0_rgba(60,64,67,.1),_0_2px_6px_2px_rgba(60,64,67,.15)]">
            {data.type == "2" ? (
              <ControlMessButton
                onClick={() => {
                  post("/mess/remove", { idMess: data.messId }, (da: any) => {
                    if (!da.err) {
                      (
                        document.querySelector(
                          `.Mess${data.messId}`
                        ) as HTMLElement
                      ).innerHTML = "";
                    }
                  });
                }}
                text="Xóa"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-[13px]"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                    clipRule="evenodd"
                  />
                </svg>
              </ControlMessButton>
            ) : (
              <></>
            )}

            <ControlMessButton
              onClick={() => {
                post(
                  "/mess/hiddenMess",
                  { idMess: data.messId },
                  (da: any) => {}
                );
              }}
              text="Ẩn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-[13px]"
              >
                <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
              </svg>
            </ControlMessButton>
          </div>
        </div>
      );
  }
}

export default function SingleMess(data: singleMess) {
  const [naviagte, setNaviagte] = useState(false);
  const [controll, SetControll] = useState(false);

  return (
    <div
      title={data.idUser + ":" + data.idUser2}
      className={"text-[15px] Mess" + data.idMess}
      onClick={(r) => {
        if (controll) {
          SetControll(false);
        }
      }}
    >
      {data.idUser == data.idUser2 ? (
        <div
          className="w-full"
          key={data.idMess}
          onMouseEnter={() => {
            setNaviagte(true);
          }}
          onMouseLeave={() => {
            setNaviagte(false);
          }}
        >
          <div className="flex justify-end p-2 ">
            <div className="w-1/2 relative bg-[#2A2A2A] p-2 rounded-xl">
              {naviagte ? (
                <div
                  className=" h-5 w-5 absolute right-full top-1/2"
                  onClick={() => {
                    if (!controll) {
                      SetControll(true);
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    className="fill-white hover:fill-blue-500 cursor-pointer"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                  </svg>

                  <ControlMess
                    className="absolute right-full bottom-0 bg-black"
                    messId={data.idMess}
                    type="2"
                    controll={controll}
                  />
                </div>
              ) : (
                <></>
              )}
              <Content
                content={data.content}
                ngay={data.ngay}
                type={data.type}
              />
            </div>
          </div>
        </div>
      ) : (
        <div
          className="w-full "
          onMouseEnter={() => {
            setNaviagte(true);
          }}
          onMouseLeave={() => {
            setNaviagte(false);
          }}
        >
          <div className=" my-2 ml-2 ">
            <div className="flex items-end ">
              <div className="">
                {data.idFuture != data.idUser ? (
                  <>
                    <img
                      className="size-[35px] rounded-full"
                      src={data.avatar}
                      alt=""
                    />
                  </>
                ) : (
                  <>
                    <div className="size-[35px]"></div>
                  </>
                )}
              </div>
              <div className="grid grid-cols-1 bg-[#2A2A2A] relative w-1/2 cursor-pointer">
                <div className=" p-2 rounded-md ">
                  <Content
                    content={data.content}
                    ngay={data.ngay}
                    type={data.type}
                  />
                </div>
                {naviagte ? (
                  <div
                    className=" ml-3  rounded-full p-1 h-6 w-6 absolute left-full top-1/2 z-0"
                    onClick={() => {
                      if (!controll) {
                        SetControll(true);
                      }
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      className="fill-white hover:fill-blue-500 cursor-pointer"
                      viewBox="0 0 16 16"
                    >
                      <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                    </svg>
                    <ControlMess
                      className="absolute left-full top-0"
                      controll={controll}
                      messId={data.idMess}
                      type="1"
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface Time {
  ngay: string;
}
function Time(d: Time) {
  var temp = new Date(d.ngay);
  var now = new Date();
  return (
    <p className="py-2 text-white text-[11px]">
      {temp.toLocaleDateString() == now.toLocaleDateString()
        ? ""
        : temp.toLocaleDateString()}{" "}
      {temp.toLocaleTimeString()}
    </p>
  );
}
interface Content {
  ngay: string;
  content: string;
  type: string;
}
function Content(p: Content) {
  return (
    <div>
      <Mess content={p.content} ngay="" type={p.type} />
      <Time ngay={p.ngay} />
    </div>
  );
}

function Mess(params: Content) {
  switch (params.type) {
    case "Mess":
      return <div>{params.content}</div>;
    default:
      return (
        <ImageContent content={params.content} ngay="" type=""></ImageContent>
      );
  }
}
function ImageContent(data: Content) {
  var texts = data.content;
  texts = texts.trim();

  var r = texts.split("@");
  var a = r
    .filter((v) => {
      return v.length > 0;
    })
    .map((text) => {
      var s = `${text}`;
      return (
        <span className="w-fit " key={Math.random()}>
          <img src={s} className="w-30 h-auto" alt="" />
        </span>
      );
    });

  return <div className="grid grid-cols-1">{a}</div>;
}
