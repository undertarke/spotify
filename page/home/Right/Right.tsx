import { useSelector } from "react-redux";
import { RootHome } from "../RootRedux";
import React from "react";
import Queue from "./Queue";
import Discuss from "./Discuss";
import BoxChat from "./BoxChat";

export default function Right() {
  const recentList = useSelector((s: RootHome) => s.rootHome.recentList);
  const Right = useSelector((state: RootHome) => state.rootHome.Right);

  var child: React.JSX.Element = <></>;

  if (recentList && Right == "Queue") {
    child = <Queue />;
  }
  if (recentList && Right == "Discuss") {
    child = <Discuss idsong=""></Discuss>;
  }
  if (recentList && Right == "Mess") {
    child = <BoxChat></BoxChat>;
  }
  return <>{child}</>;
}
