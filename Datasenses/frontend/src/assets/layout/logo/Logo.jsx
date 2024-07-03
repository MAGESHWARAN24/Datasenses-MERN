import React from "react";
import {MdOutlinePrivateConnectivity} from "react-icons/md";
import {Link} from "react-router-dom";
export default function Logo() {
  return (
    <Link
      to={"/dashboard"}
      className="flex items-center justify-center w-fit text-2xl text-orange-600 font-semibold"
    >
      <MdOutlinePrivateConnectivity className="size-10" />
      Datasenses
    </Link>
  );
}
