import React from "react";

function Message({ msg, isClient }) {
  if (isClient) {
    return (
      <div class="p-2 bg-neutral-300 items-center justify-center text-gray-50 leading-none rounded-full w-fit">
        <span class="text-center flex-auto">{msg}</span>
      </div>
    );
  } else {
    return (
      <div class="p-2 bg-blue-500 items-center justify-center text-white leading-none rounded-full w-fit max-w-1/2">
        <span class="text-center flex-auto">{msg}</span>
      </div>
    );
  }
}

export default Message;
