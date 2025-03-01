import React from "react";
import { Outlet } from "react-router";
import SidebarButton from "./SidebarButton";
import {
  ChartPieIcon,
  ChatBubbleLeftRightIcon,
  ShoppingBagIcon,
} from "@heroicons/react/20/solid";

function Sidebar() {
  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-neutral-100 border-r border-gray-200 sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-neutral-100">
          <ul className="space-y-2 font-medium">
            <li>
              <SidebarButton
                title={"Dashboard"}
                path={"/"}
                icon={<ChartPieIcon />}
              />
            </li>
            <li>
              <SidebarButton
                title={"Messages"}
                path={"/chat"}
                icon={<ChatBubbleLeftRightIcon />}
              />
            </li>
            <li>
              <SidebarButton
                title={"Orders"}
                path={"/order"}
                icon={<ShoppingBagIcon />}
              />
            </li>
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-gray-200 rounded-lg dark:border-gray-700 mt-14">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Sidebar;
