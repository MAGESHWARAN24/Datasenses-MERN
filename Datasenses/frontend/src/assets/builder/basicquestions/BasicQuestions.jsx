import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useFormContext} from "react-hook-form";
import {Datepicker} from "@/components/ui/datepicker";

export default function BasicQuestions({props, isSubmit}) {
  const {HelperText, Label, Name, Placeholder, Type} = React.useMemo(
    () => props
  );
  const {control} = useFormContext();
  return (
    <>
      <FormField
        name={isSubmit ? props?.Id : Name}
        control={control}
        rules={{required: true}}
        render={({field}) => (
          <FormItem>
            <FormControl>
              <div className="flex flex-col gap-3 text-left p-5">
                <FormLabel className="text-lg">
                  {Label}
                  {"*"}
                </FormLabel>
                {Type.includes("Date") ? (
                  <>
                    <Datepicker
                      mode="single"
                      select={field.value}
                      onSelect={field.onChange}
                      placeholder={Placeholder}
                    />
                    <FormDescription className="text-sm px-2">
                      {HelperText}
                    </FormDescription>
                  </>
                ) : (
                  <>
                    <Input
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={Placeholder}
                      {...field}
                    />
                    <FormDescription className="text-sm px-2">
                      {HelperText}
                    </FormDescription>
                  </>
                )}
              </div>
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
}
