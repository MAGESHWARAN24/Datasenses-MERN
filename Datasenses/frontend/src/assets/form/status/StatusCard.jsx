import React from "react";
import {FaEye} from "react-icons/fa";
import {FaWpforms} from "react-icons/fa6";
import {VscGraphLine} from "react-icons/vsc";
import {LuSplit} from "react-icons/lu";
import {Card, CardDescription, CardTitle} from "@/components/ui/card";
import {useAppContext} from "@/hooks/AppContext";

export default function StatusCard() {
  const {data} = useAppContext();
  const status = React.useMemo(() => data.forms.Status);

  const card = [
    {
      style: "shadow border-blue-500 shadow-sm shadow-blue-500 ",
      icon: <FaEye className="size-5 text-blue-500" />,
      status: status.length ? status[0].visits : 0,
      title: "Total visits",
      helperText: "All time form visits",
    },
    {
      style: "shadow border-yellow-500 shadow-sm shadow-yellow-500",
      icon: <FaWpforms className="size-5 text-yellow-500" />,
      status: status.length ? status[0].submissions : 0,
      title: "Total submissions",
      helperText: "All time form submissions",
    },
    {
      style: "shadow border-green-500 shadow-sm shadow-green-500",
      icon: <VscGraphLine className="size-5 text-green-500" />,
      status: `${
        status.length ? Number(status[0].submissionsRate).toFixed(2) : 0
      }%`,
      title: "Submission rate",
      helperText: "Visits that result in form submission",
    },
    {
      style: "shadow border-red-500 shadow-sm shadow-red-500",
      icon: <LuSplit className="size-5 text-red-500" />,
      status: `${status.length ? Number(status[0].bounsRate).toFixed(2) : 0}%`,
      title: "Bounce rate",
      helperText: "Visits that leaves  without interacting",
    },
  ];

  return (
    <div className="w-full h-fit grid grid-cols-2 gap-4">
      {card.map((statusEl, index) => (
        <div key={index}>
          <div className="p-3 h-32 w-full flex flex-col justify-center items-start rounded-lg shadow-md border">
            <div className="h-fit w-full flex flex-row items-center justify-between text-lg font-semibold">
              {statusEl.title}
              {statusEl.icon}
            </div>
            <div className="text-2xl font-extrabold w-full text-left">
              {statusEl.status}
            </div>
            <CardDescription className="text-base">
              {statusEl.helperText}
            </CardDescription>
          </div>
        </div>
      ))}
    </div>
  );
}
