import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Checkbox} from "@/components/ui/checkbox";
import {useFormContext} from "react-hook-form";
import {useFormBuilder} from "@/hooks/FormBuilderContext";

export default function CheckBoxElement({props, id, isSubmit}) {
  const {isPreview} = useFormBuilder();
  const {control} = useFormContext();
  const {Name, Label, Required, HelperText} = React.useMemo(() => props);
  return (
    <FormField
      name={isSubmit ? props?.Id : isPreview ? id : Name}
      control={control}
      rules={{required: Required}}
      render={({field}) => (
        <FormItem>
          <FormControl>
            <div className="flex flex-col gap-3 text-left p-5">
              <div className="w-full h-10 flex flex-row items-center gap-5">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <FormLabel className="text-lg">
                  {Label} {Required ? "*" : ""}
                </FormLabel>
              </div>
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
