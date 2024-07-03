import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {MdOutlinePublish} from "react-icons/md";
import applicationAPI, {apiPath} from "@/api/applicationAPI";
import {useNavigate, useParams} from "react-router-dom";
import {Button} from "@/components/ui/button";
export default function FormPublishBtn() {
  const navigate = useNavigate();
  const {id} = useParams();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"outline"}
          className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400"
        >
          <MdOutlinePublish className="h-4 w-4" />
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action can no be undone.After publishing you will not able to
            edit this form.
            <br />
            <span className="font-medium">
              By publishing this form you will make it available to the public
              and you will be able to collect submissions.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async (e) => {
              e.preventDefault();
              const path = `${apiPath.form.publish}${id}`;
              (await applicationAPI(path))
                .put("")
                .then((response) => {
                  if (response.status === 203) {
                    navigate("/forms");
                  }
                })
                .catch((error) => console.log(error));
            }}
          >
            Proceed
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
