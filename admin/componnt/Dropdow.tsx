import React from "react";
import { useState } from "react";

interface Dropdown {
  children: React.JSX.Element[];
}
export default function Dropdown(d: Dropdown) {
  const [show, SetShow] = useState(false);

  var head = d.children[0];
  var body = d.children
    .filter((v, i) => {
      return i > 0;
    })
    .map((v) => {
      return v;
    });
  return (
    <div
      onClick={() => {
        if (show == true) {
          return;
        }
        SetShow(true);
      }}
      className="w-full cursor-pointer text-center"
    >
      <div
        onClick={() => {
          SetShow(false);
        }}
        className="w"
      >
        {head}
      </div>
      {show ? <div className="w-full">{body}</div> : <></>}
    </div>
  );
}
