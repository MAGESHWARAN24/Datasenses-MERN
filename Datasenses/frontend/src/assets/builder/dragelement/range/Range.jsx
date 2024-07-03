import React from "react";
import {RxSlider} from "react-icons/rx";
import {useDraggable} from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities";
import {Slider} from "@/components/ui/slider";
import {Card} from "@/components/ui/card";
import {z} from "zod";
export default function Range() {
  const {setNodeRef, listeners, attributes, transform} = useDraggable({
    id: "FormElement-Range",
    data: {
      Type: "Range",
      Property: {
        Type: "Range",
        Label: "Label",
        Name: "Name",
        Step: "1",
        DefaultValue: "0",
        Max: "10",
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
        <RxSlider className="size-8" />
        <p>Range</p>
      </>
    </Card>
  );
}

export const RangeSchema = z
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
    Step: z
      .string()
      .nonempty({message: "Required"})
      .regex(/^[0-9]+$/, {message: "Step contains only number"})
      .transform((val) => parseInt(val.trim()))
      .pipe(
        z.number().nonnegative({
          message: "Step must be greater than 0",
        })
      ),
    DefaultValue: z
      .string()
      .nonempty({message: "Required"})
      .regex(/^[0-9]+$/, {message: "Step contains only number"})
      .transform((val) => parseInt(val.trim()))
      .pipe(
        z.number().nonnegative({
          message: "Default must be greater than 0",
        })
      ),
    Max: z
      .string()
      .nonempty({message: "Required"})
      .regex(/^[0-9]+$/, {message: "Step contains only number"})
      .transform((val) => parseInt(val.trim()))
      .pipe(
        z.number().nonnegative({
          message: "Max must be greater than 0",
        })
      ),
  })
  .refine(({Header, Name}) => Header === Name, {
    message: "Header & Name must be same",
    path: ["Header"],
  });

export function RangeDropElement() {
  return (
    <div className="w-full h-20 flex items-center justify-center">
      <Slider defaultValue={[50]} />
    </div>
  );
}
