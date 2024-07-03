import React from "react";
import TextField from "./dragelement/textfield/TextField";
import TextArea from "./dragelement/textarea/TextArea";
import CheckBox from "./dragelement/checkbox/CheckBox";
import Radio from "./dragelement/radio/Radio";
import SelectItems from "./dragelement/select/Select";
import Range from "./dragelement/range/Range";
import DatePicker from "./dragelement/datepicker/DatePicker";

export default function DragArea() {
  return (
    <div className="h-full w-full">
      <div className="w-full h-full flex flex-col items-center gap-3 p-5">
        <TextField />
        <TextArea />
        <CheckBox />
        <Radio />
        <SelectItems />
        <Range />
        <DatePicker />
      </div>
    </div>
  );
}
