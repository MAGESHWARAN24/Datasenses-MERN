import React from "react";
import {useDraggable} from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities";
import {CgSelectR} from "react-icons/cg";
import {Select, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Card} from "@/components/ui/card";
import {z} from "zod";
export default function SelectItems() {
  const {setNodeRef, listeners, attributes, transform} = useDraggable({
    id: "FormElement-Select",
    data: {
      Type: "Select",
      Property: {
        Type: "Select",
        Label: "Label",
        Name: "Name",
        Placeholder: "Placeholder",
        Options: [{values: "Option"}],
        HelperText: "HelperText",
        Required: true,
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
        <CgSelectR className="size-8" />
        <p>Select</p>
      </>
    </Card>
  );
}

export const SelectSchema = z
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
    Placeholder: z.string().optional(),
    Required: z.boolean().default(true),
    HelperText: z.string().optional(),
    Options: z.array(
      z.object({
        values: z.string().nonempty(),
      })
    ),
  })
  .refine(({Header, Name}) => Header === Name, {
    message: "Header & Name must be same",
    path: ["Header"],
  });

export function SelectDropElement() {
  return (
    <div className="w-full h-20 flex items-center justify-center">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
      </Select>
    </div>
  );
}
