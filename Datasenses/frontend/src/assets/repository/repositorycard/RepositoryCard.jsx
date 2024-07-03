import React from "react";
import {FaFolder} from "react-icons/fa6";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {BsClock} from "react-icons/bs";
import {FaWpforms} from "react-icons/fa";
import {Badge} from "@/components/ui/badge";
import {Link} from "react-router-dom";
import {formatDistance} from "date-fns";
import {FaRegEdit} from "react-icons/fa";
export default function RepositoryCard({props}) {
  const {form_name, createAt, published, _id, description} = React.useMemo(
    () => props
  );
  return (
    <div className="h-fit w-full p-2 flex items-center justify-center">
      <Card className="w-full h-fit">
        <CardHeader>
          <CardTitle className="flex flex-row items-center justify-between gap-5">
            <div className="flex flex-row items-center gap-1">
              <FaFolder />
              <span>{form_name}</span>
            </div>
            <Badge
              variant={published ? "" : "destructive"}
              className="size-fit"
            >
              {published ? "Published" : "Draft"}
            </Badge>
          </CardTitle>
          <CardDescription className="text-wrap flex flex-col justify-center">
            <span className="flex items-center justify-between">
              {formatDistance(createAt, new Date(), {addSuffix: true})}
              <span className="flex flex-row gap-1 px-2">
                <BsClock />
                <FaWpforms />
              </span>
            </span>
            <span>{description ? description : "No Description"}</span>
          </CardDescription>
        </CardHeader>
        <CardFooter>
          {published ? (
            <Link
              to={`/repository/${_id}`}
              className="text-lg w-full h-10 font-bold text-end"
            >
              view response
            </Link>
          ) : (
            <Link
              to={`/forms/builder/${_id}`}
              className="text-lg w-full h-10 font-semibold flex flex-row items-center gap-2 justify-end"
            >
              <FaRegEdit />
              Edit
            </Link>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
