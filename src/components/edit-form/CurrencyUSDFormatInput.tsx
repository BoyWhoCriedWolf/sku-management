import { InputBaseComponentProps } from "@mui/material";
import React from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

const CurrencyUSDFormatInput = React.forwardRef<NumericFormatProps, InputBaseComponentProps>(function CurrencyFormatInput(props, ref) {
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
						value: values.value,
					},
				} as unknown as React.FormEvent<HTMLInputElement | HTMLTextAreaElement>);
			}}
			thousandSeparator
			valueIsNumericString
			// prefix="$"
		/>
	);
}) as React.ElementType<InputBaseComponentProps>;

export default CurrencyUSDFormatInput;
