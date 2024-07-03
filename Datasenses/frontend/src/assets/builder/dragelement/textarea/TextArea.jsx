import React from "react";
import {BsTextareaResize} from "react-icons/bs";
import {useDraggable} from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities";
import {Textarea} from "@/components/ui/textarea";
import {Card} from "@/components/ui/card";
import {z} from "zod";

export default function TextArea() {
  const {setNodeRef, listeners, attributes, transform, active} = useDraggable({
    id: "FormElement-TextArea",
    data: {
      Type: "TextArea",
      Property: {
        Type: "TextArea",
        Label: "Label",
        Name: "Name",
        Placeholder: "Placeholder",
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
    <>
      <Card
        className="size-20 flex items-center justify-center flex-col bg-white"
        ref={setNodeRef}
        {...listeners}
        style={style}
        {...attributes}
      >
        <>
          <BsTextareaResize className="size-8" />
          <p>TextArea</p>
        </>
      </Card>
    </>
  );
}

export const TextAreaSchema = z
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
  })
  .refine(({Header, Name}) => Header === Name, {
    message: "Header & Name must be same",
    path: ["Header"],
  });

export function TextAreaDropElement() {
  return (
    <div className="w-full h-20 flex items-center justify-center">
      <Textarea readOnly placeholder="TextArea" />
    </div>
  );
}
