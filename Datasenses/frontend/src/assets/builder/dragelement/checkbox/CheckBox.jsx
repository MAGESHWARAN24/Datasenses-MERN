import React from "react";
import {useDraggable} from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities";
import {FaRegCheckSquare} from "react-icons/fa";
import {Checkbox} from "@/components/ui/checkbox";
import {Card} from "@/components/ui/card";
import {z} from "zod";

export default function CheckBox() {
  const {setNodeRef, listeners, attributes, transform} = useDraggable({
    id: "FormElement-CheckBox",
    data: {
      Type: "CheckBox",
      Property: {
        Type: "CheckBox",
        Label: "Label",
        Name: "Name",
        Required: true,
        HelperText: "HelperText",
        Header: "Header",
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
        <FaRegCheckSquare className="size-8" />
        <p>CheckBox</p>
      </>
    </Card>
  );
}

export const CheckBoxSchema = z
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
    Required: z.boolean().default(true),
    HelperText: z.string().optional(),
  })
  .refine(({Header, Name}) => Header === Name, {
    message: "Header & Name must be same",
    path: ["Header"],
  });

export function CheckBoxDropElement() {
  return (
    <div className="w-full h-20 flex items-center justify-center gap-5">
      <Checkbox checked={true} />
      <p>CheckBox</p>
    </div>
  );
}
