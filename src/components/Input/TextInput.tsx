import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control } from "react-hook-form";

type TextInputProps = {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  control?: Control<any> | undefined;
};

export const TextInput = ({
  label,
  name,
  type,
  placeholder,
  control,
}: TextInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={"relative flex flex-1 flex-col gap-2"}>
          <FormLabel
            className={
              'absolute -top-2.5 left-3 line-clamp-1 bg-white text-sm after:text-red-600 after:content-["*"]'
            }
            htmlFor={name}
          >
            {label}
          </FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder || label}
              {...field}
              type={type}
              className={"rounded border border-black p-3.5"}
            />
          </FormControl>
          <FormMessage className={"text-sm font-light"} />
        </FormItem>
      )}
    />
  );
};
