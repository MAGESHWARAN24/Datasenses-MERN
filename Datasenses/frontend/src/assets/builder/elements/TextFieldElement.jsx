import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useFormBuilder} from "@/hooks/FormBuilderContext";
import React from "react";
import {useFormContext} from "react-hook-form";

export default function TextFieldElement({props, id, isSubmit}) {
  const {isPreview} = useFormBuilder();
  const {control} = useFormContext();
  const {Name, Label, Placeholder, Required, HelperText} = React.useMemo(
    () => props
  );
  return (
    <FormField
      name={isSubmit ? props?.Id : isPreview ? id : Name}
      control={control}
      rules={{required: Required}}
      render={({field}) => (
        <FormItem>
          <FormControl>
            <div className="flex flex-col gap-3 text-left p-5">
              <FormLabel className="text-lg">
                {Label}
                {Required ? "*" : ""}
              </FormLabel>
              <Input
                {...field}
                placeholder={Placeholder}
                value={field.value}
                onChange={field.onChange}
              />
              <FormDescription className="text-sm px-2">
                {HelperText}
              </FormDescription>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
