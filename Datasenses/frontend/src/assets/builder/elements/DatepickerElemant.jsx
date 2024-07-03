import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {useFormContext} from "react-hook-form";
import {Datepicker} from "@/components/ui/datepicker";
import {useFormBuilder} from "@/hooks/FormBuilderContext";

export default function DatepickerElemant({props, id, isSubmit}) {
  const {isPreview} = useFormBuilder();
  const {control} = useFormContext();
  const {Name, Label, Required, HelperText, Mode} = React.useMemo(() => props);
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
              <Datepicker
                mode={Mode}
                select={field.value}
                onSelect={field.onChange}
                placeholder={Label}
              />
              <FormMessage />
              <FormDescription className="text-sm px-2">
                {HelperText}
              </FormDescription>
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
