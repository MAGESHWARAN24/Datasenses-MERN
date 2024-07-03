import React from "react";
import {useDraggable} from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities";
import {IoCalendarSharp} from "react-icons/io5";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {z} from "zod";

export default function DatePicker() {
  const {setNodeRef, listeners, attributes, transform} = useDraggable({
    id: "FormElement-DatePicker",
    data: {
      Type: "DatePicker",
      Property: {
        Type: "DatePicker",
        Label: "Label",
        Name: "Name",
        Mode: "single",
        Required: true,
        HelperText: "HelperText",
        Header: "header",
      },
    },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <Card
      className="size-20 flex items-center justify-center flex-col bg-white"
      ref={setNodeRef}
      {...listeners}
      style={style}
      {...attributes}
    >
      <>
        <IoCalendarSharp className="size-8" />
        <p>DatePicker</p>
      </>
    </Card>
  );
}

export const DatePickerSchema = z
  .object({
    Type: z.string(),
    Name: z.string().nonempty({
      message: "Required",
    }),
    Label: z.string().nonempty({
      message: "Required",
    }),
    Header: z.string().nonempty({
      message: "Required",
    }),
    Mode: z.string(),
    Required: z.boolean().default(true),
    HelperText: z.string().optional(),
  })
  .refine(({Header, Name}) => Header === Name, {
    message: "Header & Name must be same",
    path: ["Header"],
  });

export function DatePickerDropElement() {
  return (
    <div className="w-full h-20 flex items-center justify-center">
      <Button
        variant="outline"
        className="w-full h-10 justify-evenly items-center"
      >
        <p>DatePicker</p>
        <IoCalendarSharp className="size-5" />
      </Button>
    </div>
  );
}
