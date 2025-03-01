import React from "react";
import { Link } from "react-router";

function RoomCard({ id, last_updated }) {
  return (
    <Link
      to={`/chat?id=${id}`}
      className="border bg-neutral-50 border-neutral-100 py-2 p-2 flex flex-col rounded-lg shadow-sm"
    >
      <p className="text-semibold" href={`/chat?id=${id}`}>
        {id}
      </p>
      <p className="text-xs">{last_updated}</p>
    </Link>
  );
}

export default RoomCard;
