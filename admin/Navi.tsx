import React from "react";
import { useDispatch } from "react-redux";
import { Page } from "./Redux";
import Dropdown from "./componnt/Dropdow";

export default function Navi() {
  const dispatch = useDispatch();

  return (
    <aside className="relative bg-sidebar h-screen w-64 hidden sm:block shadow-xl">
      <div className="p-6">
        <a className="text-white text-3xl font-semibold uppercase hover:text-gray-300">
          Admin
        </a>
      </div>
      <nav className="text-white text-base font-semibold pt-3">
        <a
          onClick={() => {
            dispatch(Page("genre"));
          }}
          className="flex items-center  hover:opacity-100 text-white py-4 pl-6 nav-item cursor-pointer "
        >
          <i className="fas fa-sticky-note mr-3"></i>
          Thể loại
        </a>

        <a
          onClick={() => {
            dispatch(Page("songlist"));
          }}
          className="flex items-center active-nav-link text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item cursor-pointer"
        >
          <i className="fas fa-tachometer-alt mr-3"></i>
          Danh sách nhạc
        </a>
        <Dropdown>
          <a className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item cursor-pointer">
            <i className="fas fa-align-left mr-3"></i>
            Playlist
          </a>
          <a
            onClick={() => {
              dispatch(Page("playlists"));
            }}
            className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item cursor-pointer"
          >
            <div className="mr-4"></div>
            Danh sách Playlist
          </a>
          <a
            onClick={() => {
              dispatch(Page("playlist"));
            }}
            className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item cursor-pointer"
          >
            <div className="mr-4"></div>
            Thêm mới play list
          </a>
        </Dropdown>
        <Dropdown>
          <div className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 mr-3"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
            Danh sách tài khoản
          </div>
          <div
            onClick={() => {
              dispatch(Page("userlist"));
            }}
            className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item cursor-pointer"
          >
            <div className="mr-6"></div>
            Danh sách người dùng
          </div>
          <div
            onClick={() => {
              dispatch(Page("employls"));
            }}
            className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item cursor-pointer"
          >
            <div className="mr-6"></div>
            Danh sách nhân viên
          </div>
        </Dropdown>

        <a
          href="/auth/logout"
          className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item cursor-pointer"
        >
          <i className="fas fa-calendar mr-3"></i>
          Đăng xuất
        </a>
      </nav>
    </aside>
  );
}
