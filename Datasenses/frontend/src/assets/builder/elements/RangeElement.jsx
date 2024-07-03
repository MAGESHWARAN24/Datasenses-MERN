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
import {Slider} from "@/components/ui/slider";
import {useFormBuilder} from "@/hooks/FormBuilderContext";

export default function RangeElement({props, id, isSubmit}) {
  const {isPreview} = useFormBuilder();
  const {control} = useFormContext();
  const {Name, Label, Required, HelperText, Step, DefaultValue, Max} =
    React.useMemo(() => props);
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
                {Label}-{field.value || DefaultValue}
                {Required ? "*" : ""}
              </FormLabel>
              <Slider
                defaultValue={[field.value || DefaultValue]}
                max={Max}
                step={Step}
                {...field}
                onValueChange={field.onChange}
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
