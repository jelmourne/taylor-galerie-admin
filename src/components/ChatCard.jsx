import React, { useState, useEffect, useRef } from "react";
import useSupabase from "../hooks/useSupabase";
import Message from "./Message";

function ChatCard({ id }) {
  const supabase = useSupabase();

  const ref = useRef(null);
  const box = useRef(null);

  const [messages, setMessages] = useState();

  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (message === "") return;

    await supabase
      .from("messages")
      .insert({
        chat_room: id,
        message: message,
        is_client: false,
        is_read: true,
      })
      .select();

    ref.current.value = "";
  };

  supabase
    .channel("messages")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `chat_room=eq.${id}`,
      },
      (payload) => {
        setMessages((prev) => [...prev, payload.new]);
      }
    )
    .subscribe();

  useEffect(() => {
    const loadMessagesData = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("chat_room", id)
        .order("id");

      if (error) console.log(error);

      setMessages(data);
    };

    const setRead = async () => {
      await supabase
        .from("messages")
        .update({ is_read: "true" })
        .eq("chat_room", id);
    };

    loadMessagesData();
    setRead();
  }, [id, supabase]);

  useEffect(() => {
    if (box.current) {
      box.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <div
      className="grid grid-cols-2 grid-rows-[1fr_75px] overflow-y-hidden"
      style={{ maxHeight: "calc(100vh - 100px)" }}
    >
      <div className="pr-4 col-span-2 gap-2 overflow-scroll row-span-1 row-start-1">
        {messages != undefined &&
          messages.map((e, i) => {
            return <Message msg={e.message} key={i} isClient={e.is_client} />;
          })}
        <div ref={box} />
      </div>
      <div className="flex items-center pt-0 row-start-2 col-span-2 w-full">
        <div className="flex items-center justify-center space-x-2 w-full">
          <input
            className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
            placeholder="Type your message"
            ref={ref}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button
            className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatCard;
