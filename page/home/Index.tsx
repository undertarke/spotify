import React, { useEffect, useState } from "react";

import { SetionList } from "./Setion";
import RecentList, { RecentPlaylist } from "./Right/RecentPlaylist";
import Genre, { GenreButtom } from "./Genre";
import Queue from "./Right/Queue";

import Playlist, { Artise, LikedSongList } from "./PlayList";

import { useDispatch, useSelector } from "react-redux";
import PlayingBar from "./Audio/PlayingBar";
import Header from "./Header/Header";
import { NaviPage, RootHome, SetMess } from "./RootRedux";
import Search from "./Search";
import Profile from "./Profile";
import IdGenre from "./IdGenre";

import Right from "./Right/Right";
import ChatBox from "./boxchat/SingleBox";
import { socket } from "../socket/Socket";

function useIndex() {
  const [queue, SetQueue] = useState(false);
  const [scroll, SetSroll] = useState(0);
  function Set(type: "page" | "scroll" | "playlist", va: any) {
    switch (type) {
      default:
        SetSroll(va);
        break;
    }
  }

  return { Set, queue, SetQueue, scroll };
}
export default function Index() {
  const { Set, queue, SetQueue, scroll } = useIndex();
  const page = useSelector((state: RootHome) => state.rootHome.command.page);
  const BoxList = useSelector((state: RootHome) => state.rootHome.BoxList);
  const isLogin = useSelector((state: RootHome) => state.rootHome.isLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    function res(v: any) {
      dispatch(SetMess(v));
    }
    socket.on("mess", res);
    return () => {
      socket.off("mess", res);
    };
  }, []);

  var children: React.JSX.Element;
  switch (page) {
    case "genre":
      children = <Genre></Genre>;
      break;
    case "playlist":
      children = <Playlist></Playlist>;
      break;
    case "likedsongs":
      children = <LikedSongList></LikedSongList>;
      break;
    case "artise":
      children = <Artise></Artise>;
      break;
    case "search":
      children = <Search></Search>;
      break;
    case "profile":
      children = <Profile></Profile>;
      break;
    case "idgenre":
      children = <IdGenre></IdGenre>;
      break;
    default:
      children = (
        <div>
          <div className=" rounded-b-lg">
            <RecentList>
              <RecentPlaylist img="../public/ca.jpg" name="Cà Phê Quán Quen" />
              <RecentPlaylist img="../public/ca.jpg" name="Cà Phê Quán Quen" />
            </RecentList>
            <SetionList name="Danh sách các nghệ sĩ" type="artist"></SetionList>
          </div>
        </div>
      );
      break;
  }
  return (
    <div className="h-full w-full bg-black CircularSpUIv3T-Book">
      <div className="flex h-[85%] space-x-1 relative">
        <div className="w-[80px] px-1 space-y-1">
          <div className="h-[20%] bg-[#121212] rounded-lg py-2">
            <div className="h-full">
              <Home />
              <GenreButtom />
            </div>
          </div>
          {isLogin ? (
            <div className="h-[80%] bg-[#121212] rounded-lg py-2 flex justify-center">
              <div className="w-2/3 ">
                <img
                  onClick={() => {
                    dispatch(NaviPage({ page: "likedsongs", param: "" }));
                  }}
                  src="../public/liked-songs-640.png"
                  className="rounded-lg"
                  alt=""
                  srcSet=""
                />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="flex-1 w-[100%]  space-y-1">
          <div className="relative ">
            <Header></Header>
          </div>

          <div className=" overflow-y-scroll h-[80%] scroll-pr-1 relative">
            {children}
            <footer className="h-[200px]"></footer>
          </div>
        </div>

        <Right />
        <div className="absolute right-[400px] z-40 space-x-2 flex bottom-0 ">
          {BoxList.map((v) => {
            return <ChatBox idbox={v} key={v} />;
          })}
        </div>
      </div>
      <PlayingBar />
    </div>
  );
}

function Home() {
  const dispatch = useDispatch();
  const page = useSelector((state: RootHome) => state.rootHome.command.page);
  return (
    <div
      onClick={() => {
        dispatch(NaviPage({ page: "home", param: "" }));
      }}
      className="w-full h-1/2 flex justify-center items-center"
    >
      {page != "home" ? (
        <svg
          data-encore-id="icon"
          role="img"
          aria-hidden="true"
          className="size-1/2 fill-white"
          viewBox="0 0 24 24"
        >
          <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732l7.5-4.33z"></path>
        </svg>
      ) : (
        <svg
          data-encore-id="icon"
          role="img"
          aria-hidden="true"
          className="size-1/2 fill-white"
          viewBox="0 0 24 24"
        >
          <path d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732l-7.5-4.33z"></path>
        </svg>
      )}
    </div>
  );
}
