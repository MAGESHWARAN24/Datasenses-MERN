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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {useFormBuilder} from "@/hooks/FormBuilderContext";

export default function SelectElement({props, id, isSubmit}) {
  const {isPreview} = useFormBuilder();
  const {control} = useFormContext();
  const {Name, Label, Required, HelperText, Placeholder, Options} =
    React.useMemo(() => props);
  return (
    <FormField
      name={isSubmit ? props?.Id : isPreview ? id : Name}
      control={control}
      rules={{required: Required}}
      render={({field}) => (
        <FormItem>
          <div className="flex flex-col gap-3 text-left p-5">
            <FormLabel className="text-xl">
              {Label} {Required ? "*" : ""}
            </FormLabel>
            <Select defaultValue={field.value} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={Placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Options.map((item, index) => (
                  <SelectItem key={index} value={item.values}>
                    {item.values}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription className="text-sm px-2">
              {HelperText}
            </FormDescription>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
