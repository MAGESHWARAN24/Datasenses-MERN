import React from "react";
// import {useDraggable, useDroppable} from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities";
import {BiGridVertical} from "react-icons/bi";
import {BiSolidTrashAlt} from "react-icons/bi";
import PropertySheet from "./propertysheet/PropertySheet";
import {Card} from "@/components/ui/card";
import {useFormBuilder} from "@/hooks/FormBuilderContext";
import {useSortable} from "@dnd-kit/sortable";
import {TextFieldDropElement, TextFieldSchema} from "./textfield/TextField";
import {TextAreaDropElement, TextAreaSchema} from "./textarea/TextArea";
import {CheckBoxDropElement, CheckBoxSchema} from "./checkbox/CheckBox";
import {DatePickerDropElement, DatePickerSchema} from "./datepicker/DatePicker";
import {RadioDropElement, RadioSchema} from "./radio/Radio";
import {RangeDropElement, RangeSchema} from "./range/Range";
import {SelectDropElement, SelectSchema} from "./select/Select";
export default function ElementWrapper({props, isDrag}) {
  return (
    <>
      {/* <DropArea id={id}> */}
      <DragItem props={props} isDrag={isDrag} />
      {/* </DropArea> */}
    </>
  );
}

// function DropArea({id, children}) {
//   const {setNodeRef} = useDroppable({
//     id: id,
//   });
//   return <div ref={setNodeRef}>{children}</div>;
// }

function DragItem({props, isDrag}) {
  const {Property, id} = props;
  const [Listeners, setListeners] = React.useState(null);
  // const {setNodeRef, transform, attributes, listeners, active} = useDraggable({
  //   id,
  // });
  const {FormElement, Schema} = getElementInfo(Property.Type);
  const {attributes, listeners, setNodeRef, transform, transition} =
    useSortable({id});
  const style = {
    transform: CSS.Translate.toString(transform),
    // transition,
  };
  const {dispatch} = useFormBuilder();
  return (
    !Property.Type.includes("BasicQuestion") && (
      <Card
        ref={setNodeRef}
        style={style}
        {...Listeners}
        {...attributes}
        // className={isDrag && "bg-primary-foreground ring-1 ring-primary"}
      >
        <div className="w-full h-fit flex items-center justify-center p-2 gap-5">
          <BiGridVertical
            onPointerEnter={() => setListeners({...listeners})}
            onPointerLeave={() => setListeners(null)}
            className="size-10"
          />
          {FormElement}
          <PropertySheet Property={Property} Schema={Schema} id={id} />
          <BiSolidTrashAlt
            className="size-8 text-gray-600 hover:text-red-500"
            onClick={() => dispatch({type: "remove", payload: {id}})}
          />
        </div>
      </Card>
    )
  );
}

const getElementInfo = (type) => {
  switch (type) {
    case "TextField":
      return {
        FormElement: <TextFieldDropElement />,
        Schema: TextFieldSchema,
      };
    case "TextArea":
      return {
        FormElement: <TextAreaDropElement />,
        Schema: TextAreaSchema,
      };
    case "CheckBox":
      return {
        FormElement: <CheckBoxDropElement />,
        Schema: CheckBoxSchema,
      };
    case "DatePicker":
      return {
        FormElement: <DatePickerDropElement />,
        Schema: DatePickerSchema,
      };
    case "Radio":
      return {
        FormElement: <RadioDropElement />,
        Schema: RadioSchema,
      };
    case "Range":
      return {
        FormElement: <RangeDropElement />,
        Schema: RangeSchema,
      };
    case "Select":
      return {
        FormElement: <SelectDropElement />,
        Schema: SelectSchema,
      };

    default:
      return {
        FormElement: "",
        Schema: "",
      };
  }
};
