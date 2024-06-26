import { InputBaseComponentProps } from "@mui/material";
import React from "react";
import { IMaskInput } from "react-imask";

const PhoneFormatInput = React.forwardRef<
  HTMLInputElement,
  InputBaseComponentProps
>(function CurrencyFormatInput(props, ref) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onChange = () => null, defaultValue, ...other } = props;

  return (
    <IMaskInput
      {...other}
      mask="+(#0) 000-000-000"
      definitions={{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        "#": { mask: /[1-9]/ } as any,
      }}
      inputRef={ref}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onAccept={(value: any) =>
        onChange({
          target: { name: props.name, value },
        } as unknown as React.FormEvent<HTMLInputElement | HTMLTextAreaElement>)
      }
      overwrite
    />
  );
}) as React.ElementType<InputBaseComponentProps>;

export default PhoneFormatInput;
