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
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {useFormBuilder} from "@/hooks/FormBuilderContext";

export default function RadioElement({props, id, isSubmit}) {
  const {isPreview} = useFormBuilder();
  const {control} = useFormContext();
  const {Name, Label, Required, HelperText, Options} = React.useMemo(
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
              {
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {Options.map((radio, index) => (
                    <FormItem key={index}>
                      <FormControl>
                        <div className="flex items-center flex-row gap-5 size-fit px-5">
                          <RadioGroupItem value={radio.values} />
                          <FormLabel className="text-base">
                            {radio.values}
                          </FormLabel>
                        </div>
                      </FormControl>
                    </FormItem>
                  ))}
                </RadioGroup>
              }
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
