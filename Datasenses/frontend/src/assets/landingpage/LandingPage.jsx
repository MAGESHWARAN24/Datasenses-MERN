import React from "react";
import {Button} from "@/components/ui/button";
import {MdOutlinePrivateConnectivity} from "react-icons/md";
import {useNavigate} from "react-router-dom"
function LandingPage() {
    const redirect = useNavigate()
  return (
    <main className="h-screen w-full flex flex-row">
      <img
        src="/Datasenses.svg"
        alt="image"
        className="w-3/4 hidden lg:block h-full"
      />
      <div className="h-full w-full flex flex-col items-center justify-center gap-10">
        <div className="flex items-center justify-center w-fit text-2xl text-orange-600 font-semibold">
          <MdOutlinePrivateConnectivity className="size-10" />
          Datasenses
        </div>
        <div className="w-full h-20 grid grid-cols-2 gap-2 p-3 place-content-center">
          <Button
            variant="outline"
            className="w-full h-14 text-xl"
            onClick={() => redirect('/auth/login')}
          >
            Login
          </Button>
          <Button
            variant="outline"
            className="w-full h-14 text-xl"
            onClick={() => redirect('/auth/signup')}
          >
            Signup
          </Button>
        </div>
      </div>
    </main>
  );
}

export default LandingPage;
