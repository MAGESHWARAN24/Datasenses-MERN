import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {MdSettings} from "react-icons/md";
import {useForm, useFieldArray} from "react-hook-form";
import {CiSquarePlus} from "react-icons/ci";
import {MdDeleteForever} from "react-icons/md";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Switch} from "@/components/ui/switch";
import {Separator} from "@/components/ui/separator";
import {useFormBuilder} from "@/hooks/FormBuilderContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "@/components/ui/use-toast";
import { IoMdAddCircle } from "react-icons/io";

export default function PropertySheet({Property, Schema, id}) {
  const defaultValues = React.useMemo(() => Property);
  const schema = React.useMemo(() => Schema);
  const propertyForm = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });
  const subPropertyDefaultValues = React.useMemo(() => Property?.Options);
  const subPropertyForm = useFieldArray({
    defaultValues: subPropertyDefaultValues,
    name: "Options",
    control: propertyForm.control,
  });
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = propertyForm;
  const {fields, append, remove} = subPropertyForm;
  const {dispatch} = useFormBuilder();
  const onApply = (data) => {
    dispatch({type: "update", payload: {id: id, data: data}});
    toast({
      title: "Update Properties",
      description: "Form Element Update Successfully",
    });
  };
  return (
    <Sheet>
      <SheetTrigger>
        <MdSettings className="size-8 text-gray-700" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Element Property</SheetTitle>
          <Separator />
        </SheetHeader>
        <Form {...propertyForm}>
          <form
            onSubmit={handleSubmit(onApply)}
            className="flex flex-col gap-3"
          >
            {Object.entries(defaultValues).map(
              (formEl, i) =>
                formEl[0] != "Type" &&
                formEl[0] != "Schema" &&
                formEl[0] != "Options" &&
                formEl[0] != "Mode" && (
                  <FormField
                    key={i}
                    name={formEl[0]}
                    control={control}
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>
                          {formEl[0].toLocaleUpperCase() + " *"}
                        </FormLabel>
                        <FormControl>
                          {formEl[0] != "Required" ? (
                            <Input
                              {...field}
                              value={field.value}
                              onChange={field.onChange}
                            />
                          ) : (
                            <div>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </div>
                          )}
                        </FormControl>
                        {<FormMessage /> || errors?.Step.message}
                      </FormItem>
                    )}
                  />
                )
            )}
            {Property?.Mode && (
              <>
                <FormField
                  name="Mode"
                  control={control}
                  render={({field}) => (
                    <FormItem>
                      <FormLabel className="">SELECT MODE</FormLabel>
                      <Select
                        defaultValue="signle"
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="single">Single</SelectItem>
                          <SelectItem value="range">Range</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </>
            )}
            {subPropertyDefaultValues && (
              <div>
                <FormLabel className="flex text-xl justify-between items-center flex-row">
                  Options:{" "}
                  <CiSquarePlus
                    className="size-10"
                    onClick={() => append({values: `options ${fields.length}`})}
                  />
                </FormLabel>
                <ScrollArea className=" h-40 flex flex-col gap-5 items-center justify-center">
                  {fields.map((subEl, i) => (
                    <FormField
                      key={subEl.id}
                      name={`Options.${i}.values`}
                      render={({field}) => (
                        <FormItem>
                          <FormControl>
                            <div className="w-full flex flex-grow flex-row items-center justify-center gap-5 p-2">
                              <div className="flex flex-col items-center text-left w-full">
                                <Input
                                  {...field}
                                  value={field.value}
                                  onChange={field.onChange}
                                />
                                <FormMessage className="text-xs" />
                              </div>
                              <Button
                                variant="outline"
                                disabled={i === 0 ? true : false}
                                onClick={() => remove(i)}
                              >
                                <MdDeleteForever className="size-10 text-red-500" />
                              </Button>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}
                </ScrollArea>
              </div>
            )}
            <Button>Apply</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
