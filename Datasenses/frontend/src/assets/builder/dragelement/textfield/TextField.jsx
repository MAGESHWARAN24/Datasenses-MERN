import React from "react";
import {useDraggable} from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities";
import {LuTextCursorInput} from "react-icons/lu";
import {Input} from "@/components/ui/input";
import {Card} from "@/components/ui/card";
import {z} from "zod";
export default function TextField() {
  const {setNodeRef, listeners, attributes, transform} = useDraggable({
    id: "FormElement-TextField",
    data: {
      Type: "TextField",
      Property: {
        Type: "TextField",
        Label: "Label",
        Name: "Name",
        Placeholder: "Placeholder",
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
    <>
      <Card
        className="size-20 flex items-center justify-center flex-col bg-white"
        ref={setNodeRef}
        {...listeners}
        style={style}
        {...attributes}
      >
        <>
          <LuTextCursorInput className="size-8" />
          <p>TextField</p>
        </>
      </Card>
    </>
  );
}

export function TextFieldDropElement() {
  return (
    <div className="w-full h-20 flex items-center justify-center">
      <Input readOnly placeholder="TextField" />
    </div>
  );
}

export const TextFieldSchema = z
  .object({
    Type: z.string(),
    Name: z.string().nonempty({
      message: "Required",
    }),
    Label: z.string().nonempty({
      message: "Required",
    }),
    Placeholder: z.string().optional(),
    Required: z.boolean().default(true),
    HelperText: z.string().optional(),
    Header: z.string().nonempty({
      message: "Required",
    }),
  })
  .refine(({Header, Name}) => Header === Name, {
    message: "Header & Name must be same",
    path: ["Header"],
  });
