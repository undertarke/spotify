import React from "react";

interface Main {
  children: React.JSX.Element;
  title: string;
}
export default function Main(d: Main) {
  return (
    <main className="w-full h-full flex-grow p-2">
      <h1 className="text-3xl text-black pb-6">{d.title}</h1>
      <div className="w-full  relative bg-[#F6F6F6] overflow-x-scroll overflow-y-auto h-full">
        {d.children}
      </div>
    </main>
  );
}
