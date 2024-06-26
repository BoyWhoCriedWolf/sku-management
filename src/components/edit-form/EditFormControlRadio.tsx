/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, {
  FC,
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DispatchFunction, StaticField } from "types/ui-types";

const EditFormControlRadio: FC<
  PropsWithChildren<{
    field?: Partial<StaticField>;
    readOnly?: boolean;
    value?: string | any;
    onChange?: DispatchFunction<any>;
    onClick?: (value?: Partial<StaticField>) => void;
    onBlur?: () => void;
    isLabel?: boolean;
    autoFocus?: boolean;
    defaultOptionLabel?: string;
    isValid?: boolean;
    defaultDisplayValue?: string;
  }>
> = ({
  field = {} as StaticField,
  readOnly = false,
  value: propsValue,
  onChange = () => null,
  onClick = () => null,
  onBlur = () => null,
  isLabel = true,
  autoFocus = false,
  defaultOptionLabel = "",
  isValid: propsIsValid = true,
  defaultDisplayValue = "",
}) => {
  const ref = useRef<HTMLInputElement>(null);

  const errorMessage = useMemo(
    () => field.errorMessage ?? "This field is required",
    [field.errorMessage]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getOptionLabel =
    field.getOptionLabel ??
    ((option: any) =>
      typeof option === "string" ? option : option?.displayName ?? "");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getOptionValue = field.getOptionValue ?? ((option: any) => option);

  const [options, setOptions] = useState<Array<any>>([]);
  const [isValid, setIsValid] = useState(true);

  const label = useMemo(() => field?.displayName ?? "", [field.displayName]);
  const insideValue = useMemo(() => {
    const gotPropsValue =
      typeof propsValue === "string" || typeof propsValue === "number"
        ? propsValue
        : getOptionValue(propsValue);
    const tValue =
      typeof gotPropsValue === "string" || typeof gotPropsValue === "number"
        ? gotPropsValue
        : propsValue?.id ?? propsValue?._id;

    return tValue;
  }, [getOptionValue, propsValue]);

  const value = useMemo(() => {
    if (
      readOnly &&
      propsValue &&
      !(typeof propsValue === "string") &&
      !(typeof propsValue === "number")
    ) {
      return propsValue;
    }

    const tValue = insideValue;

    return (options ?? []).find((option) => {
      const gotOptionValue =
        typeof option === "string" || typeof option === "number"
          ? option
          : getOptionValue(option);
      const optionValue =
        typeof gotOptionValue === "string" || typeof gotOptionValue === "number"
          ? gotOptionValue
          : option?.id ?? option?._id;

      return (
        (typeof optionValue === "number" || typeof optionValue === "string") &&
        (typeof tValue === "number" || typeof tValue === "string") &&
        optionValue === tValue
      );
    });
  }, [readOnly, propsValue, insideValue, options, getOptionValue]);

  const renderValue = useMemo(
    () =>
      getOptionLabel(value) ||
      getOptionLabel(propsValue) ||
      defaultDisplayValue,
    [getOptionLabel, value, propsValue, defaultDisplayValue]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange((event.target as HTMLInputElement).value);
  };

  useEffect(() => {
    if (!field.getOptions && field.options) {
      setOptions(field.options);
    }
  }, [field]);

  useEffect(() => {
    if (ref.current && autoFocus && !readOnly) {
      ref.current.focus();
    }
  }, [ref, autoFocus, readOnly]);

  useEffect(() => {
    setIsValid(propsIsValid);
  }, [propsIsValid]);

  return readOnly ? (
    <div className="w-full" onClick={() => onClick(field)}>
      {isLabel ? <InputLabel>{label}</InputLabel> : null}
      <Box className="p-2">
        <Typography sx={{ minHeight: "1rem" }} fontWeight={600}>
          {renderValue}
        </Typography>
      </Box>
      {isValid ? null : (
        <FormHelperText error>{isValid ? "" : errorMessage}</FormHelperText>
      )}
    </div>
  ) : (
    <div className="w-full" onClick={() => onClick(field)}>
      <FormControl>
        {isLabel && label ? <FormLabel>{label}</FormLabel> : null}
        <RadioGroup value={value} onChange={handleChange}>
          {options.map((option, optionIndex) => (
            <FormControlLabel
              key={optionIndex}
              value={getOptionValue(option)}
              control={<Radio />}
              label={getOptionLabel(option)}
            />
          ))}
        </RadioGroup>
        {isValid ? null : (
          <FormHelperText error>{isValid ? "" : errorMessage}</FormHelperText>
        )}
      </FormControl>
    </div>
  );
};

export default EditFormControlRadio;
