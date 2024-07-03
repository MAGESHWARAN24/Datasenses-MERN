import React from "react";
import {useDraggable} from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities";
import {IoMdRadioButtonOn} from "react-icons/io";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Card} from "@/components/ui/card";
import {z} from "zod";

export default function Radio() {
  const {setNodeRef, listeners, attributes, transform} = useDraggable({
    id: "FormElement-Radio",
    data: {
      Type: "Radio",
      Property: {
        Type: "Radio",
        Label: "Label",
        Name: "Name",
        Required: true,
        Options: [{values: "option"}],
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
        <IoMdRadioButtonOn className="size-8" />
        <p>Radio</p>
      </>
    </Card>
  );
}

export const RadioSchema = z
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

export function RadioDropElement() {
  return (
    <div className="w-full h-20 flex items-center justify-center">
      <RadioGroup className="flex items-center justify-center gap-5">
        <RadioGroupItem checked={true} />
        <p>Radio</p>
      </RadioGroup>
    </div>
  );
}
