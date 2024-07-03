import React from "react";
import {MdSpaceDashboard} from "react-icons/md";
import {AiFillDatabase} from "react-icons/ai";
import {SiGoogleforms} from "react-icons/si";
import {NavLink} from "react-router-dom";

export default function SideNav() {
  return (
    <>
      {navItem.map((navEl, index) => (
        <NavLink
          to={navEl.to}
          key={index}
          className={({isActive}) =>
            isActive ? "text-white" : "text-gray-500"
          }
        >
          <div className="size-24 text-lg flex-col flex items-center justify-center">
            {navEl.icon}
            {navEl.label}
          </div>
        </NavLink>
      ))}
    </>
  );
}

const navItem = [
  {
    icon: <MdSpaceDashboard className="size-14" />,
    to: "/dashboard",
    label: "Dashboard",
  },
  {
    icon: <SiGoogleforms className="size-14" />,
    to: "/forms",
    label: "Form",
  },
  {
    icon: <AiFillDatabase className="size-14" />,
    to: "/repository",
    label: "Repository",
  },
];
