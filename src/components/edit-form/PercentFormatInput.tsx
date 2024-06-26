import { InputBaseComponentProps } from "@mui/material";
import React from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

const PercentFormatInput = React.forwardRef<
  NumericFormatProps,
  InputBaseComponentProps
>(function PercentFormatInput(props, ref) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onChange = () => null, defaultValue, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: Math.min(100, Math.max(0, Number(values.value))),
          },
        } as unknown as React.FormEvent<HTMLInputElement | HTMLTextAreaElement>);
      }}
      thousandSeparator
      valueIsNumericString
      decimalScale={2}
      suffix="%"
    />
  );
}) as React.ElementType<InputBaseComponentProps>;

export default PercentFormatInput;
