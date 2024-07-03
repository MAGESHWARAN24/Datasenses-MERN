import React from "react";
import SideNav from "./sidenav/SideNav";
import Logo from "./logo/Logo";
import {Outlet, useNavigate} from "react-router-dom";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Button} from "@/components/ui/button";
import axios from "axios";
import applicationAPI from "@/api/applicationAPI";

export default function Layout({children}) {
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      (await applicationAPI("auth/logout"))
        .post()
        .then((response) => {
          if (response.status === 200) {
            localStorage.removeItem("auth_Jwt");
            navigate("auth/login");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {}
  };
  return (
    <main className="h-screen w-full flex flex-row">
      <aside className="h-full w-24 bg-primary flex justify-center items-center flex-col gap-10">
        <SideNav />
      </aside>
      <main className="h-full w-full flex flex-col">
        <header className="shadow-sm h-10">
          <nav className="w-full h-full px-2 flex items-center justify-between">
            <Logo />
            <form method="post" onSubmit={handleLogout}>
              <Button variant="link"> Logout</Button>
            </form>
          </nav>
        </header>
        <main className="flex-1 overflow-x-auto overflow-y-hidden">
          <Outlet />
        </main>
      </main>
    </main>
  );
}
