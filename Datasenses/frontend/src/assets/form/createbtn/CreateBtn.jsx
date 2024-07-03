import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import {FloatingLabelInput} from "@/components/ui/floating-label-input";
import applicationAPI, {apiPath} from "@/api/applicationAPI";
import {toast} from "@/components/ui/use-toast";
import {useNavigate} from "react-router-dom";

const formSchema = z.object({
  form_name: z.string(),
  description: z.string().optional(),
});

export default function CreateBtn() {
  const createForm = useForm({
    resolver: zodResolver(formSchema),
  });
  const navigate = useNavigate();
  const {control, handleSubmit} = createForm;
  const onSubmit = async (data) => {
    (await applicationAPI(apiPath.form.create))
      .post(data)
      .then((response) => {
        if (response.status === 201) {
          toast({
            title: "Form create",
            description: "Form created successfully",
          });
        }
        navigate(0);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Dialog>
        <DialogTrigger className="text-lg border h-fit w-52 p-2 rounded-lg hover:bg-primary-foreground">
          Create Application
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create form</DialogTitle>
            <DialogDescription>
              Create a new form to start collecting reponses
            </DialogDescription>
          </DialogHeader>
          <Form {...createForm}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                name="form_name"
                control={control}
                rules={{required: true}}
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        label={<FormLabel>Name</FormLabel>}
                        onChange={field.onChange}
                        className="h-14"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="description"
                control={control}
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        onChange={field.onChange}
                        placeholder="Desciption"
                        rows={10}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="w-full h-10">Create</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
