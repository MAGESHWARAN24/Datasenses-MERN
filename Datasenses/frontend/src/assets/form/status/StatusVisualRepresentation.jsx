import React from "react";
import {AgChartsReact} from "ag-charts-react";
import {Card} from "@/components/ui/card";
import {useAppContext} from "@/hooks/AppContext";
export default function StatusVisualRepresentation() {
  const {data} = useAppContext();
  const status = React.useMemo(() => data.forms.Status);
  const report = [
    {
      title: "Visits",
      status: status.length ? status[0].visits : 0,
    },
    {
      title: "Submission",
      status: status.length ? status[0].submissions : 0,
    },
    {
      title: "Submission Rate",
      status: status.length ? status[0].submissionsRate : 0,
    },
    {
      title: "Bouns Rate",
      status: status.length ? status[0].bounsRate : 0,
    },
  ];

  const options = {
    title: {
      text: "Form Response Report",
    },
    series: [
      {
        data: report,
        type: "bar",
        xKey: "title",
        yKey: "status",
      },
      {
        data: report,
        type: "line",
        xKey: "title",
        yKey: "status",
      },
    ],
    legend: {
      enabled: false,
    },
  };
  return <AgChartsReact options={options} />;
}
