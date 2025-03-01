import React, { useEffect, useState } from "react";
import ChatCard from "../components/ChatCard";
import useSupabase from "../hooks/useSupabase";
import { useParams } from "react-router";
import RoomCard from "../components/RoomCard";

//

function Chat() {
  const supabase = useSupabase();
  const { id } = useParams();

  const [rooms, setRooms] = useState();

  useEffect(() => {
    const loadRoomData = async () => {
      const { data, error } = await supabase.from("rooms").select();

      if (error) console.log(error);

      setRooms(data);
    };

    loadRoomData();
  }, [id, supabase]);
  return (
    <div className="grid grid-cols-[200px_1fr] gap-5">
      <div className="flex flex-col gap-5 overflow-sroll">
        {rooms != undefined &&
          rooms.map((e, i) => {
            return <RoomCard id={e.id} last_updated={e.last_updated} key={i} />;
          })}
      </div>
      <div className="col-start-2 col-span-1">
        {id ? <ChatCard id={id} /> : ""}
      </div>
    </div>
  );
}

export default Chat;
