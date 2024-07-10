import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Check,
  IsLogin,
  NaviPage,
  NaviRight,
  RootHome,
  SetNotificationPage,
  SetNotificationPageIdSong,
  SetPosition,
} from "../RootRedux";
import { get, post } from "../../config/req";
import NotificationPage, { NotificationList } from "./NotificationList";

interface Infor {
  pathImage: string;
  Name: string;
  Vertify: string;
}
export default function Header() {
  const [show, SetShow] = useState(false);
  const dispathch = useDispatch();
  const [showNotification, SetShowNotification] = useState(false);
  const [name, SetName] = useState("");
  const page = useSelector((state: RootHome) => state.rootHome.command.page);
  const update = useSelector((state: RootHome) => state.rootHome.update);
  const isLogin = useSelector((state: RootHome) => state.rootHome.isLogin);
  const dispatch = useDispatch();
  const [infor, SetInfor] = useState<Infor>({
    Name: "",
    pathImage: "",
    Vertify: "",
  });
  useEffect(() => {
    get("/user", (v: any) => {
      dispatch(IsLogin(v.u != undefined));
      if (v.u) {
        SetInfor(v.u);
        localStorage.setItem("userinfor", JSON.stringify(v.u));
      }
    });
  }, [update]);

  return (
    <div className={`sticky w-full z-30  top-0 left-0 px-5 py-4 space-y-2`}>
      <div className="flex items-center justify-between space-x-2">
        <div className="flex space-x-3  items-center">
          <Back />
          <Forward />
          <>
            {page == "genre" || page == "search" ? (
              <div className="flex items-center border-white border-2 px-3 bg-[#2A2A2A] rounded-full">
                <svg
                  data-encore-id="icon"
                  fill="white"
                  role="img"
                  aria-hidden="true"
                  className="size-[16px] "
                  viewBox="0 0 16 16"
                >
                  <path d="M7 1.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5zM.25 7a6.75 6.75 0 1 1 12.096 4.12l3.184 3.185a.75.75 0 1 1-1.06 1.06L11.304 12.2A6.75 6.75 0 0 1 .25 7z"></path>
                </svg>
                <input
                  onChange={(v) => {
                    var value = v.currentTarget.value;
                    if (value.length < 2) {
                      dispatch(NaviPage({ page: "genre", param: "" }));
                      return;
                    }
                    dispatch(NaviPage({ page: "search", param: value }));
                  }}
                  type="text"
                  className="searchname p-3 text-white w-[300px] bg-[#2A2A2A] border-[#2A2A2A]  focus:outline-none border-2 rounded-full"
                />
              </div>
            ) : (
              <div className="size-[16px] p-3"></div>
            )}
          </>
        </div>
        {isLogin ? (
          <div className="flex  items-center space-x-3">
            <div className="cursor-pointer text-sm font-bold bg-white text-black rounded-3xl px-2 py-1">
              Khám phá Premium
            </div>
            <div className="cursor-pointer text-sm font-bold bg-black text-white rounded-3xl px-2 py-1">
              Cài đặt ứng dụng
            </div>
            <div
              className=""
              onClick={() => {
                dispatch(NaviRight("Mess"));
              }}
            >
              <svg
                viewBox="0 0 12 13"
                width="20"
                height="20"
                className="fill-white hover:fill-[#1FDF64]"
              >
                <g fillRule="evenodd" transform="translate(-450 -1073)">
                  <path d="m459.603 1077.948-1.762 2.851a.89.89 0 0 1-1.302.245l-1.402-1.072a.354.354 0 0 0-.433.001l-1.893 1.465c-.253.196-.583-.112-.414-.386l1.763-2.851a.89.89 0 0 1 1.301-.245l1.402 1.072a.354.354 0 0 0 .434-.001l1.893-1.465c.253-.196.582.112.413.386M456 1073.5c-3.38 0-6 2.476-6 5.82 0 1.75.717 3.26 1.884 4.305.099.087.158.21.162.342l.032 1.067a.48.48 0 0 0 .674.425l1.191-.526a.473.473 0 0 1 .32-.024c.548.151 1.13.231 1.737.231 3.38 0 6-2.476 6-5.82 0-3.344-2.62-5.82-6-5.82"></path>
                </g>
              </svg>
            </div>

            <div className="bg-[#2A2A2A] p-2 rounded-full relative cursor-pointer">
              <svg
                onClick={() => {
                  SetShowNotification(!showNotification);
                  if (showNotification == false) {
                    dispathch(SetNotificationPage("list"));
                    dispathch(SetNotificationPageIdSong(""));
                  }
                }}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                className="fill-white hover:fill-[#1FDF64]"
                viewBox="0 0 16 16"
              >
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
              </svg>
              {showNotification ? <NotificationPage /> : <></>}
            </div>
            <div className="relative cursor-pointer">
              <div
                onClick={() => {
                  SetShow(!show);
                }}
                className="text-[14px]"
              >
                <img
                  className="size-[40px] rounded-full cursor-pointer"
                  src={infor.pathImage}
                  alt=""
                  srcSet=""
                />
              </div>
              {show ? (
                <div className="bg-[#3E3E3E] z-[20] rounded-lg min-w-[200px] text-[16px] absolute top-full right-0">
                  <div className="text-white  cursor-pointer hover:bg-black">
                    <div
                      onClick={() => {
                        dispatch(NaviPage({ page: "profile", param: "" }));
                        SetShow(!show);
                      }}
                      className="p-2"
                    >
                      Tài khoản
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      get("/auth/logout", (e: any) => {
                        window.location.replace("/auth");
                      });
                    }}
                    className="text-white cursor-pointer hover:bg-black"
                  >
                    <div className="p-2">Đăng xuất </div>
                  </div>
                  <div
                    onClick={() => {
                      window.location.replace("/dashboard");
                    }}
                    className="text-white cursor-pointer hover:bg-black"
                  >
                    <div className="p-2">Quản lý bài hát</div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="flex  items-center space-x-3">
              <button
                onClick={() => {
                  window.location.href = "/auth?dk=yes";
                }}
                className="font-bold hover:text-blue-500 px-3 py-1 rounded-2xl"
              >
                đăng ký
              </button>
              <button
                onClick={() => {
                  window.location.href = "/auth";
                }}
                className="bg-white hover:text-blue-500 font-bold text-black px-3 py-1 rounded-2xl "
              >
                đăng nhập
              </button>
            </div>
          </>
        )}
      </div>
      {page == "home" || page == "genre" ? (
        <div className="w-full flex items-center space-x-2">
          <div className="bg-white text-black text-[14px]  rounded-full px-2 py-1 w-max font-bold">
            Tất cả
          </div>
          <div className=" text-[14px] rounded-full  text-white p-2 w-max font-bold">
            Nhạc
          </div>
          <div className="text-[14px] rounded-full text-white p-2 w-max font-bold">
            Podcasts
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

function Forward() {
  const stack = useSelector((state: RootHome) => state.rootHome.stack);
  const position = useSelector((state: RootHome) => state.rootHome.position);
  const dispatch = useDispatch();
  return (
    <button
      title="forward"
      className={`${
        position < stack.length - 1 ? "bg-[#2A2A2A]" : "bg-black"
      } rounded-full size-[28px] flex justify-center items-center`}
      onClick={() => {
        if (stack.length == 0) {
          return;
        }
        dispatch(SetPosition(1));
      }}
    >
      <svg
        data-encore-id="icon"
        role="img"
        aria-hidden="true"
        className="fill-white size-4"
        viewBox="0 0 16 16"
      >
        <path d="M4.97.47a.75.75 0 0 0 0 1.06L11.44 8l-6.47 6.47a.75.75 0 1 0 1.06 1.06L13.56 8 6.03.47a.75.75 0 0 0-1.06 0z"></path>
      </svg>
    </button>
  );
}

function Back() {
  const stack = useSelector((state: RootHome) => state.rootHome.stack.length);
  const position = useSelector((state: RootHome) => state.rootHome.position);
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => {
        dispatch(SetPosition(-1));
      }}
      className={`${
        position > 0 ? "bg-[#2A2A2A]" : "bg-black"
      } rounded-full size-[28px] flex justify-center items-center`}
    >
      <svg
        data-encore-id="icon"
        role="img"
        aria-hidden="true"
        className="fill-white size-4"
        viewBox="0 0 16 16"
      >
        <path d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0z"></path>
      </svg>
    </button>
  );
}
