import React from "react";
import TextAreaElement from "../builder/elements/TextAreaElement";
import TextFieldElement from "../builder/elements/TextFieldElement";
import CheckBoxElement from "../builder/elements/CheckBoxElement";
import RadioElement from "../builder/elements/RadioElement";
import SelectElement from "../builder/elements/SelectElement";
import DatepickerElemant from "../builder/elements/DatepickerElemant";
import RangeElement from "../builder/elements/RangeElement";
import {Card} from "@/components/ui/card";
import Logo from "../layout/logo/Logo";
import applicationAPI, {apiPath} from "@/api/applicationAPI";
import {useParams} from "react-router-dom";
import BasicQuestions from "../builder/basicquestions/BasicQuestions";
import {useForm} from "react-hook-form";
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {FaSpinner} from "react-icons/fa";

export default function ResponseForm() {
  const {formName, id} = useParams();
  const [data, setData] = React.useState([]);
  const [name, setName] = React.useState();
  const [loading, startTransiton] = React.useTransition();
  const [submit, setSubmit] = React.useState(false);
  React.useEffect(() => {
    const path = `${apiPath.submit.get}${formName}/${id}`;
    const fetch = async () =>
      (await applicationAPI(path))
        .get()
        .then((response) => {
          if (response.status === 200) {
            setData(response.data.content);
            setName(response.data.name);
          }
        })
        .catch((error) => console.log(error));
    fetch();
  }, []);
  const onSubmit = async (data) => {
    const path = `${apiPath.submit.post}${formName}/${id}`;
    (await applicationAPI(path))
      .post(data)
      .then((response) => {
        console.log(response);
        if (response.status === 203) {
          setSubmit(true);
        }
      })
      .catch((error) => console.log(error));
  };
  const form = useForm();
  return (
    <>
      <header className="w-full h-20">
        <nav className="w-full h-10 fixed flex flex-row justify-between p-5 items-center py-10 backdrop-blur-sm">
          <Logo />
          <div className="text-xl">{name}</div>
        </nav>
      </header>
      {loading ? (
        <>
          <FaSpinner />
        </>
      ) : (
        <>
          {submit ? (
            <>
              <div className="bg-background h-full w-full">
                <div className="min-h-screen bg-background flex flex-col justify-center items-center">
                  <div className="bg-background p-8 rounded-lg shadow-md text-primary shadow-primary">
                    <h2 className="text-2xl font-bold mb-4">
                      Thank you for submitting the form!
                    </h2>
                    <p className="text-gray-700">
                      We have received your submission and will get back to you
                      shortly.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <main className="w-full h-full p-5">
              <Form {...form}>
                <form
                  className="flex flex-col w-full justify-center items-center gap-3"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  {data.map((ele, index) => (
                    <Card key={index} className="w-1/2 h-fit">
                      <ColumnEl props={ele} />
                    </Card>
                  ))}
                  <div className="p-5 w-1/2">
                    <Button className="w-full h-11 text-xl">Submit</Button>
                  </div>
                </form>
              </Form>
            </main>
          )}
        </>
      )}
    </>
  );
}

const ColumnEl = ({props}) => {
  const {Type} = props;
  switch (Type) {
    case "TextField":
      return <TextFieldElement props={props} isSubmit={false} />;
    case "TextArea":
      return <TextAreaElement props={props} isSubmit={false} />;
    case "CheckBox":
      return <CheckBoxElement props={props} isSubmit={false} />;
    case "Radio":
      return <RadioElement props={props} isSubmit={false} />;
    case "Select":
      return <SelectElement props={props} isSubmit={false} />;
    case "Range":
      return <RangeElement props={props} isSubmit={false} />;
    case "DatePicker":
      return <DatepickerElemant props={props} isSubmit={false} />;
    default:
      return <BasicQuestions props={props} isSubmit={false} />;
  }
};
