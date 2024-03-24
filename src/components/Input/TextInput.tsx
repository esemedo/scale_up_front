import { ErrorMessage, Field } from "formik";
import { Input } from "@/components/ui/input";

type TextInputProps = {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
};

export const TextInput = ({
  label,
  name,
  type,
  placeholder,
}: TextInputProps) => {
  return (
    <div className={"relative flex flex-1 flex-col gap-2"}>
      <label
        className={
          'absolute -top-2.5 left-3 bg-white px-1 text-sm after:text-red-600 after:content-["*"]'
        }
        htmlFor={name}
      >
        {label}
      </label>
      <Field
        className={"rounded border border-black p-3.5"}
        type={type}
        id={name}
        name={name}
        placeholder={placeholder || label}
      />
      <Input className={"rounded border border-black p-3.5"} />
      <ErrorMessage
        className={"text-sm font-normal italic text-red-600"}
        component={"span"}
        name={name}
      />
    </div>
  );
};
