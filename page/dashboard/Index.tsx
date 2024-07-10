import React from "react";
import Header from "./Header";
import Home from "./Home";
import SongForm from "./Song/SongForm";
import { Provider, useSelector } from "react-redux";
import dashboard, { RootNaviRedux } from "./NaviRedux";
import SongList from "./SongList";
import SongEdit from "./Song/SongEdit";

export default function Index() {
  const page = useSelector((state: RootNaviRedux) => state.navi.page);
  var l: React.JSX.Element;
  switch (page) {
    case "songlist":
      l = <SongList></SongList>;
      break;
    case "songform":
      l = <SongForm></SongForm>;
      break;
    case "songedit":
      l = <SongEdit></SongEdit>;
      break;
    default:
      l = <Home></Home>;
      break;
  }
  return (
    <div>
      <Header></Header>
      {l}
    </div>
  );
}
