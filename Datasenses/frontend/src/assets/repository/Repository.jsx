import React from "react";
import RepositoryCard from "./repositorycard/RepositoryCard";
import {ScrollArea} from "@/components/ui/scroll-area";
import applicationAPI, {apiPath} from "@/api/applicationAPI";

export default function Repository() {
  const [rep, setRep] = React.useState([]);
  React.useEffect(() => {
    const fetchAll = async () => {
      (await applicationAPI(apiPath.repository.fetch))
        .fetchAll()
        .then((response) => {
          if (response.status === 200) {
            setRep(response.data.repository);
          }
        })
        .catch((error) => console.log(error));
    };
    fetchAll();
  }, []);
  return (
    <>
      <header className="h-[10%]">
        <nav className="h-[5%] w-full p-5 flex flex-col items-center \">
          <h1 className="text-2xl h-10 w-full font-extrabold">Repository</h1>
        </nav>
      </header>
      <ScrollArea className="h-[90%] w-full">
        {rep.length ? (
          <main className="w-full h-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
            {rep.map((ele, index) => (
              <RepositoryCard props={ele} key={index} />
            ))}
          </main>
        ) : (
          <div className="">No Application</div>
        )}
      </ScrollArea>
    </>
  );
}
