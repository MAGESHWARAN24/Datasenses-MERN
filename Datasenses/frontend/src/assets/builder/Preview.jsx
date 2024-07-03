import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {useFormBuilder} from "@/hooks/FormBuilderContext";
import {Form} from "@/components/ui/form";
import TextFieldElement from "./elements/TextFieldElement";
import {useForm} from "react-hook-form";
import TextAreaElement from "./elements/TextAreaElement";
import CheckBoxElement from "./elements/CheckBoxElement";
import RadioElement from "./elements/RadioElement";
import SelectElement from "./elements/SelectElement";
import RangeElement from "./elements/RangeElement";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Button} from "@/components/ui/button";
import DatepickerElemant from "./elements/DatepickerElemant";
import BasicQuestions from "./basicquestions/BasicQuestions";

export default function Preview() {
  const {formElements} = useFormBuilder();
  const element = React.useMemo(() => formElements);
  const form = useForm();

  const {handleSubmit} = form;
  return (
    <main className="w-full h-full p-5 flex items-center justify-center">
      <Card className="w-full h-full">
        <Form {...form}>
          <form
            onSubmit={handleSubmit((val) => console.log(val))}
            className="h-full w-full flex flex-col items-center"
          >
            <ScrollArea className="h-full w-full">
              <CardHeader>
                <CardTitle>Form Preview</CardTitle>
                <CardDescription>
                  This is how your from will look like to your users and we
                  provide a mandatory question,{" "}
                  <span className="font-bold text-md">
                    You cann't edit the mandatory questions
                  </span>
                </CardDescription>
              </CardHeader>
              {element.map((column, index) => {
                return <ColumnEl props={column} key={index} />;
              })}
              <CardFooter>
                <Button>Check validation</Button>
              </CardFooter>
            </ScrollArea>
          </form>
        </Form>
      </Card>
    </main>
  );
}

const ColumnEl = ({props}) => {
  const {id, Property} = props;
  switch (Property.Type) {
    case "TextField":
      return <TextFieldElement props={Property} id={id} />;
    case "TextArea":
      return <TextAreaElement props={Property} id={id} />;
    case "CheckBox":
      return <CheckBoxElement props={Property} id={id} />;
    case "Radio":
      return <RadioElement props={Property} id={id} />;
    case "Select":
      return <SelectElement props={Property} id={id} />;
    case "Range":
      return <RangeElement props={Property} id={id} />;
    case "DatePicker":
      return <DatepickerElemant props={Property} id={id} />;
    default:
      return <BasicQuestions props={Property} />;
  }
};
