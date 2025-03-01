import React, { useEffect, useState } from "react";
import ChatCard from "../components/ChatCard";
import useSupabase from "../hooks/useSupabase";
import { useSearchParams } from "react-router";
import RoomCard from "../components/RoomCard";

//

function Chat() {
  const supabase = useSupabase();

  const [id, setId] = useState("");
  const [searchParams] = useSearchParams();

  const [rooms, setRooms] = useState();

  supabase
    .channel("rooms")
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "rooms",
      },
      (payload) => {
        setRooms((prev) => {
          var temp = prev;

          const index = temp.findIndex((o) => o.id === payload.new.id);

          temp.splice(index, 1);

          return [...temp, payload.new];
        });
      }
    )
    .subscribe();
  useEffect(() => {
    const loadRoomData = async () => {
      const { data, error } = await supabase.from("rooms").select();

      if (error) console.log(error);

      setRooms(data);
    };

    setId(searchParams.get("id"));

    loadRoomData();
  }, [id, supabase, setId, searchParams]);
  return (
    <div className="grid grid-cols-[200px_1fr] gap-5">
      <div className="flex flex-col gap-5 overflow-sroll">
        {rooms != undefined &&
          rooms.map((e, i) => {
            return (
              <RoomCard
                id={e.id}
                lastUpdated={e.last_updated}
                lastMessage={e.last_message}
                isRead={e.is_read}
                key={i}
              />
            );
          })}
      </div>
      <div className="col-start-2 col-span-1">{id && <ChatCard id={id} />}</div>
    </div>
  );
}

export default Chat;
