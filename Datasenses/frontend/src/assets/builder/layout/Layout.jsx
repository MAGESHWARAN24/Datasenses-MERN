import React from "react";
import {MdPreview} from "react-icons/md";
import {MdOutlinePublish} from "react-icons/md";
import {HiOutlineSaveAs} from "react-icons/hi";
import {Separator} from "@/components/ui/separator";
import {useFormBuilder} from "@/hooks/FormBuilderContext";
import {Button} from "@/components/ui/button";
import Preview from "../Preview";
import {FaEdit} from "react-icons/fa";
import applicationAPI, {apiPath} from "@/api/applicationAPI";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "@/components/ui/use-toast";
import FormPublishBtn from "./FormPublishBtn";

export default function Layout({children}) {
  const {isPreview, setIsPreview} = useFormBuilder();
  const {formElements} = useFormBuilder();
  const {id} = useParams();
  const navigate = useNavigate();
  const menuItem = [
    {
      value: "Save",
      icon: <HiOutlineSaveAs />,
      action: async () => {
        const data = formElements.map((ele) => {
          const {
            Header,
            HelperText,
            Label,
            Name,
            Placeholder,
            Required,
            Type,
            Mode,
            Options,
            Step,
            DefaultValue,
            Max,
          } = ele.Property;
          return {
            Id: ele.id,
            Header,
            HelperText,
            Label,
            Name,
            Placeholder,
            Required,
            Type,
            Mode,
            Options,
            Step,
            DefaultValue,
            Max,
          };
        });
        const path = `${apiPath.form.save}${id}`;
        (await applicationAPI(path))
          .patch(data)
          .then((response) => {
            if (response.status === 200) {
              toast({
                title: "Form",
                description: "Form structure successfully",
              });
            }
          })
          .catch((error) => console.log(error));
      },
    },
    {
      value: isPreview ? "Edit" : "Preview",
      icon: isPreview ? <FaEdit /> : <MdPreview />,
      action: () => setIsPreview((pre) => !pre),
    },
  ];
  return (
    <>
      <div className="h-full w-full">
        <nav className="h-[5%] w-full flex items-center justify-between p-5">
          <div className="text-xl">Form</div>
          <div className="w-fit h-10 flex items-center justify-center gap-3">
            {menuItem.map((e, i) => (
              <Button variant="outline" onClick={e.action} key={i}>
                {e.icon}
                {e.value}
              </Button>
            ))}
            <FormPublishBtn />
          </div>
        </nav>
        <Separator />
        <div className="w-full h-[94%]">
          {isPreview ? <Preview /> : <>{children}</>}
        </div>
      </div>
    </>
  );
}
