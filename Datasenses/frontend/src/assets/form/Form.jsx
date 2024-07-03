import React from "react";
import StatusCard from "./status/StatusCard";
import CreateBtn from "./createbtn/CreateBtn";
import StatusVisualRepresentation from "./status/StatusVisualRepresentation";
import FormTable from "./formTable/FormTable";
import applicationAPI, {apiPath} from "@/api/applicationAPI";
import {useAppContext, types} from "@/hooks/AppContext";

export default function Form() {
  const {dispatch} = useAppContext();
  React.useEffect(() => {
    const fetch = async () => {
      (await applicationAPI(apiPath.form.get))
        .fetch()
        .then((reponses) => {
          dispatch({
            type: types.form.addAll_Forms,
            payload: reponses.data,
          });
        })
        .catch((error) => console.log(error));
    };
    fetch();
  }, []);

  return (
    <main className="h-full w-full flex flex-col">
      <div className="h-[40%] w-full flex flex-wrap items-center justify-center">
        <div className="w-1/2 h-full flex items-center justify-center p-5">
          <StatusCard />
        </div>
        <div className="w-1/2 h-full">
          <StatusVisualRepresentation />
        </div>
      </div>
      <div className="h-1/2 w-full">
        <nav className="flex flex-row justify-between items-center h-[10%] p-3">
          <h1 className="text-lg font-semibold">Applications</h1>
          <CreateBtn />
        </nav>
        <section className="h-full w-full">
          <FormTable />
        </section>
      </div>
    </main>
  );
}
