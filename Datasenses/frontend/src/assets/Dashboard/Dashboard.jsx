import React from "react";
import MembersCard from "./MembersCard";
import {ScrollArea} from "@/components/ui/scroll-area";
import applicationAPI from "@/api/applicationAPI";
import {AgChartsReact} from "ag-charts-react";

export default function Dashboard() {
  const [members, setMembers] = React.useState([]);
  const [reports, setReports] = React.useState({});
  const [options, setOptions] = React.useState({});
  React.useEffect(() => {
    const fetch = async () => {
      (await applicationAPI("dashboard"))
        .fetch()
        .then((response) => {
          if (response.status === 200) {
            const {members} = response.data;
            const data = response.data.report.map((ele) => {
              const {content} = ele;
              return content;
            });
            console.log(response.data.rep);
            setMembers(members);
            setOptions({
              data: data,
              title: {
                text: "Reacorded vulnerability",
              },
              footnote: {
                text: "This will show what type of vulnerability occurred and its effects on records",
              },
              series: [
                {
                  type: "bar",
                  xKey: "breach_type",
                  yKey: "affected_count",
                },
              ],
            });
            setReports({
              data: response.data.rep,
              title: {
                text: "Monthly Reported",
              },
              footnote: {
                text: "This will show what type of vulnerability occurred and its effects on records",
              },
              series: [
                {
                  type: "bar",
                  xKey: "month_name",
                  yKey: "total_affected_count",
                  yName: "Reported response each month",
                },
                {
                  type: "line",
                  xKey: "month_name",
                  yKey: "total_affected_count",
                  yName: "Affected Records",
                },
              ],
            });
          }
        })
        .catch((error) => console.log(error));
    };
    fetch();
  }, []);
  return (
    <main className="w-full h-full flex flex-col p-3">
      <div className="h-1/2 w-full grid grid-cols-2 gap-5">
        <AgChartsReact options={options} />
        <AgChartsReact options={reports} />
        {/* <StatusReport /> */}
      </div>
      <div className="h-1/2 w-full grid grid-cols-2 gap-5">
        <ScrollArea className="w-full h-full flex flex-col items-center justify-around gap-5">
          <MembersCard props={members} />
        </ScrollArea>
        <div>
          <h1>Achievement</h1>
        </div>
      </div>
    </main>
  );
}
