import {
  Box,
  FormHelperText,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import {
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  DispatchFunction,
  FieldRequiredType,
  StaticField,
} from "types/ui-types";
import PhoneFormatInput from "./PhoneFormatInput";
import { checkValidField } from "./edit-form-utils";

const EditFormControlPhone: FC<
  PropsWithChildren<{
    field?: Partial<StaticField>;
    readOnly?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value?: string | number | any;
    onChange?: DispatchFunction<string | number>;
    onClick?: (value?: Partial<StaticField>) => void;
    onBlur?: () => void;
    isLabel?: boolean;
    autoFocus?: boolean;
    isValid?: boolean;
    defaultDisplayValue?: string;
  }>
> = ({
  field = {} as StaticField,
  readOnly = false,
  value: propsValue = "",
  onChange = () => null,
  onClick = () => null,
  onBlur = () => null,
  isLabel = true,
  autoFocus = false,
  isValid: propsIsValid = true,
  defaultDisplayValue = "",
}) => {
  const ref = useRef<HTMLInputElement>(null);

  const errorMessage = useMemo(
    () => field.errorMessage ?? "Please input correct phone number",
    [field.errorMessage]
  );

  const value = useMemo(() => {
    if (field.getOptionValue) {
      return field.getOptionValue(propsValue);
    }
    return propsValue;
  }, [propsValue, field]);

  const renderValue = useMemo(
    () => value || defaultDisplayValue,
    [value, defaultDisplayValue]
  );

  const [isValid, setIsValid] = useState(true);

  const handleChange: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    const { value: newValue = "" } = e?.target ?? {};
    onChange(newValue);
  };

  const handleBlur: FocusEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    onBlur();
    if (field.required === FieldRequiredType.Required) {
      setIsValid(checkValidField({ field, value: e?.target?.value ?? "" }));
    }
  };

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
      {isLabel ? <InputLabel>{field.displayName}</InputLabel> : null}
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
      {isLabel ? <InputLabel>{field?.displayName ?? ""}</InputLabel> : null}
      <TextField
        inputRef={ref}
        name={field?.name}
        value={value ?? ""}
        onChange={handleChange}
        fullWidth
        size="small"
        placeholder={
          field.placeholder === true
            ? `Enter ${(field.displayName ?? "").toLowerCase()}`
            : field.placeholder
            ? field.placeholder
            : ""
        }
        onBlur={handleBlur}
        InputProps={{ inputComponent: PhoneFormatInput }}
        error={!isValid}
        helperText={isValid ? "" : errorMessage}
      />
    </div>
  );
};

export default EditFormControlPhone;
