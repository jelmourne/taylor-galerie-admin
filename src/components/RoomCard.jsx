import React from "react";
import { Link } from "react-router";

function RoomCard({ id, lastUpdated, isRead, lastMessage }) {
  return (
    <Link
      to={`/chat?id=${id}`}
      className="border bg-neutral-50 border-neutral-100 py-2 p-2 flex flex-col rounded-lg shadow-sm relative"
    >
      <span class="flex size-3 absolute opacity-75 justify-end">
        <span
          class={`absolute inline-flex h-full w-full ${
            isRead ? "" : "animate-ping bg-sky-400"
          } rounded-full  opacity-75`}
        ></span>
        {isRead ? (
          ""
        ) : (
          <span class="relative inline-flex size-3 rounded-full bg-sky-500"></span>
        )}
      </span>
      <div className="flex justify-between w-full">
        <p>{id}</p>
        <p>{new Date(lastUpdated).toLocaleTimeString()}</p>
      </div>
      <p className="text-neutral-500">
        {lastMessage.length < 20
          ? lastMessage
          : `${lastMessage.substring(0, 20)}...`}
      </p>
    </Link>
  );
}

export default RoomCard;
