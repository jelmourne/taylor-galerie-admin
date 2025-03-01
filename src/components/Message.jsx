import React from "react";

function Message({ msg, isClient }) {
  if (isClient) {
    return (
      <div className="p-2 bg-neutral-300 items-center justify-center text-gray-50 leading-none rounded-full w-fit m-2">
        <span className="text-center flex-auto">{msg}</span>
      </div>
    );
  } else {
    return (
      <div className="p-2 bg-blue-500 items-center justify-center text-white leading-none rounded-full w-fit m-2">
        <span className="text-center flex-auto">{msg}</span>
      </div>
    );
  }
}

export default Message;
