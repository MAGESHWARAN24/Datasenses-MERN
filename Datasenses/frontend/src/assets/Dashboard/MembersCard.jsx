import React from "react";
import {Card, CardContent, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export default function MembersCard(props) {
  return (
    <>
      <div className="h-10">
        <h1 className="text-xl font-bold fixed backdrop-blur-sm">Members</h1>
      </div>
      <div className="h-full w-full flex flex-col gap-2 items-center justify-center">
        {props.props.map((cardEl, index) => (
          <Card
            key={index}
            className="h-14 w-full flex items-center justify-center p-3"
          >
            <div className="h-full w-full flex flex-row items-center justify-between">
              <CardTitle className="h-10 w-1/2 flex flex-row items-center gap-5">
                <Avatar>
                  <AvatarFallback>UI</AvatarFallback>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
                {cardEl.name}
              </CardTitle>
              <Badge className="text-center">{cardEl.role}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
