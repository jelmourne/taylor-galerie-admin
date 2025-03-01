import React from "react";

function SidebarButton({ title, icon, path }) {
  return (
    <a
      href={path}
      className="flex items-center p-2 text-gray-900 rounded-lg group-hover:text-neutral-700 group"
    >
      {React.cloneElement(icon, {
        className:
          "w-5 h-5 text-gray-900 transition duration-75 group-hover:text-neutral-700",
      })}

      <span className="ms-3">{title}</span>
    </a>
  );
}

export default SidebarButton;
